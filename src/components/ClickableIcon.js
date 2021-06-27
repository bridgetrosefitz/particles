import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import '../Modal.css'

const ClickableIcon = (props) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button class="btn btn-secondary btn-circle btn-md" onClick={handleShow}>
        Hi
      </Button>

      <Modal 
        show={show} 
        scrollable={true}
        // style={{opacity: '0.5', color:'black' }}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>RACI App</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ClickableIcon;