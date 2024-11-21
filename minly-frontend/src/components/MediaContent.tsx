'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Media } from '@/types/media';
import { MediaType } from '@/types/mediaType';
import { useRouter } from 'next/navigation';

// {media, isProfile}: {media: Media, isProfile: boolean}
const MediaContent = ({
  media,
  isProfile,
}: {
  media: Media;
  isProfile: boolean;
}) => {
  const [mediaContent, setMediaContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('jwtToken');

  const fetchMediaContent = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/media/${media.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: media.type === MediaType.VIDEO ? 'blob' : 'arraybuffer',
      })
      .then((response) => {
        const mediaURL = URL.createObjectURL(
          new Blob([response.data], { type: response.headers['content-type'] }),
        );
        setMediaContent(mediaURL);
      })
      .catch((error) => {
        // console.log(error);
        setError('Failed to load media ' + error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLike = async (mediaId: string) => {
    axios
      .get(`${baseUrl}/media/${mediaId}/like`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => alert('You liked the content'))
      .catch((error) => {
        alert('Error liking media! ' + error.response.data.message);
      });
  };

  const handleUnLike = async (mediaId: string) => {
    axios
      .get(`${baseUrl}/media/${mediaId}/unlike`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => alert('You unliked the content'))
      .catch((error) => {
        alert('Error liking media! ' + error.response.data.message);
      });
  };

  const handleDelete = (mediaId: string) => {
    axios
      .delete(`${baseUrl}/media/${mediaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('You have deleted the content successfully');
        router.refresh();
      })
      .catch((error) => {
        alert('Error in deleting media! ' + error.response.data?.message);
      });
  };

  useEffect(() => {
    fetchMediaContent();
  }, []);

  if (loading) return <p>Loading media...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2 className="text-gray-700 text-xl font-semibold mb-4">
        {media.title}
      </h2>
      {media.type === MediaType.VIDEO ? (
        <video controls className="w-full h-64">
          <source src={mediaContent} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={mediaContent}
          alt={media.title}
          className="w-full h-64 object-cover"
        />
      )}
      <p className="text-gray-600">{`likes: ${media.likes.length}`}</p>
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => handleLike(media.id.toString())}
          className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Like
        </button>
        <button
          onClick={() => handleUnLike(media.id.toString())}
          className="mt-2 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
        >
          Unlike
        </button>
        {isProfile ? (
          <button
            onClick={() => handleDelete(media.id.toString())}
            className="mt-2 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
          >
            Delete
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default MediaContent;
