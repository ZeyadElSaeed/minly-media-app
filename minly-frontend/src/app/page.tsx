'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CallToActionSection from '@/components/CallToActionSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      router.push('/home');
    }
  }, [router]);

  return (
    <div className="bg-gray-50">
      <HeroSection />

      <FeaturesSection />

      <CallToActionSection />

      <FooterSection />
    </div>
  );
}
