import React, { useState } from "react";
import styled from 'styled-components';
import PopUpHolder from "./components/PopUpHolder";
import { GlobalStyle } from './globalStyles';

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
      <ModalButton onClick={useShowModal}>Clickaroo</ModalButton>
      <PopUpHolder showModal={showModal} useShowModal={useShowModal}/>
      <GlobalStyle/>
    </Container>
    </>
  );
}

export default App;
