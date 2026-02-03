# Movie Frontend

A modern React application for browsing and managing a movie collection. Built with React, TypeScript, Vite, and Mantine UI.

## Features

- 🎬 Browse movies with pagination and search
- ⭐ View detailed movie information
- ❤️ Save favorite movies (persisted in localStorage)
- 📱 Responsive design for all devices
- 🎨 Modern UI with Mantine components

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Mantine UI** - Component library
- **Zustand** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vitest** - Unit testing framework

## Prerequisites

- **Node.js** >= 20.x (recommended: 24.x)
- **Bun** >= 1.x (package manager)

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:madhusudhan1234/movies-frontend.git
cd movie-frontend
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost/api
```

Replace the URL with your backend API endpoint.

### 4. Start the development server

```bash
bun run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun run test` | Run tests in watch mode |
| `bun run test --run` | Run tests once |
| `bun run test:coverage` | Run tests with coverage report |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/          # Generic components (LoadingSpinner, EmptyState, etc.)
│   ├── GenreBadges.tsx
│   ├── MovieCard.tsx
│   └── MovieInfoItem.tsx
├── constants/           # App constants
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Page components
├── services/            # API services
├── store/               # Zustand store
├── test/                # Test utilities and test files
│   ├── setup.ts         # Test setup configuration
│   ├── test-utils.tsx   # Custom render with providers
│   ├── components/      # Component tests
│   ├── hooks/           # Hook tests
│   ├── lib/             # Utility tests
│   └── store/           # Store tests
└── types.ts             # TypeScript type definitions
```

## Testing

This project uses **Vitest** with **React Testing Library** for unit testing.

### Running Tests

```bash
# Watch mode
bun run test

# Single run
bun run test --run

# With coverage
bun run test:coverage
```

### Test Structure

Tests are organized in `src/test/` mirroring the source structure:
- `src/test/components/` - Component tests
- `src/test/hooks/` - Hook tests
- `src/test/store/` - Zustand store tests
- `src/test/lib/` - Utility function tests

## API Requirements

The backend API should return movie data in required format.