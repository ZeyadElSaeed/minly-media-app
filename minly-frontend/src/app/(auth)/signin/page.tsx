'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    axios
      .post(`${baseUrl}/auth/login`, { email, password })
      .then((response) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('jwtToken', response.data.accessToken);
          router.push('/home');
        }
      })
      .catch((error) =>
        setError('Invalid credentials! ' + error.response.data?.message),
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-gray-500 text-xl font-semibold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
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
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-gray-500 mt-4 text-center">
        Don&apos;t have an account?{' '}
        <a href="/signup" className="text-blue-500">
          Register here
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
