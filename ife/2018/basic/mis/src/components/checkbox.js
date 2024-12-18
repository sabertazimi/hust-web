import createAction from '../state/action'

import { FILTER_ALL, FILTER_DATA, SHOW_ALL } from '../state/constants'
import store from '../state/store'

const { dispatch } = store

function generateCheckBoxes(schema) {
  const { label, data } = schema

  const labelHTML = `${label}: `
  const checkAllBoxHTML = `
    <input type="checkbox" id="${label}-all" name="${label}" value="all" checked>
    <label for="${label}-all">All</label>
  `
  const checkBoxesHTML = data
    .map(
      ({ value, text }) => `
    <input type="checkbox" id="${label}-${value}" name="${label}" value="${value}" checked>
    <label for="${label}-${value}">${text}</label>
  `,
    )
    .join('')

  return `
    ${labelHTML}
    ${checkAllBoxHTML}
    ${checkBoxesHTML}
  `
}

function handleCheckBoxes($container, field, event) {
  const [allCheckBox, ...checkBoxes] = Array.from(
    $container.querySelectorAll('input[type="checkbox"]'),
  )

  if (event.target.value.includes('all')) {
    const { checked } = allCheckBox

    checkBoxes.forEach((checkbox) => {
      checkbox.checked = checked
    })

    dispatch(createAction(checked ? SHOW_ALL : FILTER_ALL, field))
  } else {
    const filter = []

    checkBoxes.forEach((checkbox) => {
      if (checkbox.checked)
        filter.push(checkbox.value)
    })

    allCheckBox.checked = checkBoxes.every(checkBox => checkBox.checked)

    dispatch(createAction(FILTER_DATA, field, filter))
  }
}

function renderCheckBoxes($container, field, schema) {
  $container.innerHTML = generateCheckBoxes(schema)
  $container.addEventListener('change', event =>
    handleCheckBoxes($container, field, event))
}

export default renderCheckBoxes
