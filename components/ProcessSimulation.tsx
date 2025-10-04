import React from 'react';
import { PROCESS_STEPS } from '../constants';
import { ProcessStep } from '../types';

const StepCard: React.FC<{ step: ProcessStep, index: number }> = ({ step, index }) => {
  return (
    <div className="flex items-start my-8">
      <div className="flex flex-col items-center mr-6">
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-cyan-900/50 border-2 border-cyan-400 flex items-center justify-center font-orbitron text-2xl text-cyan-300">
          {step.id}
        </div>
        {index < PROCESS_STEPS.length - 1 && <div className="w-0.5 h-48 bg-cyan-700/50 mt-2"></div>}
      </div>
      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 backdrop-blur-sm transform hover:scale-105 hover:border-cyan-400 transition-all duration-300 w-full">
        <h3 className="text-xl font-bold font-orbitron text-cyan-400 mb-2">{step.title}</h3>
        <p className="text-gray-400">{step.description}</p>
      </div>
    </div>
  );
};


const ProcessSimulation: React.FC = () => {
  return (
    <section id="pipeline" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron">Our In-Space Manufacturing Pipeline</h2>
          <p className="mt-2 text-gray-400 max-w-2xl mx-auto">From conceptual design on Earth to physical reality in orbit, our process is seamless and precise.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          {PROCESS_STEPS.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSimulation;
