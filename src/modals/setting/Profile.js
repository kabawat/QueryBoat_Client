import React, { useState } from 'react'
import { Image } from '../../style'
import { UserDpSection, DpContainer, DpImage, DpMenu, DpSetting, ActionList, UserInfoSection, InfoGroup, TitleBox, EditBox, EditButton } from './style'
import Dp from '../../assets/user1.png'
import { MdOutlineModeEdit } from 'react-icons/md'
import { IoSaveOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
const Profile = () => {
    const [isDpSetting, setIsDpSetting] = useState(false)
    const HowDpSetting = (event) => {
        setIsDpSetting(!isDpSetting)
    }
    const [isEditEmail, setIsEditEmail] = useState(false)
    const [isEditUser, setIsEditUser] = useState(false)
    const { myProfile } = useSelector(state => state)
    const { profile } = myProfile;
    const [data, setData] = useState({ ...profile })
    const handalChange = (event) => {
        const { name, value } = event.target
        setData({
            ...data,
            [name]: value
        })
    }
    return (
        <>
            <UserDpSection>
                <DpContainer>
                    <DpImage>
                        <Image src={Dp} />
                    </DpImage>
                    <DpMenu onClick={HowDpSetting} active={isDpSetting}>
                        <span>
                            <MdOutlineModeEdit />
                        </span>
                    </DpMenu>
                    {
                        isDpSetting &&
                        <DpSetting>
                            <ActionList onClick={() => setIsDpSetting(false)}>View</ActionList>
                            <ActionList onClick={() => setIsDpSetting(false)}>Change</ActionList>
                            <ActionList onClick={() => setIsDpSetting(false)}>Remove</ActionList>
                        </DpSetting>
                    }
                </DpContainer>
            </UserDpSection>
            <UserInfoSection>
                <InfoGroup>
                    <TitleBox>
                        Username
                    </TitleBox>
                    <EditBox isEditEmail={isEditUser}>
                        <input type="text" readOnly={!isEditUser} onChange={handalChange} name="user" value={data.user} />
                    </EditBox>
                </InfoGroup>
                {isEditUser ? <EditButton onClick={() => setIsEditUser(false)}>
                    <IoSaveOutline />
                </EditButton> : <EditButton onClick={() => setIsEditUser(true)}>
                    <MdOutlineModeEdit />
                </EditButton>}
            </UserInfoSection>
            <UserInfoSection>
                <InfoGroup>
                    <TitleBox>
                        email
                    </TitleBox>
                    <EditBox isEditEmail={isEditEmail}>
                        <input type="text" readOnly={!isEditEmail} onChange={handalChange} name="email" value={data.email} />
                    </EditBox>
                </InfoGroup>
                {isEditEmail ? <EditButton onClick={() => setIsEditEmail(false)}>
                    <IoSaveOutline />
                </EditButton> : <EditButton onClick={() => setIsEditEmail(true)}>
                    <MdOutlineModeEdit />
                </EditButton>}


            </UserInfoSection>
        </>

    )
}

export default Profile
