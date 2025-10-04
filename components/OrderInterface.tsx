import React, { useState } from 'react';
import { generateComponentDetails, generateComponentImage } from '../services/geminiService';
import { GeneratedComponentDetails } from '../types';
import { OBJECT_TYPES, MATERIALS } from '../constants';
import { RocketIcon, CheckCircleIcon, CpuIcon } from './IconComponents';

interface GeneratedResult {
  details: GeneratedComponentDetails;
  imageUrl: string;
}

const OrderInterface: React.FC = () => {
  const [objectType, setObjectType] = useState<string>(OBJECT_TYPES[0]);
  const [material, setMaterial] = useState<string>(MATERIALS[0]);
  const [prompt, setPrompt] = useState<string>('A lightweight but durable satellite bracket with intricate lattice structures for heat dissipation.');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Generate details and image in parallel
      const [details, imageUrl] = await Promise.all([
        generateComponentDetails(objectType, material, prompt),
        generateComponentImage(objectType, material, prompt)
      ]);
      setResult({ details, imageUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="interface" className="py-20 bg-gray-900/70" style={{ backgroundImage: 'linear-gradient(rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.95)), url(https://picsum.photos/1920/1080?grayscale&blur=5)'}}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron">Design & Simulation Interface</h2>
          <p className="mt-2 text-gray-400 max-w-2xl mx-auto">Configure your bespoke orbital-manufactured component and let our AI generate a conceptual specification.</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-orbitron mb-6 text-cyan-400">Order Configuration</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="objectType" className="block text-sm font-medium text-gray-300">Object Type</label>
                <select id="objectType" value={objectType} onChange={e => setObjectType(e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500">
                  {OBJECT_TYPES.map(type => <option key={type}>{type}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="material" className="block text-sm font-medium text-gray-300">Base Material</label>
                <select id="material" value={material} onChange={e => setMaterial(e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500">
                  {MATERIALS.map(mat => <option key={mat}>{mat}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-300">Component Description / Artistic Vision</label>
                <textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" placeholder="e.g., A fluid, organic sculpture representing stellar nurseries..."></textarea>
              </div>
              <div>
                <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Specification...
                    </>
                  ) : (
                    <>
                      <RocketIcon className="w-5 h-5 mr-2" />
                      Generate AI Specification
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Result Section */}
          <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700 backdrop-blur-sm flex flex-col min-h-[500px]">
             {isLoading && (
              <div className="flex-grow flex flex-col justify-center items-center text-center text-gray-400">
                <CpuIcon className="w-12 h-12 mx-auto animate-pulse text-cyan-500" />
                <p className="mt-2">Contacting Orbital Foundry AI...</p>
                <p className="text-sm">Generating visualization and technical data...</p>
              </div>
            )}
            {error && <div className="m-auto text-red-400 bg-red-900/50 p-4 rounded-md">{error}</div>}
            
            {result && !isLoading && (
              <div className="animate-fade-in flex-grow flex flex-col">
                <div className="flex-shrink-0 mb-4 h-64 md:h-80 bg-gray-900/50 rounded-lg overflow-hidden border border-gray-700">
                    <img src={result.imageUrl} alt="Generated component visualization" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                    <h3 className="text-2xl font-orbitron mb-4 text-cyan-400">Generated Specification</h3>
                    <div className="space-y-3">
                        <div>
                            <h4 className="font-bold text-gray-400 text-sm">Material Composition:</h4>
                            <p className="text-md text-cyan-300">{result.details.material}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 text-sm">Manufacturing Process:</h4>
                            <p className="text-md text-cyan-300">{result.details.manufacturingProcess}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 text-sm">Estimated Mass:</h4>
                            <p className="text-md text-cyan-300">{result.details.estimatedMass}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 text-sm">Key Features (Microgravity Enabled):</h4>
                            <ul className="space-y-1 mt-1">
                            {result.details.keyFeatures.map((feature, i) => (
                                <li key={i} className="flex items-start text-sm">
                                <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
              </div>
            )}
             {!result && !isLoading && !error && (
                <div className="m-auto text-center text-gray-500 text-sm py-8">
                    <p>Your generated component specification and image will appear here.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderInterface;