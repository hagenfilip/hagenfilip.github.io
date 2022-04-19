import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import mclaren from "../models/mclaren.glb"

export default function Mclaren(props){
    const { scene } = useLoader(GLTFLoader, mclaren)
    return <primitive object={scene} {...props}/>
}