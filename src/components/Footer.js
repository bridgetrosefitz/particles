import React from 'react'
import styled, { keyframes } from 'styled-components'
import { AiFillGithub, AiOutlineMail } from 'react-icons/ai'
import { TiSocialLinkedin } from 'react-icons/ti'

const FooterBackground = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  background: transparent;
  height: 100%;
  width: 5%;
  color: #fff;
`

// const SpinAnimation = keyframes`
//   0% {
//     transform:rotate(0deg);
//   }
//   100% {
//     transform:rotate(360deg);
//   }
// `;


const Icon = styled.a`
  ${'' /* &:after {
    content: " 🦄";
    animation-name: ${SpinAnimation};
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    display: inline-block;
  } */}
  text-decoration: none;
  padding: 10px;
  margin-left: 25px;
  font-size: 30px;
  color: #fff;
  height: 50px;
`

const WorkModeButton = styled.button`
  height: 60px;
  width: 60px;
  padding: 5px;
  margin-left: 25px;
  margin-bottom: 25px;
  font-size: 15px;
  background-colorManagement: rgba(1, 1, 1);
  color: black;
  border: 5px;
  border-color: white;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  bottom: 0;
`

const allIcons = [
  {
    component: <AiFillGithub />,
    link: 'https://github.com/bridgetrosefitz'
  }, 
  {
    component: <TiSocialLinkedin />,
    link: 'https://www.linkedin.com/in/bridgetrosefitzgerald/',
  },
  {
    component: <AiOutlineMail />,
    link: 'mailto:bridgetrosefitz@gmail.com',
  }]

  const styledIconsGroup = allIcons.map(icon => {
    return(
      <Icon href={icon.link} target="_blank">
        {icon.component}
      </Icon>
    )
  })

const Footer = props => {

  return(
    <FooterBackground>
      <WorkModeButton onClick={() => alert('I love Kevin')}>Work mode</WorkModeButton>
      {styledIconsGroup}
    </FooterBackground>
  )
}

export default Footer