import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProjectSettings from '@/app/project-settings/page'
test('renders the Home header with correct text', () => {
    render(<ProjectSettings />)
    const headingElement = screen.getByTestId('project-settings-heading')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('This is project settings')
})
