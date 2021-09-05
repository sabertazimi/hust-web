import {
    TEXT_ELEMENT_TYPE
} from './element.js';

const updateDOMProperties = (dom, prevProps, nextProps) => {
    // add event listeners
    const isListener = name => name.startsWith('on');
    const isAttribute = name => !isListener(name) && name !== 'children';

    // remove prevProps
    Object.keys(prevProps).filter(isListener).forEach((name) => {
        const eventType = name.toLowerCase().substring(2); // trip off 'on'
        dom.removeEventListener(eventType, prevProps[name]);
    });

    Object.keys(prevProps).filter(isAttribute).forEach((name) => {
        dom[name] = null;
    });

    // add nextProps
    Object.keys(nextProps).filter(isListener).forEach((name) => {
        const eventType = name.toLowerCase().substring(2); // trip off 'on'
        dom.addEventListener(eventType, nextProps[name]);
    });

    Object.keys(nextProps).filter(isAttribute).forEach((name) => {
        dom[name] = nextProps[name];
    });
};

const createDOMElement = (element) => {
    const {
        type,
        props
    } = element;

    // create DOM element
    const isTextElement = type === TEXT_ELEMENT_TYPE;
    const dom = isTextElement ?
        document.createTextNode('') :
        document.createElement(type);

    updateDOMProperties(dom, [], props);
    return dom;
};

export {
    updateDOMProperties,
    createDOMElement
};