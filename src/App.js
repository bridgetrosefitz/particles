import React, { useState, Suspense } from "react";
import styled from 'styled-components';
import Modal from "./components/Modal";
import { GlobalStyle } from './globalStyles';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from './components/Particles'
import modalData from './resources/modalData'
import ClickableIcon from './components/ClickableIcon'

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
          {/* <Particles
              onClick={useShowModal}
          />  */}
          {spheres}
        </Canvas>
      </Suspense>
      <Modal show={showModal} onClose={handleCloseModal} title={modalTitle} text={modalText}/>
    </Container>
    </>
  );
}

export default App;
