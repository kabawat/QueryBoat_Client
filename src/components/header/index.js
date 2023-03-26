import React, { useState } from 'react'
import { Image } from '../../style'
import { HeaderSection, UserDetails, UserDp, UserInfo, UserName, UserStatus, SettingSection, SettingToggle, ListContaienr } from '../style'
import userdp from '../../assets/user2.jpg'
import { HiDotsVertical } from 'react-icons/hi';
const HeaderBody = () => {
    const [showList, setShowList] = useState(false)
    return (
        <HeaderSection>
            <UserInfo>
                <UserDp>
                    <Image src={userdp} />
                </UserDp>
                <UserDetails>
                    <UserName>
                        Mukesh Singh
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
                    </ListContaienr>
                </SettingSection>
            </UserInfo>
        </HeaderSection>
    )
}

export default HeaderBody