import {
    createDOMElement,
    updateDOMProperties
} from './dom-utils.js';
import {
    createInstance
} from './component.js';

// fiber tags
const HOST_COMPONENT = 'host';
const CLASS_COMPONENT = 'class';
const HOST_ROOT = 'root';

// effect tags
const PLACEMENT = 1;
const DELETION = 2;
const UPDATE = 3;

const ENOUGH_TIME = 1; // milliseconds

// global state
const updateQueue = [];
let nextUnitOfWork = null;
let pendingCommit = null;

const performWork = (deadline) => {
    workloop(deadline);

    // checks if there's pending work
    if (nextUnitOfWork || updateQueue.length > 0) {
        requestIdleCallback(performWork);
    }
};

const workloop = (deadline) => {
    if (!nextUnitOfWork) {
        resetNextUnitOfWork();
    }

    while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    if (pendingCommit) {
        commitAllWork(pendingCommit);
    }
};

const resetNextUnitOfWork = () => {
    const update = updateQueue.shift();

    if (!update) {
        return;
    }

    if (update.partialState) {
        update.instance.__fiber.partialState = update.partialState;
    }

    const root = (update.from == HOST_ROOT) ?
        update.dom._rootContainerFiber :
        getRoot(update.instance.__fiber);

    nextUnitOfWork = {
        tag: HOST_ROOT,
        stateNode: update.dom || root.stateNode,
        props: update.newProps || root.props,
        alternate: root
    };
};

const getRoot = (fiber) => {
    let node = fiber;

    while (node.parent) {
        node = node.parent;
    }

    return node;
};

const performUnitOfWork = (wipFiber) => {
    // pre-order traverse
    beginWork(wipFiber);

    if (wipFiber.child) {
        // return child to nextUnitOfWork
        return wipFiber.child;
    }

    let uow = wipFiber;

    while (uow) {
        // no child, return sibling to nextUnitOfWork (current branch ended)
        completeWork(uow);

        if (uow.sibling) {
            return uow.sibling;
        }

        uow = uow.parent;
    }
};

const beginWork = (wipFiber) => {
    // create the stateNode if we don’t have one
    // get the component children and pass them to reconcileChildrenArray()
    if (wipFiber.tag == CLASS_COMPONENT) {
        updateClassComponent(wipFiber);
    } else {
        updateHostComponent(wipFiber);
    }
};

const updateHostComponent = (wipFiber) => {
    if (!wipFiber.stateNode) {
        wipFiber.stateNode = createDOMElement(wipFiber);
    }

    // reconcile
    const newChildElements = wipFiber.props.children;
    reconcileChildrenArray(wipFiber, newChildElements);
};

const updateClassComponent = (wipFiber) => {
    let instance = wipFiber.stateNode;

    if (instance == null) {
        instance = wipFiber.stateNode = createInstance(wipFiber);
    } else if (wipFiber.props == instance.props && !wipFiber.partialState) {
        cloneChildFibers(wipFiber);
        return;
    }

    // shouldComponentUpdate
    // update props and state
    instance.props = wipFiber.props;
    instance.state = {
        ...instance.state,
        ...wipFiber.partialState
    };
    wipFiber.partialState = null;

    // reconcile
    const newChildElements = wipFiber.stateNode.render();
    reconcileChildrenArray(wipFiber, newChildElements);
};

const cloneChildFibers = (parentFiber) => {
    const oldFiber = parentFiber.alternate;

    if (!oldFiber.child) {
        return;
    }

    let oldChild = oldFiber.child;
    let prevChild = null;

    while (oldChild) {
        const newChild = {
            type: oldChild.type,
            tag: oldChild.tag,
            stateNode: oldChild.stateNode,
            props: oldChild.props,
            partialState: oldChild.partialState,
            alternate: oldChild,
            parent: parentFiber
        };
        
        if (prevChild) {
            prevChild.sibling = newChild;
        } else {
            parentFiber.child = newChild;
        }

        prevChild = newChild;
        oldChild = oldChild.sibling;
    }
};

const reconcileChildrenArray = (wipFiber, newChildElements) => {
    const elements = newChildElements == null ? [] : Array.isArray(newChildElements) ? newChildElements : [newChildElements];

    let index = 0;
    let oldFiber = wipFiber.alternate ? wipFiber.alternate.child : null;
    let newFiber = null;

    while (index < elements.length || oldFiber != null) {
        const prevFiber = newFiber;
        const element = index < elements.length && elements[index];
        const sameType = oldFiber && element && element.type == oldFiber.type;

        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                tag: oldFiber.tag,
                stateNode: oldFiber.stateNode,
                props: element.props,
                parent: wipFiber,
                alternate: oldFiber,
                partialState: oldFiber.partialState,
                effectTag: UPDATE
            };
        }

        if (element && !sameType) {
            newFiber = {
                type: element.type,
                tag: typeof element.type == 'string' ? HOST_COMPONENT : CLASS_COMPONENT,
                props: element.props,
                parent: wipFiber,
                effectTag: PLACEMENT
            };
        }

        if (oldFiber && !sameType) {
            oldFiber.effectTag = DELETION;
            wipFiber.effects = wipFiber.effects || [];
            wipFiber.effects.push(oldFiber);
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        if (index == 0) {
            wipFiber.child = newFiber;
        } else if (prevFiber && element) {
            prevFiber.sibling = newFiber;
        }

        ++index;
    }
};

const completeWork = (fiber) => {
    if (fiber.tag == CLASS_COMPONENT) {
        fiber.stateNode.__fiber = fiber;
    }

    if (fiber.parent) {
        const childEffects = fiber.effects || [];
        const thisEffect = fiber.effectTag != null ? [fiber]: [];
        const parentEffects = fiber.parent.effects || [];
        fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
    } else {
        pendingCommit = fiber;
    }
};

const commitAllWork = (fiber) => {
    fiber.effects.forEach((f) => {
        commitWork(f);
    });

    fiber.stateNode.__rootContainerFiber = fiber;
    nextUnitOfWork = null;
    pendingCommit = null;
};

const commitWork = (fiber) => {
    if (fiber.tag == HOST_ROOT) {
        return;
    }

    let domParentFiber = fiber.parent;

    while (domParentFiber.tag == CLASS_COMPONENT) {
        domParentFiber = domParentFiber.parent;
    }

    const domParent = domParentFiber.stateNode;

    if (fiber.effectTag == PLACEMENT && fiber.tag == HOST_COMPONENT) {
        domParent.appendChild(fiber.stateNode);
    } else if (fiber.effectTag == UPDATE && fiber.tag == HOST_COMPONENT) {
        updateDOMProperties(fiber.stateNode, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag == DELETION) {
        commitDeletion(fiber, domParent);
    }
};

const commitDeletion = (fiber, domParent) => {
    let node = fiber;

    // pre-order traverse
    while (true) {
        if (node.tag == CLASS_COMPONENT) {
            node = node.child;
            continue;
        }

        domParent.removeChild(node.stateNode);

        while (node != fiber && !node.sibling) {
            node = node.parent;
        }

        if (node == fiber) {
            return;
        }

        node = node.sibling;
    }
};

const scheduleUpdate = (instance, partialState) => {
    updateQueue.push({
        from: CLASS_COMPONENT,
        instance,
        partialState
    });

    requestIdleCallback(performWork);
};

const render = (elements, container) => {
    updateQueue.push({
        from: HOST_ROOT,
        dom: container,
        newProps: {
            children: elements
        }
    });

    requestIdleCallback(performWork);
};

export {
    scheduleUpdate,
    render
};