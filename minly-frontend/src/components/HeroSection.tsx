'use client';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.webp')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 text-center text-white p-16 md:p-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to ContentHub
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Share, Discover, and Engage with Amazing Content
        </p>
        <button
          onClick={() => router.push('/signin')}
          className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
