import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import { GenreBadges } from '../../components/GenreBadges'

describe('GenreBadges', () => {
    it('returns null when genre is null', () => {
        render(<GenreBadges genre={null} />)
        expect(screen.queryByRole('status')).not.toBeInTheDocument()
        // Verify no badge text is rendered
        expect(screen.queryByText(/./)).not.toBeInTheDocument()
    })

    it('returns null when genre is undefined', () => {
        render(<GenreBadges genre={undefined} />)
        expect(screen.queryByText(/./)).not.toBeInTheDocument()
    })

    it('returns null when genre is empty string', () => {
        render(<GenreBadges genre="" />)
        expect(screen.queryByText(/./)).not.toBeInTheDocument()
    })

    it('renders single genre badge', () => {
        render(<GenreBadges genre="Action" />)
        expect(screen.getByText('Action')).toBeInTheDocument()
    })

    it('parses comma-separated genres and renders multiple badges', () => {
        render(<GenreBadges genre="Action, Drama, Comedy" />)
        expect(screen.getByText('Action')).toBeInTheDocument()
        expect(screen.getByText('Drama')).toBeInTheDocument()
        expect(screen.getByText('Comedy')).toBeInTheDocument()
    })

    it('trims whitespace from genre names', () => {
        render(<GenreBadges genre="  Horror  ,  Thriller  " />)
        expect(screen.getByText('Horror')).toBeInTheDocument()
        expect(screen.getByText('Thriller')).toBeInTheDocument()
    })
})
