import React from 'react'
import dp from '../../assets/user1.png'
import NewChatModal from '../../modals/NewUserModale'
import { ChatModeHeader, ChatTitle, UserAction, NewChatContainer, NewChat, ChatMainContainer, ChatContainer, ChatMainCotainer, UserCartContainer, ChatLinkContainer, UserChatDp, UserName, UserInfo, ChatPreview, ContaxtMenu, Label } from './style'
import { BiEdit } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs';
import { Button, ContextAction, Image } from '../../style'
import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineClear, AiOutlineConsoleSql } from 'react-icons/ai'
import { BsPin } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { currentChat } from '../../redux/action'
const ChatMode = () => {
    const { chatList, curChat, BaseUrl } = useSelector(state => state)
    const dispatch = useDispatch()
    const [isNewChatModal, setIsNewChatModal] = useState(false)
    const [cookies] = useCookies()

    const [context, setContext] = useState(false)
    const [curContext, setCurContext] = useState({})
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

    const getFriendProfile = (payload) => {
        axios.get(`${BaseUrl}/receiver/${payload?.receiver}`, {
            headers: { token: cookies?.auth?.token }
        }).then((response) => {
            const { email, chatID } = response?.data?.data
            const { receiver, image } = payload
            dispatch(currentChat({
                email,
                chatID,
                receiver,
                image: `${BaseUrl}${image}`
            }))
        }).catch(error => {
            console.log(error?.response?.data)
        })
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
                            isNewChatModal ? <NewChatModal state={{ mouse }} /> : null
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
                        chatList?.map((curUser, keys) => {
                            return <UserCartContainer key={keys} UserCartContainer active={curChat?.receiver === curUser?.receiver ? true : false} onContextMenu={(event) => {
                                handalContextMenu(event)
                                setCurContext(curUser)
                            }} id='' title=''>
                                <UserChatDp>
                                    <Image src={`${BaseUrl}${curUser?.image}`} />
                                </UserChatDp>
                                <ChatLinkContainer>
                                    <UserInfo onClick={() => getFriendProfile(curUser)}>
                                        <UserName>{curUser?.receiver}</UserName>
                                        <ChatPreview>
                                            last seen 10:12 PM
                                        </ChatPreview>
                                        <Label id='' title=''></Label>
                                    </UserInfo>
                                </ChatLinkContainer>
                            </UserCartContainer>
                        })
                    }
                </ChatContainer>
            </ChatMainCotainer>
        </ChatMainContainer >
    )
}

export default ChatMode