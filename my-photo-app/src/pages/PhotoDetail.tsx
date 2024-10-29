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
        Back to Photos
      </button>

      {/* Hình ảnh */}
      <div className="w-full mb-6">
        <img
          src={photo.urls.full}
          alt={photo.alt_description || "Photo"}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Thông tin ảnh */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          {photo.alt_description || "No Title Available"}
        </h1>

        <p className="text-lg text-gray-600 mb-4">
          <span className="font-semibold">Author:</span> {photo.user.name}
        </p>

        <p className="text-base text-gray-500">
          {photo.description || "No Description Available"}
        </p>
      </div>
    </div>
  );
};

export default PhotoDetail;
