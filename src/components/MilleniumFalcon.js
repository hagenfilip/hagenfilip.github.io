import React, { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import millenium from "../models/MilleniumFalcon.glb"

export default function MilleniumFalcon(props){
    const group = useRef()
  
    //update loop
    useFrame((state, delta) => (
      group.current.rotation.y += hovered ? 0 : 0.005
      )
    )
    
    const [clicked, click] = useState(false)
    const [hovered, hover] = useState(false)
  
    const { scene } = useLoader(GLTFLoader, millenium)
    return (
      <group ref={group} {...props} dispose={null}>
        <primitive object={scene} onClick={(event) => click(
          !clicked,
          group.current.scale.x = clicked ? 0.015 : 0.01,
          group.current.scale.y = clicked ? 0.015 : 0.01,
          group.current.scale.z = clicked ? 0.015 : 0.01,
          )}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
        />
      </group>
    )
  }