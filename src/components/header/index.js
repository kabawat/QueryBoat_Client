import React from 'react'
import { Image } from '../../style'
import { HeaderSection, UserDetails, UserDp, UserInfo, UserName, UserStatus, BackArrow } from '../style'
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { isMobileActive } from '../../redux/action';
const HeaderBody = () => {
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
                            curChat?.contact
                        }
                    </UserName>
                    <UserStatus>
                        online
                    </UserStatus>
                </UserDetails>
            </UserInfo>
        </HeaderSection>
    )
}

export default HeaderBody