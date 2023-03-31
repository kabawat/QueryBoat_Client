import styled from 'styled-components'
import { Button } from '../style'
const Div = styled.div``
export const HeaderSection = styled(Div)`
    width: 100%;
    height: 100%;
    /* background: #345; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
`
export const UserInfo = styled(Div)`
    height: 100%;
    display: flex;
    align-items: center;
    /* background: red; */
`
export const UserDp = styled(Div)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
`
export const UserDetails = styled(Div)`
    /* background: pink; */
    margin-left: 10px;
`
export const UserName = styled(Div)`
    font-size: 16px;
    font-weight: bold;
    margin: 1px 0px;
`
export const UserStatus = styled(Div)`
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
`
export const SettingSection = styled(Div)`
    position: relative;
    /* z-index: 20; */
    `
export const SettingToggle = styled(Button)`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(73 74 76);
    border-radius: 50%;
    transition: all 0.2s linear;
    font-size: 18px;
    &:active{
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    }
`
export const ListContaienr = styled(Div)`
    z-index: 10;
    position: absolute;
    right: 0px;
    width: 260px;
    height: 400px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background: #fff;
    border-radius: 8px;
    top: ${({ top }) => top};
    transition:  ${({ delay }) => `${delay}s`} all  ease-in-out;
    visibility: ${({ show }) => show};
`

// footer 
export const FooterContaienr = styled.form`
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: 80px;
    padding-right: 70px;
`
export const FileContainer = styled(Div)`
    position: absolute;
    left: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all  cubic-bezier(0, 0.01, 0, 1.04);
    width: 80px;
`
export const SelectButton = styled(Button)`
    width: 45px;
    height: 45px;
    border-radius:50%;
    background:rgb(25 118 210);
    display: grid;
    place-items: center;
    color: #fff;

    &:active{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    svg{
        transform: ${({ x }) => `rotate(${x}deg)`};
        transition: all  cubic-bezier(0.4, 0, 1, 1) 100ms;
    }
    `
export const SelectFileBox = styled(Div)`
    backdrop-filter: blue(3px);
    position: absolute;
    bottom: 100%;
    left: 0px;
    transition: all  cubic-bezier(0.01, 0.16, 0.85, 1.02);
    visibility: ${({ show }) => show};
    `
export const FileList = styled(Button)`
    cursor: default;
    height: 50px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    margin: 6px 0px;
    transform: ${({ show }) => !show ? 'scale(0)' : 'scale(1)'};
    &:nth-child(1){
        transition: ${({ show }) => show ? 'all 0.1s linear 0.25s' : 'all 0.1s linear 0.10s'} ;
    }
    &:nth-child(2){
        transition: ${({ show }) => show ? 'all 0.1s linear 0.20s' : 'all 0.1s linear 0.15s'} ;
    }
    &:nth-child(3){
        transition: ${({ show }) => show ? 'all 0.1s linear 0.15s' : 'all 0.1s linear 0.20s'} ;
    }
    &:nth-child(4){
        transition: ${({ show }) => show ? 'all 0.1s linear 0.10s' : 'all 0.1s linear 0.25s'} ;
    }
    input{
        display: none;
    }
`

export const FileIcon = styled.label`
    cursor: pointer;
    display: block;
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    display: grid;
    place-items: center;
    color: #457678;
    font-size:20px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    margin-right: 10px;
    &:hover{
        color: #1976d2;
        span{
            color: #1976d2;
            opacity: 1;
            visibility: visible;
            transform: translate(20%, -50%);
        }
    }
    `
export const Title = styled.span`
    visibility: hidden;
    position: absolute;
    font-size: 12px;
    opacity: 0;
    padding: 4px 10px;
    background: #fff;
    border-radius: 8px;
    border-bottom-left-radius: 0px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    left: 100%;
    top: 50%;
    /* transform: translate(-50%); */
    transform: translate(0%, -50%);
    transition: all 0.2s linear;
    /* color: #fff; */
`

export const ChatTypeContaienr = styled(Div)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    align-items: center;
    `

export const Chat = styled.input`
    width: 100%;
    height: 70%;
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 0px 10px;
    background: #fafafa;
    box-shadow: inset rgba(149, 157, 165, 0.1) 0px 8px 24px;
    display: flex;
    `
export const ChatActionCotainer = styled(Div)`
    width: 70px;
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    display: grid;
    place-items: center;
    
    `
export const Send = styled(Button)`
    display: grid;
    place-items: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius:50%;
    background:rgb(25 118 210);
    color: #fff;

    &:active{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    svg{
        transition: all  cubic-bezier(0.4, 0, 1, 1) 100ms;
    }
`

// chat Area message 
export const MessageContaienr = styled(Div)`
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar{
        width:18px;
    }
    &::-webkit-scrollbar-thumb{
        background: #d0d0d0;
        border: 6px solid #fafafa;
        border-radius: 10px;
    }
`
export const ChatBox = styled(Div)`
    width: 100%;
    height: auto;
    padding: 10px 0px;
    display: flex;
    align-items: flex-end;
    flex-direction: ${({ isMe }) => isMe ? 'row-reverse' : 'row'};
    
    `
export const MessageOuter = styled(Div)`
    max-width: 60%;
    position: relative;
    border-radius: 20px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    ${({ isMe }) => isMe ? 'border-bottom-right-radius' : 'border-bottom-left-radius'} : 2px;
    overflow: hidden;

`
export const HiddenInput = styled(Div)`
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
`
export const Message = styled(Div)`
    padding: 10px 20px;
    width: 100%;
    height: 100%;
`
export const ChatDp = styled(Div)`
    margin: 0px 10px;
    width: 40px;
    height: 40px;
    background: red;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    background: #fff;
`
export const Msg = styled(Div)`
    font-size: 15px;
`
export const Time = styled(Div)`
    font-size: 12px;
    text-align: right;
    color: #999;
`

// Context Container
export const ContextContainer = styled(Div)`
    width: 190px;
    position: fixed;
    display: ${({ active }) => active ? 'block' : 'none'};
    left: ${({ left }) => `${left}px`};
    top: ${({ top }) => `${top}px`};
    background:#fff;
    border-radius:6px;
    border: 1px solid #dddddd9e;
    padding: 5px 6px;
    z-index:100;
    div{
        margin: 3px 0px;
        button{
            padding:2px 0px;
            span{
                padding-left:10px
            }
        }
    }
`

// no chat 
export const NoChatContainer = styled(Div)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
export const NoChatLogo = styled(Div)`
    font-size: 200px;
    color: #ddd;
    line-height: 0.5;
`
export const InfoChat = styled(Div)`

`
export const Heading = styled(Div)`
    font-size: 20px;
    font-weight: bold;
    color: #557;
`