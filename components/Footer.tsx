
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <p className="font-orbitron text-lg text-gray-300 mb-2">Orbital Artisan Foundry</p>
        <p>&copy; {new Date().getFullYear()} OAF Industries. All rights reserved.</p>
        <p className="text-sm mt-2">Pioneering the future of manufacturing, one orbit at a time.</p>
      </div>
    </footer>
  );
};

export default Footer;
