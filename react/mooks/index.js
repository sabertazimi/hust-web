const React = (function () {
  const hooks = []
  let idx = 0

  // eslint-disable-next-line react-hooks-extra/no-unnecessary-use-prefix -- custom hook implementation.
  function useState(initVal) {
    const state = hooks[idx] || initVal

    const _idx = idx
    const setState = (newVal) => {
      hooks[_idx] = newVal
    }

    idx++
    return [state, setState]
  }

  // eslint-disable-next-line react-hooks-extra/no-unnecessary-use-prefix -- custom hook implementation.
  function useEffect(callback, depsArray) {
    const oldDeps = hooks[idx]
    let hasChanged = true

    if (oldDeps)
      hasChanged = depsArray.some((dep, i) => !Object.is(dep, oldDeps[i]))

    if (hasChanged)
      callback()

    hooks[idx] = depsArray
    idx++
  }

  function render(Component) {
    idx = 0
    const C = Component()
    C.render()

    return C
  }

  return { useState, useEffect, render }
})()

function App() {
  const [count, setCount] = React.useState(1)
  const [text, setText] = React.useState('apple')

  React.useEffect(() => {
    // eslint-disable-next-line no-console -- CLI output.
    console.log('"useEffect" called.')
  }, [text])

  return {
    // eslint-disable-next-line no-console -- CLI output.
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: word => setText(word),
  }
}

let app = React.render(App)

app.click()
app = React.render(App)
app.type('pear')
app = React.render(App)
app.click()
app = React.render(App)
