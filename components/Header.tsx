import React from 'react';

const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold font-orbitron text-cyan-400">
          OAF
        </div>
        <ul className="flex space-x-6 text-gray-300">
          <li><button onClick={() => scrollToSection('operational-simulation')} className="hover:text-cyan-400 transition-colors">Simulation</button></li>
          <li><button onClick={() => scrollToSection('pipeline')} className="hover:text-cyan-400 transition-colors">Pipeline</button></li>
          <li><button onClick={() => scrollToSection('interface')} className="hover:text-cyan-400 transition-colors">Order</button></li>
          <li><button onClick={() => scrollToSection('economics')} className="hover:text-cyan-400 transition-colors">Economics</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
