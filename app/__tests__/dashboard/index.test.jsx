import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Dashboard from '@/app/dashboard/page'
test('renders the Home header with correct text', () => {
    render(<Dashboard />)
    const headingElement = screen.getByTestId('dashboard-heading')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('This is dashboard')
})
