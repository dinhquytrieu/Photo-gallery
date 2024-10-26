// src/api/unsplash.ts
import axios from "axios";
import { Photo } from "../types/Photo";

const ACCESS_KEY = "EhCG4t3dQWXsENDQfCiC8X-ypOIeXw6xDV2aFJ98tUY";

export const fetchPhotos = async (page = 1, perPage = 10): Promise<Photo[]> => {
  const response = await axios.get(
    `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&page=${page}&per_page=${perPage}`
  );
  return response.data;
};

export const fetchPhotoById = async (id: string): Promise<Photo> => {
  const response = await axios.get(
    `https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`
  );
  return response.data;
};
