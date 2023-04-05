import dp from '../assets/user2.jpg'
import React from 'react'
import { Image } from '../style.js'
import { SubTitle, AddUser, SearchContainer, NewUserName, AddUserHeading, ContactList, ContactItem, NewUserDp, TagLine, NewUserModale, } from './modale.style.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllChat } from '../redux/action'
import axios from 'axios'
const NewChatModal = ({ state }) => {
    const { mouse } = state
    const dispatch = useDispatch()
    const { BaseUrl, chatList, userProfile, } = useSelector(state => state)
    const userHandal = async (payload) => {
        console.log(payload)
    }
    // 
    //

    useEffect(() => {
        axios.get(`${BaseUrl}/chatlist`).then(res => {
            dispatch(AllChat(res?.data?.data))
        })
    }, [])

    return (
        <NewUserModale id="newChatModal">
            <SearchContainer left={mouse.x} top={mouse.y}>
                <SubTitle>New Chat</SubTitle>
                <AddUser id='isAdd' />
                <AddUserHeading>
                    All Contact
                </AddUserHeading>
                <ContactList>
                    {/* ---------- */}
                    {
                        chatList?.map((curChat, keys) => {
                            return <ContactItem key={keys} onClick={() => userHandal(curChat)}>
                                <NewUserDp>
                                    <Image src={`${BaseUrl}${curChat?.profile_image}`} />
                                </NewUserDp>
                                <div>
                                    <NewUserName>
                                        {curChat?.username}
                                    </NewUserName>
                                    <TagLine>
                                        {curChat?.email}
                                    </TagLine>
                                </div>
                            </ContactItem>
                        })
                    }
                    {/* ----------------  */}
                </ContactList>
            </SearchContainer>
        </NewUserModale>
    )
}

export default NewChatModal