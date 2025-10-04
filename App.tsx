import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OperationalSimulation from './components/OperationalSimulation';
import ProcessSimulation from './components/ProcessSimulation';
import OrderInterface from './components/OrderInterface';
import EconomicModel from './components/EconomicModel';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <Header />
      <main>
        <Hero />
        <OperationalSimulation />
        <ProcessSimulation />
        <OrderInterface />
        <EconomicModel />
      </main>
      <Footer />
    </div>
  );
};

export default App;
