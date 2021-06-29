import React from "react";
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

 const Particles = () => {
   return(
      <mesh>
        <planeGeometry args={[1,1]}/>
        <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader}/>
      </mesh>
    )
 }

export default Particles;