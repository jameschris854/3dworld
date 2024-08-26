import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import { Box, Environment, Float, OrbitControls, Plane, Sphere, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useRef, useState } from "react";
import { AxesHelper, CameraHelper, Color, DirectionalLight, DirectionalLightHelper, MathUtils, PointLightHelper } from "three";
import { generateUUID } from "three/src/math/MathUtils";
import { randInt } from "three/src/math/MathUtils.js";

const Ball = memo(({ color, size ,position }) => {
  const [sphereRef,api] = useSphere(() => ({
    mass: 100,
    position: Object.values(position), 
    rotation: [0, 0, 0], 
    args: [size],
    linearDamping: 0.1,
    angularDamping: 0.1,
    restitution: 0.7,
    collisionMargin: 0.01, // Adjusting collision margin
    friction: 0.1
  }));

  useFrame(() => api.applyTorque([0, 10, 0]));

  useEffect(() => {
    const initialPush = [100, 0, 0]; // Push in the X direction
    api.applyImpulse(initialPush, [0, 0, 0]); // Apply impulse at the center of the cube
  }, [api]);
  return <mesh ref={sphereRef} castShadow>

    <sphereGeometry args={[size, 32, 16]} />
    {/* <meshStandardMaterial color={color} /> */}
    <meshPhysicalMaterial
        color={color}
        roughness={0.5}  // Lower value for glossier finish
        metalness={0.9}  // Higher value for more metallic and reflective appearance
      />
  </mesh>
})

const Cube = memo(({ color, size ,position }) => {
  const [cubeRef,api] = useBox(() => ({
    mass: 100,
    position: Object.values(position), 
    rotation: [0, 0, 0], 
    args: [size,size,size],
    linearDamping: 0.1,
    angularDamping: 0.1,
    restitution: 0.7,
    collisionMargin: 0.01, // Adjusting collision margin
    friction: 0.1
  }));

  useFrame(() => api.applyTorque([0, 10, 0]));

  useEffect(() => {
    const initialPush = [100, 0, 0]; // Push in the X direction
    api.applyImpulse(initialPush, [0, 0, 0]); // Apply impulse at the center of the cube
  }, [api]);

  return <mesh ref={cubeRef} castShadow>
    <boxGeometry args={[size, size, size]} />
    <meshPhysicalMaterial
        color={color}
        roughness={0.5}  // Lower value for glossier finish
        metalness={0.9}  // Higher value for more metallic and reflective appearance
      />
  </mesh>
})

const FunObjectsRenderer = memo((props) => {
    if(randInt(0,10)%2 === 0){
      return <Ball key={props.id} {...props} />
    }else{
      return <Cube key={props.id} {...props} />
    }
})

export const Experience = () => {
  const [planeRef] = usePlane(() => ({ position: [0, -0, 0], rotation: [-Math.PI / 2, 0, 0] }));
  const [funObjects, setfunObjects] = useState([]);
  
  // useFrame(({ clock }) => api.rotation.set(-Math.PI / 2, Math.sin(clock.getElapsedTime()) * 0.5, Math.sin(clock.getElapsedTime()) * 0.5, 0, 0))

  const dirLightRef = useRef();
  const orbitRef = useRef();

  console.log(orbitRef)

  useHelper(dirLightRef, PointLightHelper, 5, "red");
  useHelper(dirLightRef.current?.shadow?.camera, CameraHelper, 10, "cyan");
  useHelper(planeRef,AxesHelper,10,"#ff0000")

  useEffect(() => {
    let pos =() => ({x:200*randInt(1,1.3),y:300*randInt(1,1.3),z:200*randInt(1,1.3)})
    const handleMove = (e) => {
      // pos.x = window.innerWidth - e.x
      // pos.y = e.y
    }
    document.addEventListener("mousemove", handleMove);


    const handleClick = () => {
      const randNum = () => MathUtils.randInt(0, 255);
      const color = new Color(`rgb(${randNum()},${randNum()},${randNum()})`);

      setfunObjects((prev) => ([...prev, { color, size: MathUtils.randInt(10, 15), id: generateUUID() ,position:pos() }]));
    }
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mousemove", handleClick);
    }
  }, []);

  
  return (
    <>
    <ambientLight intensity={2} />
    <pointLight
    ref={dirLightRef}
    castShadow
    intensity={2000}
    distance={5000}
    power={10000}
    decay={5000}
    position={[100, 100, 100]}
    />
      <directionalLight
        ref={dirLightRef}
        intensity={5}
        castShadow
        position={[200, 300, 200]} // Position adjusted for better coverage
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={1000}
        shadow-camera-left={-500}
        shadow-camera-right={500}
        shadow-camera-top={500}
        shadow-camera-bottom={-500}
      />
      <mesh ref={planeRef} receiveShadow>
        <planeGeometry args={[2000, 2000]} /> {/* Increased plane size */}
        <meshStandardMaterial
        color={"#ffffff"}
        roughness={0.1}  // Lower value for glossier finish
        metalness={0.9}  // Higher value for more metallic and reflective appearance
      />
      </mesh>
      {funObjects.map((props) => <FunObjectsRenderer key={props.id} {...props} />)}
      <OrbitControls autoRotate ref={orbitRef} />
    </>
  );
};
