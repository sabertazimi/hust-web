const TEXT_ELEMENT_TYPE = 'text element';

const createTextElement = (value) => {
    return createElement(TEXT_ELEMENT_TYPE, {
        nodeValue: value
    });
};

const createElement = (type, config, ...args) => {
    const props = {
        ...config
    };
    const hasChildren = args.length > 0;
    const rawChildren = hasChildren ? [].concat(...args) : [];

    // transform text element when c === 'string'
    props.children = rawChildren
        .filter(c => c !== null && c !== false)
        .map(c => c instanceof Object ? c : createTextElement(c));

    return {
        type,
        props
    };
};

export {
    TEXT_ELEMENT_TYPE,
    createElement
};