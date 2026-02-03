export interface Genre {
  name: string;
  label: string;
}

export interface Person {
  full_name: string;
}

export interface Media {
  id: number
  file_name: string
  url: string
  size: {
    byte: number
    formatted: string
  },
  mime_type: string
  responsive: {
    thumb: string
    small: string
    medium: string
    large: string
  },
}

export interface Movie {
  id: number;
  imdb_id: string;
  title: string;
  year: number;
  rated: string;
  released: string;
  runtime: string;
  plot: string;
  language: string;
  country: string;
  awards: string[];
  metascore: string;
  imdb_rating: string;
  imdb_votes: string;
  type: string;
  dvd: string;
  box_office_collection: number;
  production: string;
  website: string;
  created_at: string;
  updated_at: string;
  genres: Genre[];
  directors: Person[];
  actors: Person[];
  producers: Person[];
  poster?: Media;
}

export interface PaginationLinks {
  next?: string;
  prev?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: PaginationLinks;
  };
  message: string;
}
