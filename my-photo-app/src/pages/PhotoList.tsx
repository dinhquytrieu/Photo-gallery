// src/pages/PhotoList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPhotos } from "../api/unsplash";

const PhotoList: React.FC = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      const newPhotos = await fetchPhotos(page);
      if (newPhotos.length === 0) setHasMore(false);
      setPhotos((prev) => [...prev, ...newPhotos]);
      setLoading(false);
    };
    loadPhotos();
  }, [page]);

  const loadMorePhotos = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !loading
      ) {
        loadMorePhotos();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <Link to={`/photos/${photo.id}`} key={photo.id} className="photo-item">
          <img src={photo.urls.thumb} alt={photo.alt_description || "Photo"} />
          <p>{photo.user.name}</p>
        </Link>
      ))}
      {loading && <div>Loading...</div>}
      {!hasMore && <div>No more photos</div>}
    </div>
  );
};

export default PhotoList;
