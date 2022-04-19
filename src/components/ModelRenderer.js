import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Sphere, Sky, ContactShadows, SpotLight, TorusKnot } from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Suzanne from "./Suzanne.js"
import mclaren from "../models/mclaren.glb"

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (
    ref.current.rotation.y += .02,
    ref.current.rotation.x += .005
    ))
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

function ClickableTorusKnot(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      castShadow
      receiveShadow
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <TorusKnot radius={1} tube={0.5} radialSegments={16} tubularSegments={64}>
        <meshPhongMaterial color={hovered ? 'green' : 'orange'} />
      </TorusKnot>
    </mesh>
  )
}

function ClickableSphere(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      castShadow
      receiveShadow
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <Sphere castShadow receiveShadow radius={1}>
        <meshPhongMaterial color={hovered ? 'yellow' : 'blue'} />
      </Sphere>
    </mesh>
  )
}


function FancyLights(props){
  const ref = useRef()
  useFrame(() => {
    ref.current.position.x = Math.sin(Date.now() * 0.001) * 10
    ref.current.position.y = Math.cos(Date.now() * 0.001) * 10
  })
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight ref={ref} intensity={.7} color="blue" position={[1, 0, 0]} />
      
      <pointLight ref={ref} intensity={.7} color="green" position={[-1, 0, 0]} />
    </>
  )
}

function Setup(props){
  return (
    <>
      <OrbitControls maxDistance={8} minDistance={1} enablePan={false}/>
      <pointLight intensity={.4} color="white" position={[5, 5, 5]}/>
      <Sky distance={450000} sunPosition={[1, 1, 0]} inclination={30} azimuth={.5} {...props} />
      <FancyLights />
      <SpotLight
        position={[0, 4, 0]}
        intensity={.5}
        color={"orange"}
        distance={6}
        angle={0.35}
        attenuation={1}
        anglePower={5} // Diffuse-cone anglePower (default: 5)
      />

      <ContactShadows opacity={1} scale={20} blur={.5} far={10} resolution={256} color="#000000"/>
    </>
  )
}

function Mclaren(props){
  const { scene } = useLoader(GLTFLoader, mclaren)
  return <primitive object={scene} {...props}/>
}

export default function ModelRenderer() {

  return (
    <Canvas>
      <Setup />

      <Suspense>
        <Suzanne position={[-5,2,0]} rotation={[-70,0,0]}/>
      </Suspense>

      <Suspense>
        <Mclaren position={[0,0.7,0]} scale={[10,10,10]}/>
      </Suspense>


      <Box position={[0, 2, 5]} scale={[1,1,1]}/>

      <ClickableSphere position={[0,2,-5]}/>

      <ClickableTorusKnot position={[5,2,0]}/>

        
    </Canvas>
  )
}
