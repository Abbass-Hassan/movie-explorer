import { apiClient } from './client';
import { ENDPOINTS } from '../constants/api';

export const getAllFavorites = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.FAVORITES);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToFavorites = async (movie) => {
  try {
    const response = await apiClient.post(ENDPOINTS.FAVORITES, movie);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromFavorites = async (id) => {
  try {
    const response = await apiClient.delete(`${ENDPOINTS.FAVORITES}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

