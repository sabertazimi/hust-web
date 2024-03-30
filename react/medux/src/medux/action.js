function isValidKey(key) {
  return ['type', 'payload', 'error', 'meta'].includes(key)
}

function validateAction(action) {
  if (!action || typeof action !== 'object' || Array.isArray(action))
    throw new Error('Action must be an object!')

  if (typeof action.type === 'undefined')
    throw new TypeError('Action must have a type!')

  if (!Object.keys(action).every(isValidKey)) {
    throw new Error(
      'Action can only have `type`, `payload`, `error` or `meta` field!',
    )
  }
}

export { validateAction }
