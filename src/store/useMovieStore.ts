import { create } from 'zustand';
import MovieService from '../services/movieService';
import type { Movie } from '../types';

interface MovieState {
    movies: Movie[];
    activePage: number;
    totalPages: number;
    loading: boolean;
    searchQuery: string;
    selectedMovie: Movie | null;
    fetchMovies: (page: number, query?: string) => Promise<void>;
    fetchMovie: (id: string) => Promise<void>;
    setActivePage: (page: number) => void;
    setSearchQuery: (query: string) => void;
}

export const useMovieStore = create<MovieState>((set, get) => ({
    movies: [],
    activePage: 1,
    totalPages: 1,
    loading: false,
    searchQuery: '',
    selectedMovie: null,
    fetchMovies: async (page: number, query?: string) => {
        set({ loading: true });
        try {
            const searchQuery = query !== undefined ? query : get().searchQuery;
            const data = await MovieService.fetchMovies(page, searchQuery);
            set({
                movies: data.data,
                totalPages: data.pagination.total_pages,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
            set({ loading: false });
        }
    },
    fetchMovie: async (id: string) => {
        set({ loading: true, selectedMovie: null });
        try {
            const data = await MovieService.getMovie(id);
            set({
                selectedMovie: data,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching movie:', error);
            set({ loading: false });
        }
    },
    setActivePage: (page: number) => set({ activePage: page }),
    setSearchQuery: (query: string) => set({ searchQuery: query, activePage: 1 }),
}));
