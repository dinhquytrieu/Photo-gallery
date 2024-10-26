// src/pages/PhotoDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPhotoById } from "../api/unsplash";

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhoto = async () => {
      setLoading(true);
      const photoData = await fetchPhotoById(id!);
      setPhoto(photoData);
      setLoading(false);
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
