import { API_ENDPOINTS } from "../constants/apiEndpoints"
import type { Movie, PaginatedResponse } from "../types"
import Api from "./api"

interface MovieDetailResponse {
  data: Movie;
}

class MovieService {
  async fetchMovies(page: number, query?: string): Promise<PaginatedResponse<Movie>> {
    const params: Record<string, string | number> = {page}
    if (query) {
      params.q = query
    }
    const response = await Api.get<PaginatedResponse<Movie>>(API_ENDPOINTS.MOVIES, params)
    return response.body
  }

  async getMovie(id: string): Promise<Movie> {
    const response = await Api.get<MovieDetailResponse>(`${API_ENDPOINTS.MOVIES}/${id}`)
    return response.body.data
  }
}

export default new MovieService()
