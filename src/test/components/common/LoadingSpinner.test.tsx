import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { LoadingSpinner } from '../../../components/common/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders a loader element', () => {
    render(<LoadingSpinner/>)
    // Mantine Loader renders with role="presentation" or a specific test attribute
    // Check for the presence of the loading container
    expect(document.querySelector('.mantine-Loader-root')).toBeInTheDocument()
  })

  it('renders message when provided', () => {
    render(<LoadingSpinner message="Loading movies..."/>)
    expect(screen.getByText('Loading movies...')).toBeInTheDocument()
  })

  it('does not render message when not provided', () => {
    render(<LoadingSpinner/>)
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  })

  it('renders with fullScreen prop without errors', () => {
    render(<LoadingSpinner fullScreen/>)
    // Verify it renders without throwing
    expect(document.querySelector('.mantine-Loader-root')).toBeInTheDocument()
  })
})
