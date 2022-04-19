import React, { useRef, useState } from 'react'
import { Sphere } from "@react-three/drei"

export default function ClickableSphere(props) {
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
        onClick={(event) => click(
          !clicked,
          ref.current.position.x = clicked ? 0 : -1,
          )}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <Sphere castShadow receiveShadow radius={1}>
          <meshPhongMaterial color={hovered ? 'yellow' : 'blue'} />
        </Sphere>
      </mesh>
    )
  }