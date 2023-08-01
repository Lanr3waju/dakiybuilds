import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // Make sure to include this line
import HomePage from '@/app/page'

test('renders the Home header with correct text', () => {
    render(<HomePage />)
    const headingElement = screen.getByRole('heading')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('This is Home')
})
