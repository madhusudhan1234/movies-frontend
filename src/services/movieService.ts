import Api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

class MovieService {
    async fetchMovies(page: number, query?: string) {
        const params: Record<string, string | number> = { page };
        if (query) {
            params.q = query;
        }
        const response = await Api.get(API_ENDPOINTS.MOVIES, params);
        return response.body;
    }

    async getMovie(id: string) {
        const response = await Api.get(`${API_ENDPOINTS.MOVIES}/${id}`);
        return response.body.data;
    }
}

export default new MovieService();
