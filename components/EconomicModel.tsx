import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import { EconomicData } from '../types';

const EconomicModel: React.FC = () => {
  const [units, setUnits] = useState<number>(10);

  // Constants for calculation
  const launchCost = 5000000;
  const materialCostPerUnit = 50000;
  const manufacturingCostPerUnit = 120000;
  const rdCost = 2000000;
  const fixedCosts = launchCost + rdCost;
  const variableCostPerUnit = materialCostPerUnit + manufacturingCostPerUnit;

  // Data for Bar Chart (Total Cost Breakdown)
  const barChartData: EconomicData[] = useMemo(() => {
    return [
      { name: 'Launch', cost: launchCost },
      { name: 'R&D', cost: rdCost },
      { name: 'Materials', cost: materialCostPerUnit * units },
      { name: 'Manufacturing', cost: manufacturingCostPerUnit * units },
    ];
  }, [units]);

  // Data for Line Chart (Average Cost Curve)
  const lineChartData = useMemo(() => {
    const dataPoints = [];
    for (let i = 1; i <= 50; i++) {
      const totalCost = fixedCosts + (variableCostPerUnit * i);
      const avgCost = totalCost / i;
      dataPoints.push({ units: i, 'Average Cost Per Unit': avgCost });
    }
    return dataPoints;
  }, [fixedCosts, variableCostPerUnit]);

  const totalCost = fixedCosts + (variableCostPerUnit * units);
  const costPerUnit = totalCost / units;

  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-gray-700 border border-gray-600 rounded-md shadow-lg text-sm">
          <p className="label text-gray-300">{`Units: ${label}`}</p>
          <p className="intro text-cyan-400">{`${payload[0].name}: $${payload[0].value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-gray-700 border border-gray-600 rounded-md shadow-lg text-sm">
          <p className="label text-gray-300">{label}</p>
          <p className="intro text-cyan-400">{`Cost: $${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="economics" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron">Economic Viability Model</h2>
          <p className="mt-2 text-gray-400 max-w-2xl mx-auto">An interactive model simulating the cost structure and economies of scale for a manufacturing run.</p>
        </div>

        <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-lg border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            <div className="lg:col-span-2">
              <h3 className="text-xl font-orbitron mb-4 text-cyan-400">Simulation Parameters</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="units" className="block text-sm font-medium text-gray-300">Number of Units (Batch Size): <span className="font-bold text-white">{units}</span></label>
                  <input
                    type="range"
                    id="units"
                    min="1"
                    max="50"
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h4 className="font-bold text-gray-400">Total Project Cost:</h4>
                  <p className="text-2xl font-orbitron text-cyan-300">${totalCost.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h4 className="font-bold text-gray-400">Average Cost Per Unit:</h4>
                  <p className="text-2xl font-orbitron text-cyan-300">${costPerUnit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-orbitron mb-2 text-cyan-400">Analysis</h4>
                <p className="text-sm text-gray-400">
                  This simulation demonstrates economies of scale. High fixed costs (Launch, R&D) are spread across more units as the batch size increases, drastically reducing the average cost per unit. This is key to OAF's economic viability for high-value components.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div>
                <h4 className="text-lg font-orbitron mb-4 text-center text-cyan-400">Average Cost Per Unit Curve</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: 30, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                      <XAxis dataKey="units" stroke="#a0aec0" label={{ value: 'Number of Units', position: 'insideBottom', offset: -10, fill: '#a0aec0' }} />
                      <YAxis stroke="#a0aec0" tickFormatter={(value) => `$${(Number(value) / 1000000).toFixed(1)}M`} />
                      <Tooltip content={<CustomLineTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="Average Cost Per Unit" 
                        stroke="#22d3ee" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                      <Line dataKey="Average Cost Per Unit" stroke="none" activeDot={false} dot={(props) => {
                          const { cx, cy, payload } = props;
                          if (payload.units === units) {
                              return <circle cx={cx} cy={cy} r={5} fill="#22d3ee" stroke="#fff" strokeWidth={1} />;
                          }
                          return null;
                      }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-orbitron mb-4 text-center text-cyan-400">Total Cost Breakdown</h4>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                            <XAxis type="number" stroke="#a0aec0" tickFormatter={(value) => `$${(Number(value)/1000000).toFixed(1)}M`} />
                            <YAxis type="category" dataKey="name" stroke="#a0aec0" width={90} />
                            <Tooltip content={<CustomBarTooltip />} />
                            <Bar dataKey="cost" fill="#22d3ee" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EconomicModel;