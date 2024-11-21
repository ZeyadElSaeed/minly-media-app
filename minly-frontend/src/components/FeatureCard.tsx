import Image from 'next/image';

type FeatureCardProps = {
  image: string;
  title: string;
  description: string;
};

const FeatureCard = ({ image, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <Image
        src={image}
        alt={title}
        className="w-full h-auto object-cover rounded-md mb-4"
        width={1000}
        height={1000}
      />
      <h3 className="text-gray-700 text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default FeatureCard;
