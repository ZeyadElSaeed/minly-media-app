'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Media } from '@/types/media';
import { MediaType } from '@/types/mediaType';
import Modal from './Modal';
import Image from 'next/image';
import Snackbar from './SnackBar';

const MediaContent = ({
  media,
  isProfile,
  refreshingPage,
}: {
  media: Media;
  isProfile: boolean;
  refreshingPage: () => void;
}) => {
  const [mediaContent, setMediaContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(media.title);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: 'error' | 'success' | 'info';
    visible: boolean;
  }>({
    message: '',
    type: 'info',
    visible: false,
  });
  const [token, setToken] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const showSnackbar = (
    message: string,
    type: 'error' | 'success' | 'info',
  ) => {
    setSnackbar({ message, type, visible: true });
  };

  const handleLike = async (mediaId: string) => {
    axios
      .get(`${baseUrl}/media/${mediaId}/like`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        showSnackbar('You liked the content', 'success');
        refreshingPage();
      })
      .catch((error) => {
        showSnackbar(
          'Error liking media! ' + error.response.data.message,
          'error',
        );
      });
  };

  const handleUnLike = async (mediaId: string) => {
    axios
      .get(`${baseUrl}/media/${mediaId}/unlike`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        showSnackbar('You unliked the content', 'success');
        refreshingPage();
      })
      .catch((error) => {
        showSnackbar(
          'Error unliking media! ' + error.response.data.message,
          'error',
        );
      });
  };

  const handleEdit = () => {
    axios
      .patch(
        `${baseUrl}/media/${media.id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        showSnackbar('Title updated successfully', 'success');
        refreshingPage();
        setIsModalOpen(false);
      })
      .catch((error) =>
        showSnackbar(
          'Error updating title! ' + error.response?.data?.message,
          'error',
        ),
      );
  };

  const handleDelete = (mediaId: string) => {
    axios
      .delete(`${baseUrl}/media/${mediaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        showSnackbar('You have deleted the content successfully', 'success');
        refreshingPage();
      })
      .catch((error) => {
        showSnackbar(
          'Error in deleting media! ' + error.response.data?.message,
          'error',
        );
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwtToken');
    setToken(localStorage.getItem('jwtToken'));
    const fetchMediaContent = () => {
      setLoading(true);
      axios
        .get(`${baseUrl}/media/${media.id}`, {
          headers: { Authorization: `Bearer ${jwt}` },
          responseType: media.type === MediaType.VIDEO ? 'blob' : 'arraybuffer',
        })
        .then((response) => {
          const mediaURL = URL.createObjectURL(
            new Blob([response.data], {
              type: response.headers['content-type'],
            }),
          );
          setMediaContent(mediaURL);
        })
        .catch((error) => {
          setError('Failed to load media ' + error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMediaContent();
  }, []);

  if (loading) return <p>Loading media...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2 className="text-gray-700 text-xl font-semibold mb-4">
        {media.title}
      </h2>
      <div className="flex justify-center items-center">
        {media.type === MediaType.VIDEO ? (
          <video controls className="max-w-full max-h-full">
            <source src={mediaContent} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={mediaContent}
            alt={media.title}
            className="max-w-full max-h-full object-contain"
            width={1000}
            height={1000}
          />
        )}
      </div>
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
        {isProfile && (
          <>
            <button
              onClick={() => handleDelete(media.id.toString())}
              className="mt-2 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
            >
              Delete
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Edit Title
            </button>
          </>
        )}
      </div>

      {/* Snackbar */}
      {snackbar.visible && (
        <Snackbar
          message={snackbar.message}
          messageType={snackbar.type}
          onClose={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
        />
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h3 className="text-lg font-semibold mb-4">Edit Title</h3>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-gray-500 border border-gray-300 p-2 rounded-md w-full mb-4"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MediaContent;
