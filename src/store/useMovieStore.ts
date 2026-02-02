import { create } from 'zustand';
import axios from 'axios';
import type { Movie, PaginatedResponse } from '../types';

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
            const response = await axios.get<PaginatedResponse<Movie>>(`http://localhost/api/movies?page=${page}`);
            set({
                movies: response.data.data,
                totalPages: response.data.pagination.last_page,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching movies:', error);
            set({ loading: false });
        }
    },
    setActivePage: (page: number) => set({ activePage: page }),
}));
