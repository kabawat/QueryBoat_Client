import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import NoChat from '../../components/chatArea/noChat'
import ChatAside from '../../components/aside/chatAside'
import HeaderBody from '../../components/header'
import ChatArea from '../../components/chatArea'
import FooterBody from '../../components/footer'
import { Aside, ChatContainer, Container, Header, Main, Footer, ChatAreaContainer } from './style'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import { chat_List, myProfile, recive_message } from '../../redux/action'
import axios from 'axios'
import ring from './ring02.mp3'
const Home = () => {
    const { BaseUrl, curChat, chatList, chatUrl, asideMobile, socket } = useSelector(state => state)
    const [isRender, setIsRender] = useState(false)
    const [cookies, , removeCookies] = useCookies()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (cookies?.auth) {
            const { username, token } = cookies?.auth
            // user profile 
            axios.get(`${BaseUrl}/profile/${username}`, {
                headers: {
                    token: token
                }
            }).then((responce) => {
                dispatch(myProfile(responce?.data?.data))
                setIsRender(true)
            }).catch((error) => {
                removeCookies('auth')
                navigate('/login')
            })

            // user chat list 
            axios.get(`${BaseUrl}/chatList/${username}`, {
                headers: { token: token }
            }).then((res) => {
                dispatch(chat_List(res?.data?.data))
                localStorage.clear()
            }).catch((error) => {

            })
        } else {
            navigate('/login')
        }
    }, [BaseUrl, cookies])

    // Handle 'Received Message' event
    const handleReceivedMessage = (chat) => {
        var audio = new Audio(ring);
        audio.play();
        if (chatList !== null) {
            const isExist = chatList.some(person => person.contact === chat?.receiver)
            if (isExist === false) {
                const chatSchema = {
                    username: cookies?.auth?.username,
                    contact: chat?.receiver,
                    chatFile: chat?.chatFile
                }
                axios.post(`${BaseUrl}/new_chat_request`, chatSchema, {
                    headers: { token: cookies?.auth?.token }
                }).then((response) => {
                    axios.get(`${BaseUrl}/chatList/${cookies?.auth?.username}`, {
                        headers: { token: cookies?.auth?.token }
                    }).then((res) => {
                        dispatch(chat_List(res?.data?.data))
                    }).catch((error) => {
                        console.log(error?.response)
                    })
                }).catch((error) => {
                    console.log(error?.response)
                })
            }

            if (chat?.receiver === localStorage.getItem('curUser')) {
                axios.post(`${chatUrl}/get_chat`, { chatFile: chat?.chatFile }).then((res) => {
                    const { data } = res?.data
                    dispatch(recive_message(data))
                })
            }

        } else {
            console.log('chatList is null');
        }
    };

    useEffect(() => {
        // Only emit 'refresh' event if cookies.auth is present
        if (cookies?.auth) {
            socket.emit('refresh', cookies.auth.username);
        }
        socket.on('Received Message', handleReceivedMessage);
        // Clean up event listener when component unmounts
        return () => {
            socket.off('Received Message', handleReceivedMessage);
        };
    }, [socket, cookies?.auth?.username, chatList]);

    return (
        isRender ? <Container>
            <Aside isActive={asideMobile}>
                <ChatAside />
            </Aside>
            <Main>
                {
                    curChat?.contact !== '' ? <ChatContainer>
                        <Header>
                            <HeaderBody />
                        </Header>
                        <ChatAreaContainer>
                            <ChatArea />
                        </ChatAreaContainer>
                        <Footer>
                            <FooterBody />
                        </Footer>
                    </ChatContainer> : <NoChat />
                }

            </Main>
        </Container> : <Loader />
    )
}

export default Home
