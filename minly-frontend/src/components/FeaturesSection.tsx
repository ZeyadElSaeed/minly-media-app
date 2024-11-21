import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-gray-700 text-3xl font-bold mb-8">
          Features You'll Love
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            image="/upload.webp"
            title="Easy Content Upload"
            description="Upload videos, images, or articles with a few clicks and share your creativity with the world."
          />
          <FeatureCard
            image="/engage.jpg"
            title="Engage with Community"
            description="Join discussions, comment on posts, and connect with like-minded creators."
          />
          <FeatureCard
            image="/recommendations.jpg"
            title="Personalized Recommendations"
            description="Receive tailored content suggestions based on your interests and interactions."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
