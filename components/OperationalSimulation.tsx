import React, { useState, useEffect } from 'react';

const STAGES = {
  IDLE: 'IDLE',
  LAUNCH: 'LAUNCH',
  MANUFACTURING: 'MANUFACTURING',
  RETURN: 'RETURN',
};

const stageDescriptions: { [key: string]: { title: string; description: string } } = {
  IDLE: {
    title: 'Awaiting Command',
    description: 'Simulation is ready. Select a phase or press play to begin the full operational sequence.',
  },
  LAUNCH: {
    title: 'Phase 1: Launch & Rendezvous',
    description: 'A launch vehicle transports raw materials and mission-specific hardware from Earth to the OAF station in Low Earth Orbit.',
  },
  MANUFACTURING: {
    title: 'Phase 2: Orbital Manufacturing',
    description: 'Autonomous robotic systems and advanced 3D printers fabricate the component in the unique microgravity environment.',
  },
  RETURN: {
    title: 'Phase 3: Secure Re-entry',
    description: 'The finished, high-value asset is packaged and returned to Earth via a specialized re-entry vehicle for delivery to the client.',
  },
};


const OperationalSimulation: React.FC = () => {
  const [stage, setStage] = useState(STAGES.IDLE);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (stage === STAGES.IDLE || stage === STAGES.RETURN) {
        setStage(STAGES.LAUNCH);
      }
      const sequence = [STAGES.LAUNCH, STAGES.MANUFACTURING, STAGES.RETURN];
      const currentIndex = sequence.indexOf(stage);
      
      if (currentIndex < sequence.length - 1) {
        timer = setTimeout(() => {
          setStage(sequence[currentIndex + 1]);
        }, 5000); // 5 seconds per stage
      } else {
        // End of sequence
        timer = setTimeout(() => {
            setIsPlaying(false);
        }, 5000);
      }
    }
    return () => clearTimeout(timer);
  }, [stage, isPlaying]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && (stage === STAGES.IDLE || stage === STAGES.RETURN)) {
      setStage(STAGES.LAUNCH);
    }
  };

  const setStageManually = (newStage: string) => {
    setIsPlaying(false);
    setStage(newStage);
  }

  return (
    <section id="operational-simulation" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron">Operational Concept Simulation</h2>
          <p className="mt-2 text-gray-400 max-w-2xl mx-auto">Visualize our end-to-end process, from Earth to orbit and back again.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* SVG Animation */}
          <div className="lg:col-span-2 relative h-[400px] bg-gray-900/50 rounded-lg border border-gray-700 p-4 overflow-hidden">
            <style>
              {`
                .station-arm {
                  transform-origin: 145px 190px;
                  animation: ${stage === STAGES.MANUFACTURING ? 'swivel 2.5s ease-in-out infinite alternate' : 'none'};
                }
                .station-light {
                  animation: ${stage === STAGES.MANUFACTURING ? 'pulse 1s infinite' : 'none'};
                }
                .rocket, .capsule {
                  offset-path: path("M50,350 C150,150 450,150 550,350");
                  offset-distance: 0%;
                  opacity: 0;
                }
                .rocket.launch {
                  animation: launch-path 5s ease-in-out forwards;
                }
                .capsule.return {
                  animation: return-path 5s ease-in-out forwards;
                }
                @keyframes launch-path {
                  0% { offset-distance: 0%; opacity: 1; }
                  90% { transform: scale(1); }
                  100% { offset-distance: 48%; opacity: 0; transform: scale(0.5); }
                }
                @keyframes return-path {
                  0% { offset-distance: 52%; opacity: 1; transform: scale(0.5) rotate(180deg); }
                  100% { offset-distance: 100%; opacity: 1; transform: scale(1) rotate(180deg); }
                }
                @keyframes pulse {
                  0%, 100% { fill: #f0f; opacity: 0.7; }
                  50% { fill: #f0f; opacity: 1; }
                }
                @keyframes swivel {
                    from { transform: rotate(-15deg); }
                    to { transform: rotate(15deg); }
                }
              `}
            </style>
            <svg viewBox="0 0 600 400" className="w-full h-full">
              {/* Orbit Path */}
              <path d="M50,350 C150,150 450,150 550,350" stroke="#0ea5e9" strokeOpacity="0.3" strokeWidth="2" fill="none" strokeDasharray="8 8" />

              {/* Earth */}
              <circle cx="300" cy="800" r="500" fill="url(#earthGradient)" />
              <defs>
                <radialGradient id="earthGradient">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#083344" />
                </radialGradient>
              </defs>

              {/* OAF Station */}
              <g transform="translate(260, 160)" className={stage === STAGES.MANUFACTURING ? 'manufacturing' : ''}>
                <rect x="0" y="20" width="80" height="20" rx="5" fill="#9ca3af" />
                <rect x="20" y="0" width="40" height="60" rx="5" fill="#6b7280" />
                <circle cx="40" cy="30" r="5" className="station-light" fill="#f0f" opacity="0.7" />
                <rect x="-15" y="25" width="20" height="10" fill="#e5e7eb" />
                <rect x="75" y="25" width="20" height="10" fill="#e5e7eb" />
                 <path d="M 40 30 L 20 50 L 10 40" className="station-arm" stroke="#f8fafc" strokeWidth="2" fill="none"/>
              </g>
              
               {/* Rocket */}
              <g className={`rocket ${stage === STAGES.LAUNCH ? 'launch' : ''}`}>
                <path d="M-10,5 L10,0 L-10,-5 L-5,0 Z" fill="#f1f5f9"/>
              </g>

              {/* Re-entry capsule */}
              <g className={`capsule ${stage === STAGES.RETURN ? 'return' : ''}`}>
                 <path d="M-8 8 L 8 8 A 12 12, 0, 0, 1, -8 8 Z" transform="rotate(180) translate(0, -8)" fill="#f59e0b" />
              </g>

            </svg>
          </div>

          {/* Controls and Status */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-orbitron mb-2 text-cyan-400">{stageDescriptions[stage].title}</h3>
              <p className="text-gray-400 min-h-[100px]">{stageDescriptions[stage].description}</p>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex space-x-2">
                <button onClick={handlePlayPause} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors">
                  {isPlaying ? 'Pause' : 'Play Full Sequence'}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                 <button onClick={() => setStageManually(STAGES.LAUNCH)} className={`font-semibold py-2 px-2 rounded text-xs transition-colors ${stage === STAGES.LAUNCH ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
                  Launch
                </button>
                <button onClick={() => setStageManually(STAGES.MANUFACTURING)} className={`font-semibold py-2 px-2 rounded text-xs transition-colors ${stage === STAGES.MANUFACTURING ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
                  Manufacture
                </button>
                 <button onClick={() => setStageManually(STAGES.RETURN)} className={`font-semibold py-2 px-2 rounded text-xs transition-colors ${stage === STAGES.RETURN ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
                  Return
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationalSimulation;
