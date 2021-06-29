import React, { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import * as THREE from 'three'

 const Particles = () => {
   const palaisRoyalTexture = useTexture('images/palais-royal-1.png')
   palaisRoyalTexture.minFilter = THREE.LinearFilter
   palaisRoyalTexture.magFilter = THREE.LinearFilter
   palaisRoyalTexture.format = THREE.RGBFormat

   const imageWidth = palaisRoyalTexture.image.width
   const imageHeight = palaisRoyalTexture.image.height

   const imagePixelCount = imageWidth * imageHeight

   const positions = new Float32Array([
     -0.5,  0.5,  0.0,
      0.5,  0.5,  0.0,
     -0.5, -0.5,  0.0,
      0.5, -0.5,  0.0
   ])

   const uvs = new Float32Array([
     0.0,  0.0, 
     1.0,  0.0, 
     0.0,  1.0,
     1.0,  1.0
    ])

   const index = new Uint16Array([0, 2, 1, 2, 3, 1])

   const indices = new Uint16Array(imagePixelCount)
   const offsets = new Float32Array(imagePixelCount * 3)
   const angles = new Float32Array(imagePixelCount)

    for(let i = 0; i < imagePixelCount; i++) {
      
      offsets[i * 3 + 0] = i % imageWidth
      offsets[i * 3 + 1] = Math.floor(i / imageWidth)

      indices[i] = i

      angles[i] = Math.random() * Math.PI;
    }
   
   return(
      <mesh>
        <instancedBufferGeometry> 
          <bufferAttribute
            attach="index"
            count={index.length}
            array={index}
            itemSize={1}
          />
         <bufferAttribute
           attachObject={["attributes", "position"]}
           count={positions.length / 3}
           array={positions}
           itemSize={3}
         />
         <bufferAttribute
           attachObject={["attributes", "uv"]}
           count={uvs.length / 2}
           array={uvs}
           itemSize={2}
         />
        <instancedBufferAttribute
          attachObject={["attributes", "pindex"]}
          count={indices.length}
          array={indices}
          itemSize={3}
          normalized={false}
        />
         <instancedBufferAttribute
           attachObject={["attributes", "offset"]}
           count={offsets.length / 3}
           array={offsets}
           itemSize={3}
           normalized={false}
         />
         <instancedBufferAttribute
           attachObject={["attributes", "angle"]}
           count={angles.length}
           array={angles}
           itemSize={1}
           normalized={false}
         />
       </instancedBufferGeometry>
        <shaderMaterial 
          fragmentShader={fragmentShader} 
          vertexShader={vertexShader} 
          uniforms={{
            uTexture: { value: palaisRoyalTexture },
            uTextureSize: { value: new THREE.Vector2(imageWidth, imageHeight)}
          }}/>
      </mesh>
    )
 }

export default Particles;