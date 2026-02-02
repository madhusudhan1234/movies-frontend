import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { FavoriteButton } from '../../../components/common/FavoriteButton'
import { STORAGE_KEYS } from '../../../constants/storageKeys'

describe('FavoriteButton', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('renders unfilled heart when movie is not favorite', () => {
        render(<FavoriteButton movieId={1} />)
        const button = screen.getByRole('button', { name: /add to favorites/i })
        expect(button).toBeInTheDocument()
    })

    it('renders filled heart when movie is favorite', () => {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([1, 2, 3]))
        render(<FavoriteButton movieId={1} />)
        const button = screen.getByRole('button', { name: /remove from favorites/i })
        expect(button).toBeInTheDocument()
    })

    it('toggles favorite state on click', async () => {
        const user = userEvent.setup()
        render(<FavoriteButton movieId={5} />)

        // Initially not favorite
        expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument()

        // Click to add to favorites
        await user.click(screen.getByRole('button'))

        // Now should be favorite
        expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument()

        // Click again to remove from favorites
        await user.click(screen.getByRole('button'))

        // Back to not favorite
        expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument()
    })

    it('adds movie ID to localStorage when favorited', async () => {
        const user = userEvent.setup()
        render(<FavoriteButton movieId={10} />)

        await user.click(screen.getByRole('button'))

        const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')
        expect(stored).toContain(10)
    })

    it('removes movie ID from localStorage when unfavorited', async () => {
        const user = userEvent.setup()
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([10, 20, 30]))
        render(<FavoriteButton movieId={20} />)

        await user.click(screen.getByRole('button'))

        const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')
        expect(stored).not.toContain(20)
        expect(stored).toContain(10)
        expect(stored).toContain(30)
    })
})
