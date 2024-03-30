import { useState } from 'react'

/**
 * Custom hook for handling form state and submission.
 * @param {Function} callback The callback function to be executed on form submission.
 * @returns {Object} An object containing the form values, handleChange function, and handleSubmit function.
 */
function useForm(callback) {
  const [values, setValues] = useState({})

  /**
   * Handles the form submission.
   * @param {Event} event The form submission event.
   * @returns {void}
   */
  function handleSubmit(event) {
    if (event) {
      event.preventDefault()
    }

    callback()
  }

  /**
   * Handles the change event for form inputs.
   * @param {Event} event The change event object.
   * @returns {void}
   */
  function handleChange(event) {
    event.persist()

    setValues(vals => ({
      ...vals,
      [event.target.name]: event.target.value,
    }))
  }

  return {
    values,
    handleChange,
    handleSubmit,
  }
}

export default useForm
