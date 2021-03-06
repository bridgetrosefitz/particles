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

const Modal = (props) => {

  const modalRef = useRef()

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: props.show ? 1 : 0,
    transform: props.show ? `translateY(0%)` : `translateY(-100%)`
  })

  const closeModal = e => {
    if(modalRef.current === e.target) {
      props.onClose()
    }
  }

  const keyPress = useCallback(e => {
    if(e.key === 'Escape' && props.show) {
      props.onClose()
    }

  }, [props.onClose, props.show])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return (
    <>
      {
        props.show ? (
          <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
              <ModalWrapper showModal={props.show}>
              <ModalContent>
                <h1>{props.title}</h1>
                <p>{props.text}</p>
              </ModalContent>
                <CloseModalButton aria-label='Close modal' onClick={props.onClose}/>
             </ModalWrapper>
          </animated.div>
          </Background> ) : null 
      }
    </>
  )
}

export default Modal

