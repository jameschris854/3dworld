import { useThree, useFrame } from "@react-three/fiber";
import React from "react";
import { Vector3 } from "three";

const FollowCamera = ({ target }) => {
    const { camera } = useThree();
    const offset = new Vector3(0, 0, 10);
    const lookAtOffset = new Vector3(0, 0, 0);
    const cameraPosition = new Vector3();
    const targetPosition = new Vector3();
  
    useFrame(() => {
      if (target.current) {
        target.current.getWorldPosition(targetPosition);
        cameraPosition.copy(targetPosition).add(offset);
        
        // Smoothly interpolate camera position
        camera.position.lerp(cameraPosition, 0.1);
        
        // Ensure the camera looks at the vehicle
        camera.lookAt(targetPosition.add(lookAtOffset));
      }
    });
  
    return null;
  };

export default FollowCamera;