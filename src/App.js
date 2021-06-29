import React, { useState, useRef } from "react";
import styled from 'styled-components';
import PopUpHolder from "./components/PopUpHolder";
import { GlobalStyle } from './globalStyles';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const ModalButton = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  boder: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`

const Box = props => {
  const mesh = useRef()
  const [isHovered, setIsHovered ] = useState(false);

  const useIsHovered = () => {
    setIsHovered(prev => !prev)
  }

  useFrame(() => { 
    mesh.current.rotation.x += .01
    mesh.current.rotation.y += .01
  })

  return (
    <mesh {...props} scale={[2, 1, 1]} ref={mesh} onPointerOver={useIsHovered} onPointerOut={useIsHovered}>
      <boxGeometry args={[1, 1, 1]}>
      </boxGeometry>
      <meshStandardMaterial roughness={0} metalness={0.5} refractionRatio={20} color={isHovered ? 'white' : 'pink'} />
    </mesh>
  )
}

const App = () => {
  const [showModal, setShowModal] = useState(false)

  const useShowModal = () => {
    setShowModal(prev => !prev)
  }

  return (
    <>
    <Container>
    <Canvas>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      <OrbitControls/>
          <Box onClick={useShowModal} />
    </Canvas>
      <PopUpHolder showModal={showModal} useShowModal={useShowModal}/>
      <GlobalStyle/>
    </Container>
    </>
  );
}

export default App;
