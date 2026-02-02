import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act } from '@testing-library/react'
import { useMovieStore } from '../../store/useMovieStore'
import MovieService from '../../services/movieService'

// Mock the MovieService
vi.mock('../../services/movieService', () => ({
    default: {
        fetchMovies: vi.fn(),
        getMovie: vi.fn(),
    },
}))

describe('useMovieStore', () => {
    beforeEach(() => {
        // Reset store state before each test
        useMovieStore.setState({
            movies: [],
            activePage: 1,
            totalPages: 1,
            loading: false,
            searchQuery: '',
            selectedMovie: null,
        })
        vi.clearAllMocks()
    })

    describe('initial state', () => {
        it('has correct initial values', () => {
            const state = useMovieStore.getState()
            expect(state.movies).toEqual([])
            expect(state.activePage).toBe(1)
            expect(state.totalPages).toBe(1)
            expect(state.loading).toBe(false)
            expect(state.searchQuery).toBe('')
            expect(state.selectedMovie).toBeNull()
        })
    })

    describe('setActivePage', () => {
        it('updates activePage', () => {
            act(() => {
                useMovieStore.getState().setActivePage(5)
            })
            expect(useMovieStore.getState().activePage).toBe(5)
        })
    })

    describe('setSearchQuery', () => {
        it('updates searchQuery', () => {
            act(() => {
                useMovieStore.getState().setSearchQuery('batman')
            })
            expect(useMovieStore.getState().searchQuery).toBe('batman')
        })

        it('resets activePage to 1 when search query changes', () => {
            useMovieStore.setState({ activePage: 5 })
            act(() => {
                useMovieStore.getState().setSearchQuery('new query')
            })
            expect(useMovieStore.getState().activePage).toBe(1)
        })
    })

    describe('fetchMovies', () => {
        it('sets loading to true while fetching', async () => {
            vi.mocked(MovieService.fetchMovies).mockImplementation(
                () => new Promise((resolve) => setTimeout(() => resolve({ data: [], pagination: { last_page: 1 } }), 100))
            )

            const promise = useMovieStore.getState().fetchMovies(1)
            expect(useMovieStore.getState().loading).toBe(true)
            await promise
        })

        it('updates movies and totalPages on success', async () => {
            const mockMovies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }]
            vi.mocked(MovieService.fetchMovies).mockResolvedValue({
                data: mockMovies,
                pagination: { last_page: 5 },
            })

            await act(async () => {
                await useMovieStore.getState().fetchMovies(1)
            })

            const state = useMovieStore.getState()
            expect(state.movies).toEqual(mockMovies)
            expect(state.totalPages).toBe(5)
            expect(state.loading).toBe(false)
        })

        it('uses provided query when given', async () => {
            vi.mocked(MovieService.fetchMovies).mockResolvedValue({
                data: [],
                pagination: { last_page: 1 },
            })

            await act(async () => {
                await useMovieStore.getState().fetchMovies(1, 'custom query')
            })

            expect(MovieService.fetchMovies).toHaveBeenCalledWith(1, 'custom query')
        })

        it('uses store searchQuery when query not provided', async () => {
            useMovieStore.setState({ searchQuery: 'stored query' })
            vi.mocked(MovieService.fetchMovies).mockResolvedValue({
                data: [],
                pagination: { last_page: 1 },
            })

            await act(async () => {
                await useMovieStore.getState().fetchMovies(2)
            })

            expect(MovieService.fetchMovies).toHaveBeenCalledWith(2, 'stored query')
        })

        it('sets loading to false on error', async () => {
            vi.mocked(MovieService.fetchMovies).mockRejectedValue(new Error('API Error'))
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            await act(async () => {
                await useMovieStore.getState().fetchMovies(1)
            })

            expect(useMovieStore.getState().loading).toBe(false)
            consoleSpy.mockRestore()
        })
    })

    describe('fetchMovie', () => {
        const mockMovie = { id: 1, title: 'Single Movie' }

        it('sets loading to true and clears selectedMovie while fetching', async () => {
            useMovieStore.setState({ selectedMovie: { id: 99, title: 'Old' } as any })
            vi.mocked(MovieService.getMovie).mockImplementation(
                () => new Promise((resolve) => setTimeout(() => resolve(mockMovie), 100))
            )

            const promise = useMovieStore.getState().fetchMovie('1')
            expect(useMovieStore.getState().loading).toBe(true)
            expect(useMovieStore.getState().selectedMovie).toBeNull()
            await promise
        })

        it('updates selectedMovie on success', async () => {
            vi.mocked(MovieService.getMovie).mockResolvedValue(mockMovie)

            await act(async () => {
                await useMovieStore.getState().fetchMovie('1')
            })

            expect(useMovieStore.getState().selectedMovie).toEqual(mockMovie)
            expect(useMovieStore.getState().loading).toBe(false)
        })

        it('sets loading to false on error', async () => {
            vi.mocked(MovieService.getMovie).mockRejectedValue(new Error('Not found'))
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

            await act(async () => {
                await useMovieStore.getState().fetchMovie('999')
            })

            expect(useMovieStore.getState().loading).toBe(false)
            consoleSpy.mockRestore()
        })
    })
})
