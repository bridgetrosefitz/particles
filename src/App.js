import React, { useState, Suspense } from "react";
import styled from 'styled-components';
import Modal from "./components/Modal";
import { GlobalStyle } from './globalStyles';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from './components/Particles'
import Footer from './components/Footer'
import modalData from './resources/modalData'
import ClickableIcon from './components/ClickableIcon'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalText, setModalText] = useState('')

  const handleOpenModal = (sphereData) => {
    setShowModal(true)
    setModalTitle(sphereData.title)
    setModalText(sphereData.text)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalTitle('')
    setModalText('')
  }

  const spheres = modalData.map((sphere, index) => {
    return <ClickableIcon key={index} onClick={() => handleOpenModal(sphere)} position={sphere.position}/>
  })

  return (
    <>
    <Container>
      <GlobalStyle/>
      <Suspense fallback={<h1>Loading...</h1>}>     
        <Canvas
          antialias
          alpha
          camera={{ fov: 50, near: 1, far: 10000, position: [0, 0, 310]}}
          colorManagement={false}
          >
          <color attach='background' args={['black']}/>
          <OrbitControls/>
          <ambientLight intensity={0.1} />
          {spheres}
          <Particles /> 
        </Canvas>
      </Suspense>
      <Modal show={showModal} onClose={handleCloseModal} title={modalTitle} text={modalText}/>
      <Footer />
    </Container>
    </>
  );
}

export default App;
