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
import { chat_List, myProfile } from '../../redux/action'
import axios from 'axios'
const Home = () => {
    const { BaseUrl, curChat, userProfile, socket } = useSelector(state => state)
    const [isRender, setIsRender] = useState(false)
    const [cookies, , removeCookies] = useCookies()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        socket.on('connect', () => {
            cookies?.auth && socket.emit('refresh', cookies?.auth?.username)
        })
        if (cookies?.auth) {
            // user profile 
            axios.get(`${BaseUrl}/profile/${cookies?.auth?.username}`, {
                headers: { token: cookies?.auth?.token }
            }).then((responce) => {
                dispatch(myProfile(responce?.data?.data))
                setIsRender(true)
            }).catch((error) => {
                removeCookies('auth')
                navigate('/login')
            })
            // user chat list 
            axios.get(`${BaseUrl}/chatList/${cookies?.auth?.username}`, {
                headers: { token: cookies?.auth?.token }
            }).then((res) => {
                dispatch(chat_List(res?.data?.data))
            }).catch((error) => {

            })
        } else {
            navigate('/login')
        }
    }, [])
    return (
        isRender ? <Container>
            <Aside>
                <ChatAside />
            </Aside>
            <Main>
                {
                    curChat?.receiver !== '' ? <ChatContainer>
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
