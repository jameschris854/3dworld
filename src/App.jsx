import { Loader, useHelper } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Experience } from "./components/Experience";
import { Debug, Physics } from "@react-three/cannon";
import { AxesHelper, Color, Fog, Vector3 } from "three";
import World from "./components/World";

function App() {
  const debug = false;
  const [bgColor, setBgColor] = useState('#5a47ce');
  // orthographic camera={{position:[0,0,10],zoom:50}}
  return (
    <>
      <Loader />
      <Suspense fallback={null}>
        <Canvas shadows>
        <fog attach="fog" args={[bgColor, 10, 50]} />
        <Physics broadphase="SAP" contactEquationRelaxation={4} friction={1e-3} allowSleep isPaused={false} gravity={[0, 0, -9.82]} > 
            {debug ? <Debug>
              <World />
            </Debug>: <World />}
          </Physics>
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;
