import React, { useState } from 'react'
import { Image } from '../style.js'
import { SubTitle, AddUser, SearchContainer, NewUserName, AddUserHeading, ContactList, ContactItem, NewUserDp, TagLine, NewUserModale, ContactListLoader, } from './modale.style.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { all_contact, chat_List } from '../redux/action'
import axios from 'axios'
import { MutatingDots } from 'react-loader-spinner'
import { useCookies } from 'react-cookie'
const NewChatModal = ({ state, setIsNewChatModal }) => {
    const { mouse } = state
    const [cookies] = useCookies()
    const dispatch = useDispatch()
    const { BaseUrl, contactlist, userProfile } = useSelector(state => state)
    const [isLoader, setLoader] = useState(false)
    const handleFinish = () => {
        setIsNewChatModal(false)
        setLoader(false)
    }
    const userHandal = async (payload) => {
        const chat = {
            username: cookies?.auth?.username,
            contact: payload?.username
        }
        setLoader(true)
        axios.post(`${BaseUrl}/new_chat`, chat, {
            headers: { token: cookies?.auth?.token }
        }).then((response) => {
            axios.get(`${BaseUrl}/chatList/${cookies?.auth?.username}`, {
                headers: { token: cookies?.auth?.token }
            }).then((res) => {
                dispatch(chat_List(res?.data?.data))
                handleFinish()
            }).catch((error) => {
                handleFinish()
            })
        }).catch((error) => {
            handleFinish()
        })
    }
    useEffect(() => {
        axios.post(`${BaseUrl}/contact_list/`, { email: userProfile?.email }, {
            headers: { token: cookies?.auth?.token }
        }).then(res => {
            dispatch(all_contact(res?.data?.data))
        })
    }, [cookies, BaseUrl, dispatch,userProfile])

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
                                    <Image src={curChat?.profile_image.startsWith('https://') ? curChat?.profile_image : `${BaseUrl}${curChat?.profile_image}`} />
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
                {
                    isLoader && <ContactListLoader>
                        <MutatingDots
                            height="100"
                            width="100"
                            color="rgb(25 118 210)"
                            secondaryColor='rgb(25 118 210)'
                            radius='12.5'
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </ContactListLoader>
                }
            </SearchContainer>
        </NewUserModale>
    )
}

export default NewChatModal