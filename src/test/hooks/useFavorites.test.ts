import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFavorites } from '../../hooks/useFavorites'
import { STORAGE_KEYS } from '../../constants/storageKeys'

describe('useFavorites', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('returns isFavorite: false when movie is not in favorites', () => {
        const { result } = renderHook(() => useFavorites(1))
        expect(result.current.isFavorite).toBe(false)
    })

    it('returns isFavorite: true when movie is in favorites', () => {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([1, 2, 3]))
        const { result } = renderHook(() => useFavorites(2))
        expect(result.current.isFavorite).toBe(true)
    })

    it('toggleFavorite adds movie to favorites', () => {
        const { result } = renderHook(() => useFavorites(5))

        expect(result.current.isFavorite).toBe(false)

        act(() => {
            result.current.toggleFavorite()
        })

        expect(result.current.isFavorite).toBe(true)

        const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')
        expect(stored).toContain(5)
    })

    it('toggleFavorite removes movie from favorites', () => {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([10, 20, 30]))
        const { result } = renderHook(() => useFavorites(20))

        expect(result.current.isFavorite).toBe(true)

        act(() => {
            result.current.toggleFavorite()
        })

        expect(result.current.isFavorite).toBe(false)

        const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')
        expect(stored).not.toContain(20)
    })

    it('preserves other favorites when toggling', () => {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([1, 2, 3]))
        const { result } = renderHook(() => useFavorites(2))

        act(() => {
            result.current.toggleFavorite()
        })

        const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]')
        expect(stored).toContain(1)
        expect(stored).toContain(3)
        expect(stored).not.toContain(2)
    })
})
