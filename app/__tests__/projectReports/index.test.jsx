import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProjectReports from '@/app/projectReports/page'
test('renders the Home header with correct text', () => {
    render(<ProjectReports />)
    const headingElement = screen.getByTestId('project-reports-heading')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('This is project reports')
})
