
import { ProcessStep } from './types';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Phase 1: Terrestrial Design & Order',
    description: 'Clients collaborate with our engineers on Earth to design bespoke components or artworks. The digital blueprint is finalized and securely uploaded to the orbital foundry.'
  },
  {
    id: 2,
    title: 'Phase 2: Orbital Raw Material Processing',
    description: 'Robotic arms select high-purity raw materials stored in the vacuum of space. Materials are processed and prepared for additive manufacturing in a controlled microgravity environment.'
  },
  {
    id: 3,
    title: 'Phase 3: Zero-G Additive Manufacturing',
    description: 'Our advanced 3D printers fabricate the object layer by layer, creating complex geometries and flawless material structures impossible to achieve under Earth\'s gravity.'
  },
  {
    id: 4,
    title: 'Phase 4: Autonomous Quality Assurance',
    description: 'The finished product undergoes rigorous non-destructive testing and analysis by autonomous robotic systems to ensure it meets the highest standards of quality and precision.'
  },
  {
    id: 5,
    title: 'Phase 5: Secure Re-entry & Delivery',
    description: 'The component is packaged in a specialized re-entry vehicle and delivered back to Earth, ready for integration or display by the client.'
  }
];

export const OBJECT_TYPES = ['High-Performance Satellite Component', 'Bespoke Artistic Sculpture', 'Advanced Medical Implant', 'Experimental Alloy Sample'];
export const MATERIALS = ['Astro-Titanium Weave', 'Lunar Regolith Composite', 'Zero-G Crystalline Alloy', 'Bio-Inert Polymer Matrix'];
