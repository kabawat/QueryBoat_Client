import dp from '../assets/user2.jpg'
import React from 'react'
import { Image } from '../style.js'
import { SubTitle, AddUser, SearchContainer, NewUserName, AddUserHeading, ContactList, ContactItem, NewUserDp, TagLine, NewUserModale, } from './modale.style.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { all_contact, chat_List } from '../redux/action'
import axios from 'axios'
import { useCookies } from 'react-cookie'
const NewChatModal = ({ state }) => {
    const { mouse } = state
    const [cookies] = useCookies()
    const dispatch = useDispatch()
    const { BaseUrl, contactlist, userProfile, } = useSelector(state => state)
    const userHandal = async (payload) => {
        const chat = {
            image: payload?.profile_image,
            sender: cookies?.auth?.username,
            receiver: payload?.username
        }
        axios.post(`${BaseUrl}/new_chat`, chat, {
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
    useEffect(() => {
        axios.get(`${BaseUrl}/contact_list`).then(res => {
            dispatch(all_contact(res?.data?.data))
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
                        contactlist?.map((curChat, keys) => {
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