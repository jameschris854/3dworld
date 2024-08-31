import { useBox, usePlane } from "@react-three/cannon";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper, Mesh, PlaneGeometry, PlaneHelper } from "three";
import Vehicle from "./Vehicle";
import Text3d from "./Text3d";
import { MeshProps, ThreeElements, useFrame } from "@react-three/fiber";

const Sample = () => {

    const [planeRef] = usePlane<Mesh>(() => ({ position: [0, 0, 0], type: 'Static', material: "ground" }))
    const [cubeRef] = useBox<Mesh>(() => ({
        mass: 5,
        position: [0, 0, 10],
        args: [1, 1, 1],
        rotation: [0, 0, 0],
        velocity: [1, 0, 0],  // Initial velocity in the X direction
    }))

    const directionalLightRef = useRef<DirectionalLight>()

    return <>
        <mesh ref={planeRef} castShadow receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshPhysicalMaterial
            color="silver"    // Base color of the material
            metalness={1}     // Fully metallic
            roughness={0.3}   // Medium roughness
            />
        </mesh>
        <mesh ref={cubeRef} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial color={"#ff0000"} />
            
        </mesh>
        <Vehicle rotation={[Math.PI/2, Math.PI, 0]} />
        <Text3d text="3D WORLD" textPosition={{ x: 0, y: -5, z: 2.1 }} size={4} depth={2} mass={10} rotation={[Math.PI / 2, 0, 0]} />
        <Text3d text="CAR STIMULATION" textPosition={{ x: 0, y: 5, z: 2.1 }} size={4} depth={2} mass={10} rotation={[Math.PI / 2, 0, 0]} />
        {/* <ambientLight intensity={0.5} /> */}
        <directionalLight castShadow ref={directionalLightRef} position={[0, 0, 10]} intensity={1} />
        <OrbitControls />
    </>
}

export default Sample;