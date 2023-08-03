import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AllProjects from '@/app/allProjects/page'
test('renders the Home header with correct text', () => {
    render(<AllProjects />)
    const headingElement = screen.getByTestId('all-projects-heading')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('This is all projects')
})
