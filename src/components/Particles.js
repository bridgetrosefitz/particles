import React, { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

 const Particles = () => {
   const palaisRoyalTexture = useTexture('images/palais-royal-1.png')

   return(
      <mesh>
        <planeGeometry args={[1,1,10,10]}/>
        <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={{uTexture: {value: palaisRoyalTexture}}}/>
      </mesh>
    )
 }

export default Particles;