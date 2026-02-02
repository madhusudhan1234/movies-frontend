import Api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

class MovieService {
    async fetchMovies(page: number) {
        const response = await Api.get(API_ENDPOINTS.MOVIES, { page });
        return response.body;
    }
}

export default new MovieService();
