import React, { useState } from 'react'
import { Image } from '../../style'
import { UserDpSection, DpContainer, DpImage, DpMenu, DpSetting, ActionList, UserInfoSection, InfoGroup, TitleBox, EditBox, EditButton } from './style'
import { MdOutlineModeEdit } from 'react-icons/md'
import { IoSaveOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { myProfile } from '../../redux/action'
const Profile = () => {
    const [cookies] = useCookies()
    const [isDpSetting, setIsDpSetting] = useState(false)
    const dispatch = useDispatch()
    const HowDpSetting = (event) => {
        setIsDpSetting(!isDpSetting)
    }
    const [isEditEmail, setIsEditEmail] = useState(false)
    const [isEditUser, setIsEditUser] = useState(false)
    const { userProfile, BaseUrl } = useSelector(state => state)
    const profile = userProfile;
    const [data, setData] = useState({ ...profile })
    const handalChange = (event) => {
        const { name, value } = event.target
        setData({
            ...data,
            [name]: value
        })
    }


    function updateImage(finalData) {
        axios.post(`${BaseUrl}/update_profile_picture`, finalData, {
            headers: { token: cookies?.auth?.token }
        }).then((response) => {
            axios.get(`${BaseUrl}/profile/${data?.username}`, {
                headers: { token: cookies?.auth?.token }
            }).then((result) => {
                dispatch(myProfile(result?.data?.data))
                setData(result?.data?.data)
                setIsDpSetting(false)
            }).catch((error) => {
                console.log(error)
            })
            setIsDpSetting(false)
        })
    }

    const finalData = new FormData();
    // change profile image 
    const changeProfileDp = (event) => {
        finalData.append("profile", event.target.files[0]);
        finalData.append("email", data.email);
        finalData.append("oldImage", data?.profile_image);
        updateImage(finalData)
    }

    // set profile Image 
    const UpdateProfileDp = (event) => {
        finalData.append("profile", event.target.files[0]);
        finalData.append("email", data.email);
        updateImage(finalData)
    }

    // remove profile Image 
    const removeProfileImage = () => {
        finalData.append("email", data.email);
        finalData.append("image", true);
        finalData.append("oldImage", data?.profile_image);
        updateImage(finalData)
    }
    return (
        <>
            <UserDpSection>
                <DpContainer>
                    <DpImage>
                        <Image src={data?.profile_image.startsWith('https://') ? data?.profile_image : `${BaseUrl}${data?.profile_image}`} />
                    </DpImage>
                    <DpMenu onClick={HowDpSetting} active={isDpSetting}>
                        <span>
                            <MdOutlineModeEdit />
                        </span>
                    </DpMenu>
                    {
                        isDpSetting &&
                        <DpSetting>
                            <input id='changeImage' type='file' onChange={changeProfileDp} />
                            <input id='updateImage' type='file' onChange={UpdateProfileDp} />
                            {
                                data?.profile_image !== '/user/profile.png' ? <>
                                    <ActionList onClick={() => setIsDpSetting(false)}>
                                        <label htmlFor='#'>View</label>
                                    </ActionList>
                                    <ActionList>
                                        <label htmlFor='changeImage'>Change</label>
                                    </ActionList>
                                    <ActionList onClick={removeProfileImage}>
                                        <label htmlFor='#'>Remove</label>
                                    </ActionList>
                                </> : <>
                                    <ActionList>
                                        <label htmlFor='updateImage'>Update</label>
                                    </ActionList>
                                </>
                            }

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
                        <input type="text" readOnly={!isEditUser} onChange={handalChange} name="user" value={data?.username} />
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