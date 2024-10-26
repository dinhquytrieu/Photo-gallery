// src/pages/PhotoDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPhotoById } from "../api/unsplash";
import { Photo } from "../types/Photo"; // Import kiểu Photo

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null); // Sử dụng kiểu Photo
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhoto = async () => {
      setLoading(true);
      try {
        const photoData: Photo = await fetchPhotoById(id!); // Fetch dữ liệu với kiểu Photo
        setPhoto(photoData);
      } catch (error) {
        console.error("Failed to fetch photo:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPhoto();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!photo) return <div>Photo not found</div>;

  return (
    <div className="photo-detail">
      <img src={photo.urls.full} alt={photo.alt_description || "Photo"} />
      <h1>{photo.description || "No Description Available"}</h1>
      <p>Author: {photo.user.name}</p>
    </div>
  );
};

export default PhotoDetail;
