import { describe, it, expect, vi } from 'vitest'
import { storage } from '../../lib/storage'

describe('storage', () => {
    describe('get', () => {
        it('returns default value when key does not exist', () => {
            const result = storage.get('nonexistent', 'default')
            expect(result).toBe('default')
        })

        it('returns parsed value when key exists', () => {
            localStorage.setItem('testKey', JSON.stringify({ foo: 'bar' }))
            const result = storage.get<{ foo: string }>('testKey', { foo: '' })
            expect(result).toEqual({ foo: 'bar' })
        })

        it('returns default value on parse error', () => {
            localStorage.setItem('badKey', 'not valid json')
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
            const result = storage.get<string>('badKey', 'default')
            expect(result).toBe('default')
            expect(consoleSpy).toHaveBeenCalled()
            consoleSpy.mockRestore()
        })

        it('returns array default value when key does not exist', () => {
            const result = storage.get<number[]>('favorites', [])
            expect(result).toEqual([])
        })
    })

    describe('set', () => {
        it('stores JSON stringified value', () => {
            storage.set('myKey', { id: 123 })
            const stored = localStorage.getItem('myKey')
            expect(stored).toBe(JSON.stringify({ id: 123 }))
        })

        it('stores array value', () => {
            storage.set('favorites', [1, 2, 3])
            const stored = localStorage.getItem('favorites')
            expect(stored).toBe(JSON.stringify([1, 2, 3]))
        })
    })

    describe('remove', () => {
        it('removes item from localStorage', () => {
            localStorage.setItem('toRemove', 'value')
            storage.remove('toRemove')
            expect(localStorage.getItem('toRemove')).toBeNull()
        })
    })
})
