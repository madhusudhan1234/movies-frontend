import { describe, expect, it } from "vitest"
import { MovieCard } from "../../components/MovieCard"
import type { Movie } from "../../types"
import { render, screen } from "../test-utils"

const mockMovie: Movie = {
  id: 1,
  imdb_id: "tt1234567",
  title: "Test Movie Title",
  year: 2023,
  rated: "PG-13",
  released: "2023-01-15",
  runtime: "120 min",
  plot: "This is a test plot for the movie. It should be truncated in the card display.",
  language: "English",
  country: "USA",
  awards: ["Best Picture", "Best Director"],
  poster: {
    id: 1,
    file_name: "400.jpeg",
    url: "http://localhost/storage/1/400.jpeg",
    size: {
      byte: 57992,
      formatted: "56.63 KB",
    },
    mime_type: "image/jpeg",
    responsive: {
      thumb: "http://localhost/storage/1/conversions/400-thumb.jpg",
      small: "http://localhost/storage/1/conversions/400-small.jpg",
      medium: "http://localhost/storage/1/conversions/400-medium.jpg",
      large: "http://localhost/storage/1/conversions/400-large.jpg",
    },
  },
  metascore: "75",
  imdb_rating: "8.5",
  imdb_votes: "10000",
  type: "movie",
  dvd: "2023-06-01",
  box_office_collection: 100000000,
  production: "Test Production",
  website: "https://example.com",
  created_at: "2023-01-01",
  updated_at: "2023-01-01",
  genres: [
    { name: "action", label: "Action" },
    { name: "drama", label: "Drama" },
  ],
  directors: [{ full_name: "John Director" }],
  actors: [
    { full_name: "Actor One" },
    { full_name: "Actor Two" },
  ],
  producers: [{ full_name: "Producer One" }],
}

describe("MovieCard", () => {
  it("renders movie title", () => {
    render(<MovieCard movie={mockMovie}/>)
    expect(screen.getByText("Test Movie Title")).toBeInTheDocument()
  })

  it("renders movie IMDb rating", () => {
    render(<MovieCard movie={mockMovie}/>)
    expect(screen.getByText("8.5")).toBeInTheDocument()
  })

  it("renders movie plot", () => {
    render(<MovieCard movie={mockMovie}/>)
    expect(screen.getByText(/This is a test plot/)).toBeInTheDocument()
  })

  it("renders View Details button as link to movie detail page", () => {
    render(<MovieCard movie={mockMovie}/>)
    const link = screen.getByRole("link", { name: /view details/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/movies/1")
  })

  it("renders movie poster image", () => {
    render(<MovieCard movie={mockMovie}/>)
    const images = screen.getAllByTestId(mockMovie.id)
    expect(images[0]).toBeInTheDocument()
    expect(images[0]).toHaveAttribute("src", "http://localhost/storage/1/conversions/400-thumb.jpg")
  })

  it("renders FavoriteButton component", () => {
    render(<MovieCard movie={mockMovie}/>)
    expect(screen.getByRole("button", { name: /add to favorites/i })).toBeInTheDocument()
  })
})
