'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import ViewContent from '@/components/ViewContent';
import HomeHeader from '@/components/HomeHeader';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [toggleView, setToggleView] = useState<'shared' | 'liked'>('shared');
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      setTimeout(() => router.push('/signin'), 2000);
      return;
    }
    axios
      .get(`${baseUrl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data))
      .catch((error) =>
        setError('error in getting user info! ' + error.response.data?.message),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  return (
    <>
      <HomeHeader />
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center">
            <img
              src={'/recommendations.jpg'}
              alt="Profile"
              className="rounded-full w-32 h-32"
            />
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="text-lg">{user?.email}</p>
          </div>

          <div className="mt-8 w-full">
            <ViewContent
              url={`${baseUrl}/users/media`}
              title="Shared Content"
              isProfile={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
