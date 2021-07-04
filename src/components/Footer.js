import React from 'react'
import styled from 'styled-components'
import { AiFillGithub, AiOutlineMail } from 'react-icons/ai'
import { TiSocialLinkedin } from 'react-icons/ti'

const FooterBackground = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  background: transparent;
  min-height: 50px;
  width: 10%;
  color: #fff;
`

const Icon = styled.a`
  padding: 2px 10px 10px 15px;
  font-size: 30px;
  color: #fff;
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
      {styledIconsGroup}
    </FooterBackground>
  )
}

export default Footer