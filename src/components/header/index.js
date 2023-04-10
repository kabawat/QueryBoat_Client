import React, { useState } from 'react'
import { Image } from '../../style'
import { HeaderSection, UserDetails, UserDp, UserInfo, UserName, UserStatus, SettingSection, SettingToggle, ListContaienr, BackArrow } from '../style'
import userdp from '../../assets/user2.jpg'
import { HiDotsVertical } from 'react-icons/hi';
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { isMobileActive } from '../../redux/action';
const HeaderBody = () => {
    const [showList, setShowList,] = useState(false)
    const dispatch = useDispatch()
    const { curChat } = useSelector(state => state)
    const HandleTotalAside = () => {
        dispatch(isMobileActive(true))
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
                            curChat?.receiver
                        }
                    </UserName>
                    <UserStatus>
                        online
                    </UserStatus>
                </UserDetails>
            </UserInfo>
            <UserInfo>
                <SettingSection>
                    {/* icon  */}
                    <SettingToggle onClick={() => setShowList(!showList)}>
                        <HiDotsVertical />
                    </SettingToggle>
                    {/* open list  */}
                    <ListContaienr
                        show={showList ? 'visible' : 'hidden'}
                        top={showList ? '135%' : '100%'}
                        delay={showList ? 0.2 : 0}
                    >
                        setting list
                    </ListContaienr>
                </SettingSection>
            </UserInfo>
        </HeaderSection>
    )
}

export default HeaderBody