'use client';
import ViewContent from '@/components/ViewContent';
import HomeHeader from '@/components/HomeHeader';

const HomePage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      <HomeHeader />
      <div className="max-w-4xl mx-auto p-4">
        <ViewContent
          url={`${baseUrl}/media`}
          title="Home"
          isProfile={false}
        ></ViewContent>
      </div>
    </>
  );
};

export default HomePage;
