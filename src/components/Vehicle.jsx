import { useRef} from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useRaycastVehicle } from '@react-three/cannon';
import useControls from './useControls';
import Drifter from './Drifter';
import Wheel from './Wheel';
import React from 'react';
import FollowCamera from './FollowCamera';
import { Vector3 } from 'three';

const Vehicle = ({ radius = 0.7, width = 1.2, height = 0.3, front = 1.3, back = -1.15, steer = 0.6, force = 3000, maxBrake = 1e5, ...props }) => {
  const chassis = useRef();
  const {camera} = useThree()
  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: radius * 0.8,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: radius * 0.8,
    dampingRelaxation: 10,
    dampingCompression: 4.4,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
    frictionSlip: 2
  };
  const wheels = [useRef(),useRef(),useRef(),useRef()]
  const [vehicle, api] = useRaycastVehicle(() => ({
    chassisBody: chassis,
    wheels: wheels,
    wheelInfos: [
      { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [-width / 1.5, height, front] },
      { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [width / 1.5, height, front] }, 
      { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [-width / 1.5, height, back] },
      { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [width / 1.5, height, back] }
    ],
    indexForwardAxis: 2,
    indexRightAxis: 0,
    indexUpAxis: 1
  }));

  const controls = useControls({reset: () => {
    vehicle.current.position.set(new Vector3(0,0,0));
    chassis.current.position.set(new Vector3(0,0,0));
    chassis.current.rotation.copy(new Vector3(Math.PI/2,Math.PI,0))
    camera.position.set(0,0,10)
  }});
  
  useFrame(() => {

    const forceMultiplier =controls.front ? -1 : controls.back ? 1 : 0;
    api.applyEngineForce(3000 * forceMultiplier, 2)
    api.applyEngineForce(3000 * forceMultiplier, 3)

    const brakeVal = controls.handBrake ? 3000 : 0;
    api.setBrake(brakeVal,0)
    api.setBrake(brakeVal,1)
    api.setBrake(brakeVal,2)
    api.setBrake(brakeVal,3)

    const steer = controls.left ? 1000 : controls.right ? -1000 : 0;
    api.setSteeringValue(steer,0)
    api.setSteeringValue(steer,1)

  });


  return (
    <group castShadow receiveShadow ref={vehicle} position={[0, 0, -0.4]}>
      <Drifter ref={chassis} rotation={props.rotation} />
      <Wheel ref={wheels[0]} radius={radius} leftSide />
      <Wheel ref={wheels[1]} radius={radius} />
      <Wheel ref={wheels[2]} radius={radius} leftSide />
      <Wheel ref={wheels[3]} radius={radius} />
      <FollowCamera target={chassis} />
    </group>
  );
};

export default Vehicle;