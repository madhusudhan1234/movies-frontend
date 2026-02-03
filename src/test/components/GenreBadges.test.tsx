import { describe, it, expect } from 'vitest'
import { render, screen} from '../test-utils'
import { GenreBadges } from '../../components/GenreBadges'

describe('GenreBadges', () => {
  it('returns null when genres is null', () => {
    render(<GenreBadges genres={null}/>)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByText(/./)).not.toBeInTheDocument()
  })

  it('returns null when genres is undefined', () => {
    render(<GenreBadges genres={undefined}/>)
    expect(screen.queryByText(/./)).not.toBeInTheDocument()
  })

  it('returns null when genres is empty array', () => {
    render(<GenreBadges genres={[]}/>)
    expect(screen.queryByText(/./)).not.toBeInTheDocument()
  })

  it('renders single genre badge', () => {
    render(<GenreBadges genres={[{name: 'action', label: 'Action'}]}/>)
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('renders multiple genre badges', () => {
    const genres = [
      {name: 'action', label: 'Action'},
      {name: 'drama', label: 'Drama'},
      {name: 'comedy', label: 'Comedy'},
    ]
    render(<GenreBadges genres={genres}/>)
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Drama')).toBeInTheDocument()
    expect(screen.getByText('Comedy')).toBeInTheDocument()
  })

  it('displays genre label not name', () => {
    render(<GenreBadges genres={[{name: 'sci-fi', label: 'Sci-Fi'}]}/>)
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument()
    expect(screen.queryByText('sci-fi')).not.toBeInTheDocument()
  })
})
