import React from "react";

const ClickableIcon = (props) => {

  return (
    <>
      <mesh {...props}>
        <sphereGeometry args={[20, 32, 32]}/>
        <meshStandardMaterial/>
      </mesh>
    </>
  )
}

export default ClickableIcon;