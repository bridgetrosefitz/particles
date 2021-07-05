import React from "react";
import { Html } from "@react-three/drei";

const ClickableIcon = (props) => {

  return (
    <>
      <mesh {...props} >
        <sphereGeometry args={[2.5, 32, 32]}/>
        <meshStandardMaterial/>
        <Html distanceFactor={200}>
          <div 
            class="content" 
            style={{ 
              color: "black",
              fontSize: 10, 
              backgroundColor: 'white', 
              height: 40,
              width: 40, 
              padding: 10, 
              borderRadius: '50%',
              justify: 'center' }}>
            G'day
          </div>
        </Html>
      </mesh>
    </>
  )
}

export default ClickableIcon;