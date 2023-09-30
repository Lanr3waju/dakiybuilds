import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AllProjects from '@/app/all-jobs/page'
test('renders the Home header with correct text', () => {
  render(<AllProjects />)
  const headingElement = screen.getByTestId('all-projects-heading')
  expect(headingElement).toBeInTheDocument()
})
