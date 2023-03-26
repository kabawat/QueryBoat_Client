import dp from '../assets/user2.jpg'
import React from 'react'
import { Image } from '../style.js'
import { SubTitle, AddUser, SearchContainer, NewUserName, AddUserHeading, ContactList, ContactItem, NewUserDp, TagLine, NewUserModale, } from './modale.style.js'
const NewChatModal = ({ state }) => {
    const { mouse } = state
    const userHandal = async (payload) => {
        console.log(payload)
    }
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
                    <ContactItem onClick={() => userHandal("uesr")}>
                        <NewUserDp>
                            <Image src={dp} />
                        </NewUserDp>
                        <div>
                            <NewUserName>
                                Mukesh Singh
                            </NewUserName>
                            <TagLine>
                                mukesh@gmail.com
                            </TagLine>
                        </div>
                    </ContactItem>
                    {/* ----------------  */}
                </ContactList>
            </SearchContainer>
        </NewUserModale>
    )
}

export default NewChatModal