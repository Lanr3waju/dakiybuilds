import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HomePage from '@/app/page'

test('renders the Home header with correct text', () => {
    render(<HomePage />)
    const headingElement = screen.getByTestId('homepage-heading')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('This is home')
})
