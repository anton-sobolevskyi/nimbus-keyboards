'use client';

import { Keyboard } from '@/components/Keyboard';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Keycap } from '@/components/Keycap';

export function Scene() {
  const scallingFactor = window.innerWidth <= 500 ? 0.5 : 1;
  return (
    <group>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />

      <group scale={scallingFactor}>
        <Keyboard
          scale={9}
          position={[0.2, -0.5, 1.8]}
          rotation={[1.6, 0.4, 0]}
        />

        <group>
          <Keycap position={[0, -0.4, 2.6]} textureIndex={0} />
          <Keycap position={[-1.4, 0, 2.3]} textureIndex={1} />

          <Keycap position={[-1.8, 1, 1.5]} textureIndex={2} />
          <Keycap position={[0, 1, 1]} textureIndex={3} />

          <Keycap position={[0.7, 0.9, 1.4]} textureIndex={4} />
          <Keycap position={[1.3, -0.3, 2.3]} textureIndex={5} />

          <Keycap position={[0, 1, 2]} textureIndex={6} />
          <Keycap position={[-0.7, 0.6, 2]} textureIndex={7} />

          <Keycap position={[-0.77, 0.1, 2.8]} textureIndex={8} />
          <Keycap position={[2, 0, 1]} textureIndex={7} />
        </group>
      </group>

      <Environment
        files={['/hdr/blue-studio.hdr']}
        environmentIntensity={0.05}
      />

      <spotLight
        position={[-2, 1.5, 3]}
        intensity={30}
        castShadow
        shadow-bias={-0.0002}
        shadow-normalBias={0.0002}
        shadow-mapSize={1024}
      />
    </group>
  );
}
