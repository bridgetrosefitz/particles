import React, { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import InteractiveTexture from '../textures/InteractiveTexture'
import * as THREE from 'three'

 const Particles = () => {
   const mesh = useRef()
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
   useFrame((state, delta) => {
     InteractiveTexture.update()
     mesh.current.material.uniforms.uTime.value += delta
   })

   return(
     <group>
      <mesh ref={mesh}>
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
          itemSize={1}
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
          depthTest={false}
          transparent
          uniforms={{
            uImageTexture: { value: palaisRoyalTexture },
            uImageTextureSize: { value: new THREE.Vector2(imageWidth, imageHeight)},
            uInteractiveTexture: { value: InteractiveTexture.texture},
            uParticleSize: { value: 1.5 },
            uTime: { value: 0 }
          }}/>
      </mesh>
      <mesh 
        onPointerMove={({ uv }) => InteractiveTexture.addTouch(uv)}>
        <planeGeometry args={[imageWidth, imageHeight, 1, 1]} />
        <meshBasicMaterial
          color='#fff'
          wireframe
          depthTest={false}
          visible={false}
        />
      </mesh>
     </group>
    )
 }

export default Particles;