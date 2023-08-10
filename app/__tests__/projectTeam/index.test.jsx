import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProjectTeam from '@/app/project-team/page'
test('renders the Home header with correct text', () => {
    render(<ProjectTeam />)
    const headingElement = screen.getByTestId('project-team-heading')
    expect(headingElement).toBeInTheDocument()
})
