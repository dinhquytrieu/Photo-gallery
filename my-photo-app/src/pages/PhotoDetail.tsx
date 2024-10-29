// src/pages/PhotoDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPhotoById } from "../api/unsplash";
import { Photo } from "../types/Photo"; // Import kiểu Photo

const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null); // Sử dụng kiểu Photo
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );

  if (!photo)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Photo not found
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Nút quay lại */}
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-6 hover:bg-blue-600 transition"
      >
        ← Back to Gallery
      </button>

      {/* Thẻ ảnh (Card) */}
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Hình ảnh */}
        <img
          src={photo.urls.full}
          alt={photo.alt_description || "Photo"}
          className="w-full h-auto"
        />

        {/* Thông tin ảnh */}
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2 text-gray-800">
            {photo.alt_description || "No Title Available"}
          </h1>

          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Author:</span> {photo.user.name}
          </p>

          <p className="text-sm text-gray-500">
            {photo.description || "No Description Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
