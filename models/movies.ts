import { AxiosResponse } from 'axios';

export interface Movie {
	id: number;
	poster_path: string;
}

export interface MoviesResponse {
	results: Movie[];
}

export enum EntitiesType {
	Movie = 'movie',
	Tv = 'tv',
}

export type AxiosMoviesResponse = AxiosResponse<MoviesResponse>;
