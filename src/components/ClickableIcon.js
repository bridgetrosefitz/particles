import React from "react";

const ClickableIcon = (props) => {

  return (
    <>
      <mesh onClick={props.useShowModal} position={props.position}>
        <sphereGeometry args={[20, 32, 32]}/>
        <meshStandardMaterial/>
      </mesh>
    </>
  )
}

export default ClickableIcon;