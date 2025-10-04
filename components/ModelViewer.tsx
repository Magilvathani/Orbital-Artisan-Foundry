// Fix: Add a triple-slash directive to provide type hints for @react-three/fiber elements, fixing JSX-related TypeScript errors.
/// <reference types="@react-three/fiber" />
import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

const Model: React.FC<{ url: string }> = ({ url }) => {
  const isStl = url.toLowerCase().endsWith('.stl');
  // useLoader is suspense-ready, so it will trigger the nearest <Suspense>
  const model = useLoader(isStl ? STLLoader : OBJLoader, url);

  let mesh;
  const material = new THREE.MeshStandardMaterial({ 
    color: '#22d3ee',
    metalness: 0.5,
    roughness: 0.5,
   });

  if (isStl) {
    // STLLoader returns a BufferGeometry
    mesh = new THREE.Mesh(model, material);
  } else {
    // OBJLoader returns a Group. We can traverse it to apply materials.
    (model as THREE.Group).traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    mesh = model;
  }

  // Auto-center and scale the model
  const box = new THREE.Box3().setFromObject(mesh);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 5 / maxDim; // Scale to fit a 5-unit imaginary box

  mesh.position.sub(center).multiplyScalar(scale);
  mesh.scale.set(scale, scale, scale);

  return <primitive object={mesh} />;
};

const ModelViewer: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  return (
    <div className="w-full h-full bg-gray-900/50 rounded-lg border border-gray-700 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Suspense fallback={<Html center className="text-cyan-400">Loading 3D Model...</Html>}>
          {modelUrl ? <Model url={modelUrl} /> : <Html center className="text-gray-500">No model selected</Html>}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;