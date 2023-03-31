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
import { useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'

const Home = () => {
    // const { receiverProfile } = useSelector(state => state)
    const navigate = useNavigate()
    const [cookies] = useCookies()
    const [isRender, setIsRender] = useState(false)
    useEffect(() => {
        if (cookies?.auth) {
            setIsRender(true)
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
                <ChatContainer>
                    <Header>
                        <HeaderBody />
                    </Header>
                    <ChatAreaContainer>
                        <ChatArea />
                    </ChatAreaContainer>
                    <Footer>
                        <FooterBody />
                    </Footer>
                </ChatContainer>
            </Main>
        </Container> : <Loader />
    )
}

export default Home
