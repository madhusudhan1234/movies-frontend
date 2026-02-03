import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act } from '@testing-library/react'
import { useMovieStore } from '../../store/useMovieStore'
import MovieService from '../../services/movieService'
import type { Movie, PaginatedResponse } from '../../types'

// Mock the MovieService
vi.mock('../../services/movieService', () => ({
  default: {
    fetchMovies: vi.fn(),
    getMovie: vi.fn(),
  },
}))

// Helper to create a mock paginated response
const createMockPaginatedResponse = <T>(data: T[], totalPages = 1): PaginatedResponse<T> => ({
  data,
  metadata: {
    total: data.length,
    count: data.length,
    per_page: 10,
    current_page: 1,
    total_pages: totalPages,
    links: {},
  },
  message: '',
})

// Helper to create a partial movie mock
const createMockMovie = (overrides: Partial<Movie> = {}): Movie => ({
  id: 1,
  imdb_id: 'tt1234567',
  title: 'Mock Movie',
  year: 2023,
  rated: 'PG-13',
  released: '2023-01-15',
  runtime: '120 min',
  plot: 'A mock movie plot',
  language: 'English',
  country: 'USA',
  awards: ['Best Picture'],
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
  genres: [{name: 'action', label: 'Action'}],
  directors: [{full_name: 'John Director'}],
  actors: [{full_name: 'Actor One'}],
  producers: [{full_name: 'Producer One'}],
  ...overrides,
})

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
      useMovieStore.setState({activePage: 5})
      act(() => {
        useMovieStore.getState().setSearchQuery('new query')
      })
      expect(useMovieStore.getState().activePage).toBe(1)
    })
  })

  describe('fetchMovies', () => {
    it('sets loading to true while fetching', async () => {
      vi.mocked(MovieService.fetchMovies).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(createMockPaginatedResponse<Movie>([])), 100))
      )

      const promise = useMovieStore.getState().fetchMovies(1)
      expect(useMovieStore.getState().loading).toBe(true)
      await promise
    })

    it('updates movies and totalPages on success', async () => {
      const mockMovies = [createMockMovie({id: 1, title: 'Movie 1'}), createMockMovie({id: 2, title: 'Movie 2'})]
      vi.mocked(MovieService.fetchMovies).mockResolvedValue(createMockPaginatedResponse(mockMovies, 5))

      await act(async () => {
        await useMovieStore.getState().fetchMovies(1)
      })

      const state = useMovieStore.getState()
      expect(state.movies).toEqual(mockMovies)
      expect(state.totalPages).toBe(5)
      expect(state.loading).toBe(false)
    })

    it('uses provided query when given', async () => {
      vi.mocked(MovieService.fetchMovies).mockResolvedValue(createMockPaginatedResponse<Movie>([]))

      await act(async () => {
        await useMovieStore.getState().fetchMovies(1, 'custom query')
      })

      expect(MovieService.fetchMovies).toHaveBeenCalledWith(1, 'custom query')
    })

    it('uses store searchQuery when query not provided', async () => {
      useMovieStore.setState({searchQuery: 'stored query'})
      vi.mocked(MovieService.fetchMovies).mockResolvedValue(createMockPaginatedResponse<Movie>([]))

      await act(async () => {
        await useMovieStore.getState().fetchMovies(2)
      })

      expect(MovieService.fetchMovies).toHaveBeenCalledWith(2, 'stored query')
    })

    it('sets loading to false on error', async () => {
      vi.mocked(MovieService.fetchMovies).mockRejectedValue(new Error('API Error'))
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      })

      await act(async () => {
        await useMovieStore.getState().fetchMovies(1)
      })

      expect(useMovieStore.getState().loading).toBe(false)
      consoleSpy.mockRestore()
    })
  })

  describe('fetchMovie', () => {
    const mockMovie = createMockMovie({id: 1, title: 'Single Movie'})

    it('sets loading to true and clears selectedMovie while fetching', async () => {
      useMovieStore.setState({selectedMovie: createMockMovie({id: 99, title: 'Old'})})
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
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      })

      await act(async () => {
        await useMovieStore.getState().fetchMovie('999')
      })

      expect(useMovieStore.getState().loading).toBe(false)
      consoleSpy.mockRestore()
    })
  })
})
