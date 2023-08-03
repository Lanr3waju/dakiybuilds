import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProjectSchedule from '@/app/projectSchedule/page'
test('renders the Home header with correct text', () => {
    render(<ProjectSchedule />)
    const headingElement = screen.getByTestId('project-schedule-heading')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('This is project schedule')
})
