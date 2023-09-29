import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProjectDocuments from '@/app/project-documents/page'
test('renders the Home header with correct text', () => {
  render(<ProjectDocuments />)
  const headingElement = screen.getByTestId('project-documents-heading')
  expect(headingElement).toBeInTheDocument()
})
