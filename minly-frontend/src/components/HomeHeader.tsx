'use client';
import { useRouter } from 'next/navigation';
import MediaUpload from './MediaUpload';

const HomeHeader = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    router.push('/');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo or App Name */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => handleNavigate('/')}
        >
          ContentHub
        </div>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <button
            onClick={() => handleNavigate('/')}
            className="hover:bg-blue-500 px-4 py-2 rounded-md transition duration-200"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigate('/profile')}
            className="hover:bg-blue-500 px-4 py-2 rounded-md transition duration-200"
          >
            My Profile
          </button>

          <MediaUpload />

          <button
            onClick={() => handleLogout()}
            className="hover:bg-blue-500 px-4 py-2 rounded-md transition duration-200"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
