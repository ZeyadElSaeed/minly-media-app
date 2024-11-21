'use client';
import { useRouter } from 'next/navigation';

const CallToActionSection = () => {
  const router = useRouter();

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Share Your Content?
        </h2>
        <p className="text-lg mb-8">
          Join our platform today and be part of a growing community of
          creators.
        </p>
        <button
          onClick={() => router.push('/signin')}
          className="px-6 py-3 bg-white text-blue-600 text-lg rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Start Sharing
        </button>
      </div>
    </section>
  );
};

export default CallToActionSection;
