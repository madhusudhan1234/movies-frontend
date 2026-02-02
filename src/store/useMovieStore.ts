import { create } from 'zustand';
import MovieService from '../services/movieService.ts';
import type { Movie } from '../types';

interface MovieState {
    movies: Movie[];
    activePage: number;
    totalPages: number;
    loading: boolean;
    selectedMovie: Movie | null;
    fetchMovies: (page: number) => Promise<void>;
    fetchMovie: (id: string) => Promise<void>;
    setActivePage: (page: number) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
    movies: [],
    activePage: 1,
    totalPages: 1,
    loading: false,
    selectedMovie: null,
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
    fetchMovie: async (id: string) => {
        set({ loading: true, selectedMovie: null });
        try { // Add try catch block
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
}));
