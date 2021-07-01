import React, { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import InteractiveTexture from '../textures/InteractiveTexture'
import * as dat from 'dat.gui'
import gsap from "gsap";
import * as THREE from 'three'

const gui = new dat.GUI({ width: 500})
const debugObject = {skipFactor:1}

 const Particles = props => {

   const mesh = useRef()
   const myBufferGeometry = useRef()

   const palaisRoyalTexture = useTexture('images/palais-royal-3.png')
   palaisRoyalTexture.minFilter = THREE.LinearFilter
   palaisRoyalTexture.magFilter = THREE.LinearFilter
   palaisRoyalTexture.format = THREE.RGBFormat

   const imageWidth = palaisRoyalTexture.image.width
   const imageHeight = palaisRoyalTexture.image.height

   const imagePixelCount = imageWidth * imageHeight

   let imageVisiblePixelCount = imagePixelCount
   let colorThresholdForVisibility = 0
   let imageOriginalColors
   const applyColorThreshold = true

   if (applyColorThreshold) {
     imageVisiblePixelCount = 0
     colorThresholdForVisibility = 200

     const imageToBeChanged = palaisRoyalTexture.image
     const temporaryCanvasForPhotoEditing = document.createElement('canvas')
     const context = temporaryCanvasForPhotoEditing.getContext('2d')

     temporaryCanvasForPhotoEditing.width = imageWidth
     temporaryCanvasForPhotoEditing.height = imageHeight
     context.scale(1, -1)
     context.drawImage(imageToBeChanged, 0, 0, imageWidth, imageHeight * -1)

     const imageData = context.getImageData(0, 0, temporaryCanvasForPhotoEditing.width, temporaryCanvasForPhotoEditing.height)
     imageOriginalColors = Float32Array.from(imageData.data)

     for(let i = 0; i < imagePixelCount; i++) {
       if(imageOriginalColors[i * 4 + 0] > colorThresholdForVisibility) {imageVisiblePixelCount++}
     }
   }

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

   const particleIndices = new Uint16Array(imagePixelCount)
   const particleOffsets = new Float32Array(imagePixelCount * 3)
   const particleDispersionAngles = new Float32Array(imagePixelCount)

    for(let i = 0; i < imagePixelCount; i++) {
      const skipFactor = 1
      const pixelSkipper = Math.floor((Math.random() + 1) * skipFactor)
      const weakestColor = 255
      const strongestColor = 1

      if (
        applyColorThreshold && 

        (imageOriginalColors[i*pixelSkipper * 4 + 0] >= weakestColor &&
         imageOriginalColors[i*pixelSkipper * 4 + 1] >= weakestColor &&
         imageOriginalColors[i*pixelSkipper * 4 + 2] >= weakestColor) ||

        (imageOriginalColors[i*pixelSkipper * 4 + 0] <= strongestColor &&
         imageOriginalColors[i*pixelSkipper * 4 + 1] <= strongestColor &&
         imageOriginalColors[i*pixelSkipper * 4 + 2] <= strongestColor)
        ) continue;
      

      particleOffsets[i * 3 * pixelSkipper + 0] = (i * pixelSkipper) % imageWidth
      particleOffsets[i * 3 * pixelSkipper + 1] = Math.floor((i * pixelSkipper) / imageWidth)

      particleIndices[i* pixelSkipper] = i

      particleDispersionAngles[i* pixelSkipper] = Math.random() * Math.PI;
    }

   useFrame((state, delta) => {
     InteractiveTexture.update()
     mesh.current.material.uniforms.uTime.value += delta
   })

   useEffect(() => {
     gsap.fromTo(
       mesh.current.material.uniforms.uParticleSize,
       { value: 0},
       { duration: 9, value: 0.5}
     );
     gsap.to(
       mesh.current.material.uniforms.uRandomDisplacementWeight, 
      { duration: 9, value: 5 }
     );
     gsap.fromTo(
       mesh.current.material.uniforms.uParticleDepth,
       { value: 180},
       { duration: 6, value: 8}
     )

     gui.add(mesh.current.material.uniforms.uParticleSize, 'value')
     .min(0.001)
     .max(10)
     .step(0.001)
     .name('uParticleSize')

     gui.add(mesh.current.material.uniforms.uRandomDisplacementWeight, 'value')
       .min(0.01)
       .max(100)
       .step(0.01)
       .name('uRandomDisplacementWeight')

     gui.add(debugObject, 'skipFactor')
       .min(1)
       .max(20)
       .step(1)
       .onFinishChange((skipFactor) => {
         const particleIndices = new Uint16Array(imagePixelCount)
         const particleOffsets = new Float32Array(imagePixelCount * 3)
         const particleDispersionAngles = new Float32Array(imagePixelCount)
         for (let i = 0; i < imagePixelCount; i++) {
           const pixelSkipper = Math.floor((Math.random() + 1) * skipFactor)
           const weakestColor = 255
           const strongestColor = 1

           if (
             applyColorThreshold &&

             (imageOriginalColors[i * pixelSkipper * 4 + 0] >= weakestColor &&
               imageOriginalColors[i * pixelSkipper * 4 + 1] >= weakestColor &&
               imageOriginalColors[i * pixelSkipper * 4 + 2] >= weakestColor) ||

             (imageOriginalColors[i * pixelSkipper * 4 + 0] <= strongestColor &&
               imageOriginalColors[i * pixelSkipper * 4 + 1] <= strongestColor &&
               imageOriginalColors[i * pixelSkipper * 4 + 2] <= strongestColor)
           ) continue;


           particleOffsets[i * 3 * pixelSkipper + 0] = (i * pixelSkipper) % imageWidth
           particleOffsets[i * 3 * pixelSkipper + 1] = Math.floor((i * pixelSkipper) / imageWidth)

           particleIndices[i * pixelSkipper] = i

           particleDispersionAngles[i * pixelSkipper] = Math.random() * Math.PI;
         }

         myBufferGeometry.current.attributes.aParticleIndex.array = particleIndices
         myBufferGeometry.current.attributes.aParticleOffset.array = particleOffsets
         myBufferGeometry.current.attributes.aParticleDispersionAngle.array = particleDispersionAngles
         myBufferGeometry.current.attributes.aParticleIndex.needsUpdate = true
         myBufferGeometry.current.attributes.aParticleOffset.needsUpdate = true
         myBufferGeometry.current.attributes.aParticleDispersionAngle.needsUpdate = true
       })


      }, [])

   return(
     <group {...props}>
      <mesh ref={mesh} >
         <instancedBufferGeometry ref={myBufferGeometry}>
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
          attachObject={["attributes", "aParticleIndex"]}
          count={particleIndices.length}
          array={particleIndices}
          itemSize={1}
          normalized={false}
        />
         <instancedBufferAttribute
           attachObject={["attributes", "aParticleOffset"]}
           count={particleOffsets.length / 3}
           array={particleOffsets}
           itemSize={3}
           normalized={false}
         />
         <instancedBufferAttribute
           attachObject={["attributes", "aParticleDispersionAngle"]}
           count={particleDispersionAngles.length}
           array={particleDispersionAngles}
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
            uParticleSize: { value: 0.0 },
            uTime: { value: 0 },
            uParticleDepth: { value: 2.0 }, 
            uRandomDisplacementWeight: { value: 30.0 }
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