import React, { useState, useEffect } from 'react';
import { generateFoundryImage } from '../services/geminiService';

const Hero: React.FC = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBgImage = async () => {
      try {
        setIsLoading(true);
        const imageUrl = await generateFoundryImage();
        setBgImage(imageUrl);
      } catch (error) {
        console.error("Failed to load hero background image:", error);
        // Keep the default gradient background on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchBgImage();
  }, []);

  const heroStyle: React.CSSProperties = {
    backgroundImage: bgImage
      ? `linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.7)), url(${bgImage})`
      : `radial-gradient(ellipse at 50% 30%, rgba(13, 40, 67, 0.8), transparent 80%), radial-gradient(ellipse at bottom left, rgba(7, 89, 133, 0.3), transparent 70%), radial-gradient(ellipse at bottom right, rgba(13, 40, 67, 0.5), transparent 70%)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 1s ease-in-out',
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={heroStyle}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className={`text-4xl md:text-6xl font-bold font-orbitron uppercase tracking-wider text-white drop-shadow-[0_2px_5px_rgba(56,189,248,0.8)] transition-opacity duration-1000 ${isLoading ? 'opacity-50 animate-pulse' : 'opacity-100'}`}>
          Orbital Artisan Foundry
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
          Manufacturing the Impossible in the Microgravity Frontier. Bespoke components and art forged in Low Earth Orbit.
        </p>
      </div>
    </section>
  );
};

export default Hero;