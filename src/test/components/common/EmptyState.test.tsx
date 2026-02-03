import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { EmptyState } from '../../../components/common/EmptyState'

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No Movies Found"/>)
    expect(screen.getByText('No Movies Found')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <EmptyState title="No Movies" description="Try adjusting your search"/>
    )
    expect(screen.getByText('Try adjusting your search')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(<EmptyState title="No Movies"/>)
    expect(screen.queryByText('Try adjusting your search')).not.toBeInTheDocument()
  })

  it('renders back button when showBackButton is true', () => {
    render(<EmptyState title="Not Found" showBackButton/>)
    expect(screen.getByRole('link', {name: /back to movies/i})).toBeInTheDocument()
  })

  it('does not render back button when showBackButton is false', () => {
    render(<EmptyState title="Not Found" showBackButton={false}/>)
    expect(screen.queryByRole('link', {name: /back to movies/i})).not.toBeInTheDocument()
  })

  it('back button links to home page', () => {
    render(<EmptyState title="Not Found" showBackButton/>)
    const link = screen.getByRole('link', {name: /back to movies/i})
    expect(link).toHaveAttribute('href', '/')
  })
})
