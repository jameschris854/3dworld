import { useBox } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import React, { useMemo } from "react";
import { Vector3 } from "three";
import { FontLoader, TextGeometry } from "three-stdlib";

const Letter = ({ offset, offsetY, offsetZ, textGeo, mass = 100,rotation }) => {
    const position = new Vector3(offset, offsetY, offsetZ);
  
    const [ref] = useBox(() => ({
      mass,
      position: [position.x, position.y, position.z],
      rotation: rotation,
      args: [textGeo?.textSize.x, textGeo?.textSize.y, textGeo?.textSize.z / 2]
    }));
  
    if (!textGeo) {
      return null;
    }
  
    return (
      <mesh ref={ref} castShadow>
        <primitive object={textGeo?.textGeo} attach="geometry" />
        <meshLambertMaterial />
      </mesh>
    );
  };
  

const Text3d = ({text,textPosition,rotation,size,depth}) => {
    const font = useLoader(FontLoader, 'Oleo_Script_Regular.json');

    const config = useMemo(
        () => ({
          font,
          size: size,
          height: depth,
          curveSegments: 24,
          bevelEnabled: false
        }),
        [font, size, depth]
      );

      const letterGeometriesArr = text.split('').map((letter) => {
        const textGeo = new TextGeometry(letter, config);
        // You need to manually compute bounding box for geometries
        textGeo.computeBoundingBox();
        textGeo.center();
    
        // If you have the bounding box (initially null) get its size or else just create a new vector3
        const textSize = textGeo?.boundingBox?.getSize(new Vector3()) ?? new Vector3();
    
        return { textGeo: textGeo, textSize: textSize };
      });

      const textOffsets = letterGeometriesArr.reduce((acc, curr, idx, arr) => {
        const currLetterWidth = curr?.textSize?.x;
        const prevLetterWidth = arr[idx - 1]?.textSize?.x ?? 0;
    
        // Kerninggggggg
        const distanceToCenter = idx > 0 ? acc[acc.length - 1] + (currLetterWidth + prevLetterWidth) / 2 + 1.5 : textPosition.x;
        acc.push(distanceToCenter);
    
        return acc;
      }, []);

      return letterGeometriesArr.map((textGeo, idx) => {
        // All the props lmao
        return <Letter rotation={rotation} offsetZ={textPosition.z} offsetY={textPosition.y} offset={textOffsets[idx]} textGeo={textGeo} mass={1} key={idx} />;
      });

}

export default Text3d;