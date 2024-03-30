import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('should render without crash', () => {
    render(<App />)
    const headerButton = screen.getByText(/try it free/iu)
    const mainButton = screen.getByText(/get started for free/iu)
    expect(headerButton).toBeInTheDocument()
    expect(mainButton).toBeInTheDocument()
  })
})
