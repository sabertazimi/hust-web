const TEXT_ELEMENT_TYPE = 'text element'

function createElement(type, config, ...args) {
  const props = {
    ...config,
  }
  const hasChildren = args.length > 0
  const rawChildren = hasChildren ? [].concat(...args) : []

  // transform text element when c === 'string'
  props.children = rawChildren
    .filter(c => c !== null && c !== false)
    .map(c =>
      c instanceof Object
        ? c
        : createElement(TEXT_ELEMENT_TYPE, {
          nodeValue: c,
        }),
    )

  return {
    type,
    props,
  }
}

export { createElement, TEXT_ELEMENT_TYPE }
