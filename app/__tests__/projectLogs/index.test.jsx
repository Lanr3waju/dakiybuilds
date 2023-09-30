import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProjectLogs from '@/app/project-logs/page'
test('renders the Home header with correct text', () => {
  render(<ProjectLogs />)
  const headingElement = screen.getByTestId('project-logs-heading')
  expect(headingElement).toBeInTheDocument()
})
