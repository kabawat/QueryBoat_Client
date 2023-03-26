import React from 'react'
import { NoChatContainer, NoChatLogo, InfoChat, Heading } from '../style'
import { RiWechatLine, } from 'react-icons/ri'
const NoChat = () => {
  return (
    <NoChatContainer>
      <NoChatLogo>
        <RiWechatLine />
      </NoChatLogo>
      <InfoChat>
        <Heading>
          Welcome To QueryBoat
        </Heading>

      </InfoChat>
    </NoChatContainer>
  )
}

export default NoChat
