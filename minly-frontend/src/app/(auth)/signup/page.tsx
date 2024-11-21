'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    await axios
      .post(`${baseUrl}/users`, { name, email, password })
      .then(() => {
        router.push('/signin');
      })
      .catch((error) => {
        setError(error.response.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-gray-500 text-xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-gray-800 w-full p-2 mb-4 border border-gray-300 rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-gray-800 w-full p-2 mb-4 border border-gray-300 rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-gray-800 w-full p-2 mb-4 border border-gray-300 rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="text-gray-500 mt-4 text-center">
        Already have an account?{' '}
        <a href="/signin" className="text-blue-500">
          Sign-in here
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;
