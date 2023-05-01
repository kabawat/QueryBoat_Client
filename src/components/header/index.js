import React from 'react'
import { Image } from '../../style'
import { HeaderSection, UserDetails, UserDp, UserInfo, UserName, UserStatus, BackArrow, SettingSection, SettingToggle, ListContaienr, ActionList } from '../style'
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { clean_message, isMobileActive } from '../../redux/action';
import { HiDotsVertical } from 'react-icons/hi'
import { useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai'
import { TiContacts } from 'react-icons/ti'
const HeaderBody = () => {
    const dispatch = useDispatch()
    const { curChat } = useSelector(state => state)
    const HandleTotalAside = () => {
        dispatch(isMobileActive(true))
    }
    const [showList, setShowList] = useState(false)
    window.addEventListener('click', event => {
        if (event.target.id !== 'Mobile_Message') {
            setShowList(false)
        }
    })

    const handleClean = () => {
        const { contact } = curChat
        dispatch(clean_message(contact))
    }

    return (
        <HeaderSection>
            <UserInfo>
                <BackArrow onClick={HandleTotalAside}>
                    <BsArrowLeft />
                </BackArrow>
                <UserDp>
                    <Image src={curChat?.image} />
                </UserDp>
                <UserDetails>
                    <UserName>
                        {
                            curChat?.contact
                        }
                    </UserName>
                    <UserStatus>
                        {curChat.isOnline ? 'Online' : `last seen ${curChat.lastSeen}`}
                    </UserStatus>
                </UserDetails>
            </UserInfo>
            <UserInfo>
                <SettingSection>
                    {/* icon  */}
                    <SettingToggle onClick={() => setShowList(!showList)}>
                        <HiDotsVertical />
                        <div id='Mobile_Message'></div>
                    </SettingToggle>
                    {/* open list  */}
                    <ListContaienr show={showList ? 'visible' : 'hidden'} top={showList ? '135%' : '100%'} delay={showList ? 0.2 : 0}>
                        <ActionList>
                            <TiContacts /> <span>View Contact</span>
                        </ActionList>
                        <ActionList onClick={handleClean}>
                            <AiOutlineClear /> <span>Clean Chat</span>
                        </ActionList>
                    </ListContaienr>
                </SettingSection>
            </UserInfo>
        </HeaderSection>
    )
}

export default HeaderBody