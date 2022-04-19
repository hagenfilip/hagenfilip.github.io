import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, ContactShadows, SpotLight } from "@react-three/drei"
import Suzanne from "../components/Suzanne.js"
import MilleniumFalcon from "../components/MilleniumFalcon.js"
import ClickableBox from "../components/ClickableBox.js"
import ClickableSphere from "../components/ClickableSphere.js"
import ClickableTorusKnot from "../components/ClickableTorusKnot.js"


function FancyLights(props){
  const ref = useRef()
  useFrame(() => {
    ref.current.position.x = Math.sin(Date.now() * 0.001) * 10
    ref.current.position.y = Math.cos(Date.now() * 0.001) * 10
  })
  return (
    <>
      <pointLight ref={ref} intensity={.7} color="blue" position={[1, 0, 0]} />
      <pointLight ref={ref} intensity={.7} color="green" position={[-1, 0, 0]} />
      <pointLight intensity={.4} color="white" position={[5, 5, 5]}/>
    </>
  )
}

function Setup(props){
  return (
    <>
      <OrbitControls maxDistance={8} minDistance={3} enablePan={false}/>
      <FancyLights />
      <SpotLight
        position={[0, 4, 0]}
        intensity={.5}
        color={"white"}
        distance={6}
        angle={0.5}
        attenuation={1}
        anglePower={5} // Diffuse-cone anglePower (default: 5)
      />
      <Sphere scale={[0.2,0.2,0.2]} position={[0,4,0]}>
        <meshPhongMaterial color="white"/>
      </Sphere>

      <ContactShadows opacity={1} scale={20} blur={.5} far={10} resolution={256} color="#000000"/>
    </>
  )
}

export default function ModelRenderer() {

  return (
    <Canvas>
      <color attach="background" args={["grey"]} />

      <Setup />

      <Suspense>
        <Suzanne position={[-5,2,0]} rotation={[-70,0,0]}/>
      </Suspense>

      <Suspense>
        <MilleniumFalcon position={[0,0.7,0]} scale={[.015,.015,.015]}/>
      </Suspense>

      <ClickableBox position={[0, 2, 5]} scale={[1,1,1]}/>

      <ClickableSphere position={[0,2,-5]}/>

      <ClickableTorusKnot position={[5,2,0]}/>
      
    </Canvas>
  )
}
