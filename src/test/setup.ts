import '@testing-library/jest-dom'
import { vi, beforeEach } from 'vitest'

// Mock window.matchMedia for jsdom (required by Mantine)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Mock localStorage for Node.js environment
const localStorageMock = {
    store: {} as Record<string, string>,
    getItem(key: string) {
        return this.store[key] || null
    },
    setItem(key: string, value: string) {
        this.store[key] = value
    },
    removeItem(key: string) {
        delete this.store[key]
    },
    clear() {
        this.store = {}
    },
}

Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
})

// Reset localStorage before each test
beforeEach(() => {
    localStorageMock.clear()
})
