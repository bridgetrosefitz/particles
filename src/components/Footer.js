import React from 'react'
import styled from 'styled-components'
import { AiFillGithub } from 'react-icons/ai'
import { TiSocialLinkedin } from 'react-icons/ti'
import { AiOutlineMail } from 'react-icons/ai'

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




const Footer = props => {

  return(
    <FooterBackground>
      <Icon>
        <AiFillGithub />
      </Icon>
      <Icon>
        <TiSocialLinkedin />
      </Icon>
      <Icon>
        <AiOutlineMail/>
      </Icon>   
    </FooterBackground>
  )
}

export default Footer