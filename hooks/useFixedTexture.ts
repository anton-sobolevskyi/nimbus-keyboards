import { useMemo } from 'react';
import { Texture, TextureEventMap } from 'three';

export const useFixedTexture = (
  texture: Texture<unknown, TextureEventMap>,
  apply: (texture: Texture<unknown, TextureEventMap>) => void,
) => {
  return useMemo(() => {
    const t = texture.clone();

    apply(t);
    // t.needsUpdate = true; // usually not needed for flipY
    return t;
  }, [texture, apply]);
};
