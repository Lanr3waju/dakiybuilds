import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProjectFinances from '@/app/projectFinances/page'
test('renders the Home header with correct text', () => {
    render(<ProjectFinances />)
    const headingElement = screen.getByTestId('project-finances-heading')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('This is project finances')
})
