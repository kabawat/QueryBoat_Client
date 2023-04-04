import React from 'react'
import dp from '../../assets/user1.png'
import NewChatModal from '../../modals/NewUserModale'
import { ChatModeHeader, ChatTitle, UserAction, NewChatContainer, NewChat, ChatMainContainer, ChatContainer, ChatMainCotainer, UserCartContainer, ChatLinkContainer, UserChatDp, UserName, UserInfo, ChatPreview, ContaxtMenu, Label } from './style'
import { BiEdit } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs';
import { Button, ContextAction, Image } from '../../style'
import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineClear } from 'react-icons/ai'
import { BsPin } from 'react-icons/bs'
import { useSelector } from 'react-redux'
const ChatMode = () => {
    const [context, setContext] = useState(false)
    const [userList, setUserList] = useState([])
    const [isNewChatModal, setIsNewChatModal] = useState(false)
    const [mouse, setMouse] = useState({
        x: 0,
        y: 0
    })
    window.addEventListener('click', (event) => {
        setContext(false)
        if (event.target.id === 'newChatModal') {
            setIsNewChatModal(false)
        }
    })

    const getFriendProfile = () => {

    }

    const hadalSearchModale = (event) => {
        setIsNewChatModal(true)
        setMouse({
            x: event.pageX,
            y: 50
        })
    }

    const handalContextMenu = (event) => {
        event.preventDefault()
        setContext(!context)
        setTimeout(() => {
            setContext(true)
        }, 200)
        setMouse({
            x: event.pageX,
            y: event.pageY
        })
    }

    return (
        <ChatMainContainer>
            {/* chat header  */}
            <ChatModeHeader>
                <ChatTitle> Chat</ChatTitle>
                <UserAction>
                    {/* new user add  */}
                    <NewChatContainer>
                        <NewChat onClick={hadalSearchModale}>
                            <BiEdit />
                            <Label id='new_user'></Label>
                        </NewChat>
                        {
                            isNewChatModal ? <NewChatModal state={{ userList, mouse }} /> : null
                        }

                    </NewChatContainer>
                    {/* new user action  */}
                    <NewChatContainer>
                        <NewChat>
                            <BsThreeDots />
                        </NewChat>
                    </NewChatContainer>
                </UserAction>
            </ChatModeHeader>

            {/* user chat List  */}
            <ChatMainCotainer>
                {/* cart list  */}
                <ChatContainer>
                    <ContaxtMenu active={context} top={mouse.y} left={mouse.x}>
                        <ContextAction>
                            <Button><BsPin /> <span>Pin to top</span></Button>
                        </ContextAction>
                        <ContextAction>
                            <Button ><RiDeleteBinLine /> <span>Delete</span></Button>
                        </ContextAction>
                        <ContextAction>
                            <Button ><AiOutlineClear /> <span>Clear message</span></Button>
                        </ContextAction>
                    </ContaxtMenu>
                    {
                        <UserCartContainer
                            active=''
                            onContextMenu={handalContextMenu}
                            id=''
                            title=''
                            key=''
                        >
                            <UserChatDp>
                                <Image src={dp} />
                            </UserChatDp>
                            <ChatLinkContainer>
                                <UserInfo onClick={() => getFriendProfile()}>
                                    <UserName>Nirma Kanwar</UserName>
                                    <ChatPreview>
                                        last seen 10:12 PM
                                    </ChatPreview>
                                    <Label id='' title=''></Label>
                                </UserInfo>
                            </ChatLinkContainer>
                        </UserCartContainer>
                    }
                </ChatContainer>
            </ChatMainCotainer>
        </ChatMainContainer>
    )
}

export default ChatMode