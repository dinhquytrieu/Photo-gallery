// src/pages/PhotoList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPhotos } from "../api/unsplash";
import { Photo } from "../types/Photo"; // Import kiểu dữ liệu Photo

const PhotoList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]); // Sử dụng kiểu Photo[]
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //   useEffect(() => {
  //     const loadPhotos = async () => {
  //       setLoading(true);
  //       const newPhotos: Photo[] = await fetchPhotos(page);
  //       if (newPhotos.length === 0) setHasMore(false);
  //       setPhotos((prev) => [...prev, ...newPhotos]);
  //       setLoading(false);
  //     };
  //     loadPhotos();
  //   }, [page]);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      try {
        const newPhotos: Photo[] = await fetchPhotos(page);
        if (newPhotos.length === 0) setHasMore(false);
        setPhotos((prev) => [...prev, ...newPhotos]);
      } catch (error) {
        console.error("Error fetching photo list:", error); // Log lỗi ra console
      } finally {
        setLoading(false);
      }
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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos.map((photo) => (
          <Link to={`/photos/${photo.id}`} key={photo.id} className="block">
            <img
              src={photo.urls.thumb}
              alt={photo.alt_description || "Photo"}
              className="w-full h-48 object-cover rounded"
            />
            <p className="text-center mt-2 text-sm">{photo.user.name}</p>
          </Link>
        ))}
      </div>
      {loading && <div className="text-center mt-4">Loading...</div>}
      {!hasMore && <div className="text-center mt-4">No more photos</div>}
    </div>
  );
};

export default PhotoList;
