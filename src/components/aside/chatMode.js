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
import { chat_List, clean_message, currentChat, delete_message, fetch_chat, isMobileActive } from '../../redux/action'
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
        //  for fetch curChat and fix Socket.connection issue 
        localStorage.setItem('curUser', payload?.receiver)

        dispatch(fetch_chat(payload?.receiver))
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
            dispatch(isMobileActive(false))
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

    // context menu 
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

    // handal delete chat
    const handleDelete = () => {
        const { receiver } = curContext
        const sender = cookies?.auth?.username

        axios.post(`${BaseUrl}/remove_chat`, { receiver, sender }, {
            headers: { token: cookies?.auth?.token }
        }).then((result) => {
            axios.get(`${BaseUrl}/chatList/${sender}`, {
                headers: { token: cookies?.auth?.token }
            }).then((res) => {
                dispatch(chat_List(res?.data?.data))
                if (curChat?.receiver === receiver) {
                    dispatch(currentChat({
                        email: '',
                        chatID: '',
                        receiver: '',
                        image: ``
                    }))
                }
                dispatch(delete_message(receiver))
            }).catch((error) => {
                console.log(error?.response)
            })
        }).catch((error) => {
            console.log(error?.response)
        })
    }

    // handal clean chat 
    const handleClean = () => {
        const { receiver } = curContext
        console.log(receiver)
        dispatch(clean_message(receiver))
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
                            <Button onClick={handleDelete}><RiDeleteBinLine /> <span>Delete</span></Button>
                        </ContextAction>
                        <ContextAction>
                            <Button onClick={handleClean}><AiOutlineClear /> <span>Clear message</span></Button>
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