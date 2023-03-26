import styled from "styled-components";
import { Button } from "../../style";
const Div = styled.div``
export const AsideCotainer = styled(Div)`
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
`
export const SettingAsideContainer = styled(Div)`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 50px;
    height: 100%;
    background: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background:  #E3F2FD;
    z-index: 10;
    padding: 30px 0px;
    `
export const ChatContaienr = styled(Div)`
    width: 100%;
    height: 100%;
    position: absolute; 
    top: 0px;
    left: 0px;
    z-index: 5;
    padding-left: 50px;
`
export const StoryBody = styled(Div)`
    height: 100%;
    width: 100%;
    `
export const ContactBody = styled(StoryBody)`
    
`

// aside 
export const AsideTab = styled(Div)`
    width: 100%;
    padding-right: 4px;
`
export const AsideTabBtn = styled(Button)`
    width: 40px;
    height: 40px;
    backdrop-filter: blur(3px);
    background: rgba(255,255,255,0.6);
    border: 1px solid rgba(0,0,0,0.05);
    border-top-right-radius:8px;
    border-bottom-right-radius:8px;
    margin: 2px 0px;
    position: relative;
    padding-left: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ isActive }) => isActive ? '#1976d2' : '#888'};
    svg{
        width: 20px;
    }
    &::before{
        content: '';
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
        background: ${({ isActive }) => isActive ? '#1976d2' : '#E3F2FD'};
        height: 55%;
        width: 4px;
        border-radius: 4px;
    }
`
// user setting mode 
export const UserSetting = styled(Div)`
    width: 100%;
    height: 85px;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
`
export const UserActionBox = styled(Button)`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 3px 0px;
`
export const DpSection = styled(Div)`
    width: 100%;
    display: flex;
    justify-content: center;
`
export const SettingButton = styled(Div)`
    width: 45px;
    height: 40px;
    border-top-right-radius:8px;
    border-bottom-right-radius:8px;
    position: relative;
    padding-left: 6px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: ${({ isActive }) => isActive ? '#1976d2' : '#444'};
    backdrop-filter: ${({ isActive }) => isActive ? 'blur(3px)' : 'blur(1px)'};
    background: ${({ isActive }) => isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.0)'};
    border: ${({ isActive }) => isActive ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(0,0,0,0.00)'};
    &::before{
        content: '';
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
        background: ${({ isActive }) => isActive ? '#1976d2' : '#E3F2FD'};
        height: 55%;
        width: 4px;
        border-radius: 4px;
    }
`

// chat mode 
export const ChatMainContainer = styled(Div)`
    width: 100%;
    height: 100%;
    position: relative;
`
export const ChatModeHeader = styled(Div)`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #000;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    justify-content: space-between;
    position: absolute;
    top: 0px;
    background: #fff;
    z-index: 23;
`
export const ChatTitle = styled(Div)`

`
export const UserAction = styled(Div)`
    display: flex;
    align-items: center;
`
export const NewChatContainer = styled(Div)`
    display: flex;
    justify-content: flex-end;
    width: 30px;
    height: 30px;
    border-radius: 4px; 
    margin-left: 5px;
    position: relative;
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    }
`
export const NewChat = styled(Button)`
    width: 100%;
    height: 100%;
    display: grid;
    font-size: 18px;
    place-items:center;
`

// user chat list 
export const ChatMainCotainer = styled(Div)`
    height: 100vh;
    width: 100%;
    padding-top: 60px;    
`
export const ChatContainer = styled(Div)`
    padding: 0px 10px;
    padding-right: 0px;
    height: 100%;
    width: 100%;
    top: 0px;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar{
        width: 16px;
    }
    &:hover::-webkit-scrollbar-thumb{
        border: 6px solid #fff;
        background: rgba(0,0,0,0.2);
        border-radius: 10px;
    }
`
export const UserCartContainer = styled(Div)`
    height: 55px;
    width: 100%;
    padding: 0px 10px;
    border-radius: 5px;
    margin: 5px 0px;
    border-bottom: ${({ active }) => active ? '1px solid rgb(0 0 0 / 5%)' : '1px solid rgb(0 0 0 / 0%)'} ;
    position: relative;
    background: ${({ active }) => active ? 'rgb(227 242 253 / 48%)' : 'transparent'};;
    &:hover{
        border-bottom: 1px solid rgb(0 0 0 / 5%);
        background: rgb(227 242 253 / 48%);
    }
`
export const UserChatDp = styled(Button)`
    position: absolute;
    width: 35px;
    height: 35px;
    overflow: hidden;
    top:50%;
    left: 10px;
    transform: translateY(-50%);
    border-radius: 50%;
`
export const ChatLinkContainer = styled(Div)`
    width: 100%;
    height: 100%;
    padding: 0px 6px 0px 50px;
    display: flex;
    align-items: center;
`
export const UserInfo = styled(Button)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
    position:relative;
`
export const Label = styled(Div)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background: transparent;
    z-index: 20;
`
export const UserName = styled(Div)`
    font-size: 14px;
    /* font-weight: 600; */
    
`
export const ChatPreview = styled(Div)`
    font-size: 10px;
`
// ContaxtMenu
export const ContaxtMenu = styled(Div)`
    padding: 5px 5px;
    background: #fff;
    border: 1px solid #dddddd9e;
    top: ${({ top }) => `${top}px`};
    left: ${({ left }) => `${left}px`};
    display: ${({ active }) => active ? "block" : 'none'};
    position: fixed;
    border-radius: 6px;
    width: 160px;
    z-index:40;
`
