import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Plane, softShadows, Sphere, useFBX, useGLTF, ContactShadows } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import suzanne from "../models/suzanne.glb"

softShadows()

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += .04))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      castShadow
      receiveShadow
      scale={clicked ? 3 : 2}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Model(props) {
  const gltf = useLoader(GLTFLoader, suzanne)
  return (
    <>
      <primitive object={gltf.scene} {...props}/>
    </>
  );
};

export default function ModelRenderer() {

  return (
    <Canvas>
      <OrbitControls maxDistance={8} minDistance={1} enablePan={false}/>
      <ambientLight intensity={.5} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" />
      <Suspense>
        <Model position={[-2.5,2,0]}/>
      </Suspense>
      <Box position={[0, 1.5, 0]} scale={[1,1,1]}/>
      <Sphere castShadow receiveShadow position={[2, 3, 0]} radius={1}>
        <meshPhongMaterial color="royalblue" />
      </Sphere>

      <Plane receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]} args={[100, 100, 4, 4]}>
        <shadowMaterial opacity={0.5} />
      </Plane>

      <Plane rotation-x={-Math.PI / 2} position={[0, 0, 0]} args={[100, 100, 4, 4]}>
        <meshBasicMaterial opacity={0.5} />
      </Plane>       
    </Canvas>
  )
}
