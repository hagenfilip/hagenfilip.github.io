import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { TorusKnot } from "@react-three/drei"


export default function ClickableTorusKnot(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
  
    useFrame(
      function() {
        if (hovered) {
          ref.current.scale.x = Math.max((ref.current.scale.x + 0.01)%2, 1),
          ref.current.scale.y = Math.max((ref.current.scale.y + 0.01)%2, 1),
          ref.current.scale.z = Math.max((ref.current.scale.z + 0.01)%2, 1)
        } else{
          ref.current.scale.x = 1,
          ref.current.scale.y = 1,
          ref.current.scale.z = 1
        }
      }
    )
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