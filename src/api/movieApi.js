import { apiClient } from './client';
import { ENDPOINTS } from '../constants/api';

export const getAllMovies = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.MOVIES);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await apiClient.get(`${ENDPOINTS.MOVIES}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await apiClient.get(ENDPOINTS.MOVIES, {
      params: { search: query },
    });
    return response.data;
  } catch (error) {
    // API returns 404 when no results found - treat as empty array
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error;
  }
};

