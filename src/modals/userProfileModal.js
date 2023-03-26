import React from 'react'
import {
    SettingModalContainer, SettingContainer, SettingNavigation, SettionSection, Item, Icon, ActionList, UserSection, SettionMenu, InnerSettingMenu
} from './modale.style'
import { MdComputer } from 'react-icons/md'
import { IoKeyOutline, IoChatbubblesOutline, IoNotificationsOutline } from 'react-icons/io5'
import { BiUser } from 'react-icons/bi'
import { BsExclamationCircle } from 'react-icons/bs'
import { useState } from 'react'
import General from './setting/General'
import Account from './setting/Account'
import Chats from './setting/Chats'
import Notification from './setting/Notification'
import Help from './setting/Help'
import Profile from './setting/Profile'

const ProfileModal = ({ mouse, section }) => {
    const [activeBtn, setActiveBtn] = useState(section)
    const handalClick = (active) => {
        setActiveBtn(active)
        console.log(active)
    }
    const partOfSetting = {
        General: <General />,
        Chats: <Chats />,
        Account: <Account />,
        Notification: <Notification />,
        Help: <Help />,
        Profile: <Profile />
    }
    return (
        <SettingModalContainer id='modal'>
            <SettingContainer mouse={mouse}>
                {/* menu  */}
                <SettingNavigation>
                    {/* setting  */}
                    <SettionSection>
                        {/* General */}
                        <UserSection active={activeBtn === 'General' ? true : false} onClick={() => handalClick('General')}>
                            <ActionList>
                                <Icon>
                                    <MdComputer />
                                </Icon>
                                <Item>
                                    General
                                </Item>
                            </ActionList>
                        </UserSection>

                        {/* Account */}
                        <UserSection active={activeBtn === 'Account' ? true : false} onClick={() => handalClick('Account')}>
                            <ActionList>
                                <Icon>
                                    <IoKeyOutline />
                                </Icon>
                                <Item>
                                    Account
                                </Item>
                            </ActionList>
                        </UserSection>

                        {/* Chats */}
                        <UserSection active={activeBtn === 'Chats' ? true : false} onClick={() => handalClick('Chats')}>
                            <ActionList>
                                <Icon>
                                    <IoChatbubblesOutline />
                                </Icon>
                                <Item>
                                    Chats
                                </Item>
                            </ActionList>
                        </UserSection>

                        {/* Notification */}
                        <UserSection active={activeBtn === 'Notification' ? true : false} onClick={() => handalClick('Notification')}>
                            <ActionList>
                                <Icon>
                                    <IoNotificationsOutline />
                                </Icon>
                                <Item>
                                    Notification
                                </Item>
                            </ActionList>
                        </UserSection>

                        {/* Help */}
                        <UserSection active={activeBtn === 'Help' ? true : false} onClick={() => handalClick('Help')}>
                            <ActionList>
                                <Icon>
                                    <BsExclamationCircle />
                                </Icon>
                                <Item>
                                    Help
                                </Item>
                            </ActionList>
                        </UserSection>

                    </SettionSection>
                    {/* useProfile  */}
                    <SettionSection>
                        <UserSection active={activeBtn === 'Profile' ? true : false} onClick={() => handalClick('Profile')}>
                            <ActionList>
                                <Icon>
                                    <BiUser />
                                </Icon>
                                <Item>
                                    Profile
                                </Item>
                            </ActionList>
                        </UserSection>
                    </SettionSection>
                </SettingNavigation>

                {/* menu item  */}
                <SettionMenu>
                    <InnerSettingMenu>
                        {
                            partOfSetting[activeBtn]
                        }
                    </InnerSettingMenu>
                </SettionMenu>
            </SettingContainer>
        </SettingModalContainer >
    )
}

export default ProfileModal