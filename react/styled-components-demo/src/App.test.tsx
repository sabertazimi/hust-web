import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('should render without crash', () => {
    render(<App />)
    const headerButton = screen.getByText(/try it free/i)
    const mainButton = screen.getByText(/get started for free/i)
    expect(headerButton).toBeInTheDocument()
    expect(mainButton).toBeInTheDocument()
  })
})
