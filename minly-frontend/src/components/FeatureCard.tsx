type FeatureCardProps = {
  image: string;
  title: string;
  description: string;
};

const FeatureCard = ({ image, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-gray-700 text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default FeatureCard;
