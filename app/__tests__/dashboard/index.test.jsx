import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DakiyBoard from '@/app/dakiyBoard/page'
test('renders the Home header with correct text', () => {
    render(<DakiyBoard />)
    const headingElement = screen.getByRole('wrapper')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent()
})
