import React, { useState, Suspense } from "react";
import styled from 'styled-components';
import PopUpHolder from "./components/PopUpHolder";
import { GlobalStyle } from './globalStyles';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from './components/Particles'

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
const App = () => {
  const [showModal, setShowModal] = useState(false)

  const useShowModal = () => {
    setShowModal(prev => !prev)
  }

  return (
    <>
    <Container>
      <GlobalStyle/>
      <Suspense fallback={<h1>Loading...</h1>}>     
        <Canvas
          antialias
          alpha
          camera={{ fov: 50, near: 1, far: 10000, position: [0, 0, 300]}}
          colorManagement={false}
          >
          <OrbitControls/>
          <Particles/> 
        </Canvas>
      </Suspense>
      <PopUpHolder showModal={showModal} useShowModal={useShowModal}/>
    </Container>
    </>
  );
}

export default App;
