import React from 'react'
import { SettingAsideContainer, AsideTab, AsideTabBtn, UserSetting, UserActionBox, SettingButton, DpSection } from './style'
import { BsChatLeftText } from 'react-icons/bs'
import { HiStatusOnline } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { storyMode } from '../../redux/action'
import { Image } from '../../style';
import userProfiileDp from '../../assets/user2.jpg'
import ProfileModal from '../../modals/userProfileModal';
const SettingAside = () => {
    const { userProfile, BaseUrl } = useSelector(state => state)
    const Dispatch = useDispatch()
    const [isActive, SetIsActive] = useState(true)
    const [isSetting, setIsSetting] = useState(false)
    const [isProfile, setIsProfile] = useState(false)
    // storyMode
    const chatHandal = (event) => {
        Dispatch(storyMode(event))
        SetIsActive(event)
    }
    const [mouse, setMouse] = useState({
        x: 0,
        y: 0,
    })

    const hadalSetting = (event) => {
        setIsSetting(!isSetting)
        setMouse({
            x: event.pageX,
            y: event.pageY
        })
    }
    const hadalProfile = (event) => {
        setIsProfile(!isProfile)
        setMouse({
            x: event.pageX,
            y: event.pageY
        })
    }
    window.addEventListener('click', (event) => {
        if (event.target.id === 'modal') {
            setIsSetting(false)
            setIsProfile(false)
        }
    })
    
    return (
        <SettingAsideContainer>
            <AsideTab>
                <AsideTabBtn isActive={isActive} onClick={() => chatHandal(true)}>
                    <BsChatLeftText />
                </AsideTabBtn>
                <AsideTabBtn isActive={!isActive} onClick={() => chatHandal(false)}>
                    <HiStatusOnline />
                </AsideTabBtn>
            </AsideTab>
            <UserSetting>
                <UserActionBox>
                    <SettingButton isActive={isSetting} onClick={hadalSetting}>
                        <IoSettingsOutline />
                    </SettingButton>
                </UserActionBox>
                <DpSection>
                    <UserActionBox onClick={hadalProfile}>
                        {/* <Image src={userProfiileDp} /> */}
                        <Image src={`${BaseUrl}${userProfile?.profile_image}`} />
                    </UserActionBox>
                </DpSection>
            </UserSetting>
            {isSetting && <ProfileModal section="General" mouse={mouse} />}
            {isProfile && <ProfileModal section="Profile" mouse={mouse} />}
        </SettingAsideContainer>

    )
}

export default SettingAside
