import React from 'react'
import NewChatModal from '../../modals/NewUserModale'
import { ChatModeHeader, ChatTitle, UserAction, NewChatContainer, NewChat, ChatMainContainer, ChatContainer, ChatMainCotainer, UserCartContainer, ChatLinkContainer, UserChatDp, UserName, UserInfo, ChatPreview, ContaxtMenu, Label } from './style'
import { BiEdit } from 'react-icons/bi'
import { Button, ContextAction, Image } from '../../style'
import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineClear } from 'react-icons/ai'
import { BsPin } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { chat_List, currentChat, isMobileActive, recive_message } from '../../redux/action'
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


    // lastSeen handler 
    function getLastSeenFormatted(lastSeen) {
        const now = new Date();
        const date = new Date(lastSeen);
        const daysSinceLastSeen = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (daysSinceLastSeen > 7) {
            // Format for more than 7 days ago
            return date.toLocaleString();
        } else if (daysSinceLastSeen === 0) {
            // Format for today
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        } else if (daysSinceLastSeen === 1) {
            // Format for yesterday
            return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;
        } else {
            // Format for less than 7 days ago
            const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            return `${dayOfWeek} ${time}`;
        }
    }

    const getFriendProfile = async (payload) => {
        //  for fetch curChat and fix Socket.connection issue when contact's refresh the page
        const { contact } = payload
        localStorage.setItem('curUser', contact)
        await axios.post(`${BaseUrl}/get_message`, { chatFile: payload?.chatFile }).then((res) => {
            const { data } = res?.data
            dispatch(recive_message(data))
        })
        axios.get(`${BaseUrl}/receiver/${contact}`, {
            headers: { token: cookies?.auth?.token }
        }).then((response) => {
            const { image, chatID, lastSeen, isOnline, f_name, l_name } = response?.data?.data
            dispatch(currentChat({
                chatID,
                contact,
                lastSeen: getLastSeenFormatted(lastSeen),
                isOnline,
                l_name,
                f_name,
                image: image.startsWith('https://') ? image : `${BaseUrl}${image}`,
                chatFile: payload?.chatFile
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
        const { contact } = curContext
        const { username, token } = cookies?.auth

        axios.post(`${BaseUrl}/remove_chat`, { contact, username }, {
            headers: { token: token }
        }).then((result) => {
            axios.get(`${BaseUrl}/chatList/${username}`, {
                headers: { token: token }
            }).then((res) => {
                dispatch(chat_List(res?.data?.data))
                if (curChat?.contact === contact) {
                    dispatch(currentChat({
                        email: '',
                        chatID: '',
                        contact: '',
                        image: ``,
                        lastSeen: '',
                        isOnline: ''
                    }))
                }
            }).catch((error) => {
                console.log(error?.response)
            })
        }).catch((error) => {
            console.log(error?.response)
        })
    }

    // handal clean chat 
    const handleClean = () => {

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
                            isNewChatModal ? <NewChatModal state={{ mouse }} setIsNewChatModal={setIsNewChatModal} /> : null
                        }
                    </NewChatContainer>
                    {/* new user action  */}

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
                            return <UserCartContainer key={keys} UserCartContainer active={curChat?.contact === curUser?.contact ? true : false} onContextMenu={(event) => {
                                handalContextMenu(event)
                                setCurContext(curUser)
                            }} id='' title=''>
                                <UserChatDp>
                                    <Image src={curUser?.image?.startsWith('https://') ? curUser?.image : `${BaseUrl}${curUser?.image}`} />
                                </UserChatDp>
                                <ChatLinkContainer>
                                    <UserInfo onClick={() => getFriendProfile(curUser)}>
                                        <UserName>{curUser?.f_name} {curUser?.l_name} </UserName>
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