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
        <mesh ref={planeRef} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial opacity={0} transparent color={"#ffffff"} />
        </mesh>
        <mesh ref={cubeRef} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial color={"#ff0000"} />
        </mesh>
        <Vehicle rotation={[Math.PI / 2, 0, 0]} />
        <Text3d text="3D WORLD" textPosition={{ x: 0, y: -5, z: 2.1 }} size={4} depth={2} mass={10} rotation={[Math.PI / 2, 0, 0]} />
        <Text3d text="CAR STIMULATION" textPosition={{ x: 0, y: 5, z: 2.1 }} size={4} depth={2} mass={10} rotation={[Math.PI / 2, 0, 0]} />
        <ambientLight intensity={0.5} />
        <directionalLight castShadow ref={directionalLightRef} position={[0, 0, 10]} intensity={1} />
        <OrbitControls />
    </>
}

export default Sample;