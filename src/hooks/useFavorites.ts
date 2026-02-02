import { useState, useCallback } from 'react';
import { storage } from '../lib/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

/**
 * Custom hook to manage favorite movies in localStorage
 */
export const useFavorites = (movieId: number) => {
    const [isFavorite, setIsFavorite] = useState(() => {
        const favorites = storage.get<number[]>(STORAGE_KEYS.FAVORITES, []);
        return favorites.includes(movieId);
    });

    const toggleFavorite = useCallback(() => {
        const favorites = storage.get<number[]>(STORAGE_KEYS.FAVORITES, []);

        const newFavorites = isFavorite
            ? favorites.filter(id => id !== movieId)
            : [...favorites, movieId];

        storage.set(STORAGE_KEYS.FAVORITES, newFavorites);
        setIsFavorite(!isFavorite);
    }, [movieId, isFavorite]);

    return { isFavorite, toggleFavorite };
};
