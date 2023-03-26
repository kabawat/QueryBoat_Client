import React from 'react'
import SettingAside from './settingAside'
import { AsideCotainer, ChatContaienr, StoryBody, ContactBody } from './style'
import { useSelector } from 'react-redux'
import ChatMode from './chatMode'

const ChatAside = () => {
    const { asideAction } = useSelector(state => state)
    return (
        <AsideCotainer>
            <SettingAside />
            <ChatContaienr>
                {
                    asideAction ? (
                        <ContactBody>
                            <ChatMode />
                        </ContactBody>
                    ) : (
                        <StoryBody>
                            story
                        </StoryBody>
                    )
                }

            </ChatContaienr>
        </AsideCotainer>
    )
}

export default ChatAside
