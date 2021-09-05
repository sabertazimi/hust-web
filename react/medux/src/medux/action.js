const isValidKey = (key) => {
    return ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;
};

const validateAction = (action) => {
    if (!action || typeof action !== 'object' || Array.isArray(action)) {
        throw new Error('Action must be an object!');
    }

    if (typeof action.type === 'undefined') {
        throw new Error('Action must have a type!');
    }

    if (!Object.keys(action).every(isValidKey)) {
        throw new Error('Action can only have `type`, `payload`, `error` or `meta` field!');
    }
};

export {
    validateAction
};
