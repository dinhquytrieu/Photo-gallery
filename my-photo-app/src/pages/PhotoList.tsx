// src/pages/PhotoList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css"; // Import thư viện Masonry
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

  // Cấu hình breakpoints cho Masonry
  const breakpointColumnsObj = {
    default: 4, // Số cột mặc định
    1100: 3, // 3 cột nếu chiều rộng dưới 1100px
    700: 2, // 2 cột nếu chiều rộng dưới 700px
    500: 1, // 1 cột nếu chiều rộng dưới 500px
  };

  return (
    <div className="container mx-auto p-4">
      <Masonry
        breakpointCols={breakpointColumnsObj} // Responsive column configuration for the layout
        className="flex w-auto gap-x-4 gap-y-4"
        columnClassName="masonry-grid-column"
      >
        {photos.map((photo) => (
          <Link
            to={`/photos/${photo.id}`}
            key={photo.id}
            className="relative block mb-4"
          >
            <div className="relative overflow-hidden rounded">
              <img
                src={photo.urls.thumb}
                alt={photo.alt_description || "Photo"}
                className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2">
                {photo.user.name}
              </div>
            </div>
          </Link>
        ))}
      </Masonry>
      {loading && <div className="text-center mt-4">Loading...</div>}
      {!hasMore && <div className="text-center mt-4">No more photos</div>}
    </div>
  );
};

export default PhotoList;
