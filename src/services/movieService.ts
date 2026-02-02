import Api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

class MovieService {
    async fetchMovies(page: number) {
        const response = await Api.get(API_ENDPOINTS.MOVIES, { page });
        return response.body;
    }

    async getMovie(id: string) {
        const response = await Api.get(`${API_ENDPOINTS.MOVIES}/${id}`);
        return response.body.data;
    }
}

export default new MovieService();
