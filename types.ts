
export interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

export interface GeneratedComponentDetails {
  material: string;
  manufacturingProcess: string;
  keyFeatures: string[];
  estimatedMass: string;
}

export interface EconomicData {
  name: string;
  cost: number;
}
