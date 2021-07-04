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

const Icon = styled.div`
  padding: 2px 10px 10px 15px;
  font-size: 30px;
  color: #fff;
`

const allIcons = [<AiFillGithub />, <TiSocialLinkedin />, <AiOutlineMail />]
  const styledIconsGroup = allIcons.map(icon => {
    return(
      <Icon>
        {icon}
      </Icon>
    )
  })

console.log(styledIconsGroup)

const Footer = props => {

  return(
    <FooterBackground>
      {styledIconsGroup}
    </FooterBackground>
  )
}

export default Footer