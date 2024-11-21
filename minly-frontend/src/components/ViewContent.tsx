'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Media } from '@/types/media';
import { useRouter } from 'next/navigation';
import MediaContent from './MediaContent';

const ViewContent = ({
  url,
  title,
  isProfile,
}: {
  url: string;
  title: string;
  isProfile: boolean;
}) => {
  const [content, setContent] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const fetchContent = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      setTimeout(() => router.push('/'), 2000);
      return;
    }
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        content.push(...response.data);
      })
      .catch((error) => setError(error.response.data?.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) {
    return <p>Loading content...</p>;
  }
  if (error) {
    return <p className="text-center">{error}</p>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {title}
        </h1>
        {content.length === 0 && (
          <p className="text-center text-gray-500">No media available</p>
        )}
        {content.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-md shadow-md space-y-4"
          >
            <MediaContent media={item} isProfile={isProfile} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewContent;
