import { create } from 'zustand';
import MovieService from '../services/movieService.ts';
import type { Movie } from '../types';

interface MovieState {
    movies: Movie[];
    activePage: number;
    totalPages: number;
    loading: boolean;
    fetchMovies: (page: number) => Promise<void>;
    setActivePage: (page: number) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
    movies: [],
    activePage: 1,
    totalPages: 1,
    loading: false,
    fetchMovies: async (page: number) => {
        set({ loading: true });
        try {
            const data = await MovieService.fetchMovies(page);
            set({
                movies: data.data,
                totalPages: data.pagination.last_page,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
            set({ loading: false });
        }
    },
    setActivePage: (page: number) => set({ activePage: page }),
}));
