import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import { MovieCard } from '../../components/MovieCard'
import type { Movie } from '../../types'

const mockMovie: Movie = {
    id: 1,
    imdb_id: 'tt1234567',
    title: 'Test Movie Title',
    year: 2023,
    rated: 'PG-13',
    released: '2023-01-15',
    runtime: '120 min',
    plot: 'This is a test plot for the movie. It should be truncated in the card display.',
    language: 'English',
    country: 'USA',
    awards: ['Best Picture', 'Best Director'],
    poster: 'https://example.com/poster.jpg',
    metascore: '75',
    imdb_rating: '8.5',
    imdb_votes: '10000',
    type: 'movie',
    dvd: '2023-06-01',
    box_office_collection: 100000000,
    production: 'Test Production',
    website: 'https://example.com',
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
    genres: [
        { name: 'action', label: 'Action' },
        { name: 'drama', label: 'Drama' },
    ],
    directors: [{ full_name: 'John Director' }],
    actors: [
        { full_name: 'Actor One' },
        { full_name: 'Actor Two' },
    ],
    producers: [{ full_name: 'Producer One' }],
}

describe('MovieCard', () => {
    it('renders movie title', () => {
        render(<MovieCard movie={mockMovie} />)
        expect(screen.getByText('Test Movie Title')).toBeInTheDocument()
    })

    it('renders movie IMDb rating', () => {
        render(<MovieCard movie={mockMovie} />)
        expect(screen.getByText('8.5')).toBeInTheDocument()
    })

    it('renders movie plot', () => {
        render(<MovieCard movie={mockMovie} />)
        expect(screen.getByText(/This is a test plot/)).toBeInTheDocument()
    })

    it('renders View Details button as link to movie detail page', () => {
        render(<MovieCard movie={mockMovie} />)
        const link = screen.getByRole('link', { name: /view details/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/movies/1')
    })

    it('renders movie poster image', () => {
        render(<MovieCard movie={mockMovie} />)
        const img = screen.getByAltText('Test Movie Title')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', 'https://example.com/poster.jpg')
    })

    it('renders FavoriteButton component', () => {
        render(<MovieCard movie={mockMovie} />)
        expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument()
    })
})
