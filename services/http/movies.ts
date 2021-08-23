import axios from 'axios';
import { AxiosMoviesResponse, EntitiesType } from '../../models/movies';

/**
 * Credentials
 */
const apiKey = '35a879acd4b6e6f60cc7cf965c339a68';
const url = 'https://api.themoviedb.org/3';

export function getPopular(type: EntitiesType): Promise<any> {
	return axios.get(`${url}/${type}/popular?${getApiKey()}`);
}

export function getUpcoming(): Promise<AxiosMoviesResponse> {
	return axios.get(`${url}/movie/upcoming?${getApiKey()}`);
}

export function getFamilyMovies(): Promise<any> {
	const familyMovieId = 10751;
	return axios.get(`${url}/discover/movie?${getApiKey()}&with_genres=${familyMovieId}`);
}

export function getById(id: number, type: EntitiesType): Promise<any> {
	return axios.get(`${url}/${type}/${id}?${getApiKey()}`);
}

export function searchMovieTv(entitiesType: EntitiesType, query: string): Promise<any> {
	return axios.get(`${url}/search/${entitiesType}?${getApiKey()}&query=${query}`);
}

/**
 * @returns api_key param
 */
function getApiKey(): string {
	return `api_key=${apiKey}`;
}
