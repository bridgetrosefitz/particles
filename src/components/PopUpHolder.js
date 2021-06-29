import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { NoToneMapping } from 'three'
import { MdClose } from 'react-icons/md'

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  ${'' /* grid-template-columns: 1fr 1fr; */}
  position: relative;
  z-index: 10;
  border-radius: 10px;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: normal;
  align-items: left;
  padding: 5em 5em;
  line-height: 1.8;
  color: #141414;

  h1 {
      font-weight: 600;
  }
  
  p {
    margin-bottom: 1rem;
    font-weight: 100;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`

const PopUpHolder = (props) => {

  const modalRef = useRef()

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: props.showModal ? 1 : 0,
    transform: props.showModal ? `translateY(0%)` : `translateY(-100%)`
  })

  const closeModal = e => {
    if(modalRef.current === e.target) {
      props.useShowModal()
    }
  }

  const keyPress = useCallback(e => {
    if(e.key === 'Escape' && props.showModal) {
      props.useShowModal()
    }

  }, [props.useShowModal, props.showModal])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return (
    <>
      {
        props.showModal ? (
          <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
              <ModalWrapper showModal={props.showModal}>
              <ModalContent>
                <h1>A little history...</h1>
                <p>In 1789, King Louis VXI's soldiers moved into Palais Royal and disrupted a group of citizens.</p>
              </ModalContent>
              <CloseModalButton aria-label='Close modal' onClick = {() => props.useShowModal()}/>
             </ModalWrapper>
          </animated.div>
          </Background> ) : null 
      }
    </>
  )
}

export default PopUpHolder

