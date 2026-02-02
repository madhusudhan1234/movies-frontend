export interface Movie {
    id: number;
    imdb_id: string;
    title: string;
    year: number;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    metascore: string;
    imdb_rating: string;
    imdb_votes: string;
    type: string;
    dvd: string;
    box_office: string;
    production: string;
    website: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    };
}
