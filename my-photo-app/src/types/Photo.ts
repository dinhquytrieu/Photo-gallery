// src/types/Photo.ts
export interface Photo {
  id: string;
  urls: {
    thumb: string;
    full: string;
  };
  user: { name: string; profile_image: { small: string } };
  alt_description: string | null;
  description: string | null;
}
