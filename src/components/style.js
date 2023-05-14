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
export const SettingSection = styled(Div)`
    position: relative;
    /* z-index: 20; */
    @media screen and (min-width : 769px){
        display: none;
    }
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
    position: relative;
    #Mobile_Message{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height:100%;
        border-radius: 50%;
    }
    &:active{
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    }
`

export const ListContaienr = styled(Div)`
    z-index: 10;
    position: absolute;
    right: 0px;
    padding: 10px 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background: #fff;
    border-radius: 8px;
    top: ${({ top }) => top};
    transition:  ${({ delay }) => `${delay}s`} all  ease-in-out;
    visibility: ${({ show }) => show};
`
export const ActionList = styled(Button)`
    white-space: pre;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 16px;
    display: flex;
    color: rgb(45, 66, 81);
    align-items: center;
    span{
        font-size: 14px;
        padding-left: 5px;
        font-family: 'Poppins', sans-serif;
    }
    &:hover{
        background: rgb(250, 250, 250);
    }
`
export const BackArrow = styled(Button)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: rgb(82 119 156);
    &:active{
        background: rgb(82 119 156 / 52%);
        color: #fff;
    }
    @media screen and (max-width:768px){
        display: flex;
    }
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

// footer 
export const FooterContaienr = styled.form`
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: 80px;
    padding-right: 70px;
`
export const ImagePreview = styled.div`
    width: 300px;
    height: auto;
    position: absolute;
    bottom:105%;
    overflow: hidden;
    left:20px;
    background: #fff;
    border-radius: 10px;
    padding: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    
`
export const AudioPreviewBox = styled.div`
     width: 325px;
    height: 45px;
    position: absolute;
    bottom:105%;
    overflow: hidden;
    left:20px;
    background: #fff;
    border-radius: 8px;
    padding: 5px;
    display:flex;
    justify-content: space-between;
    padding-right: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export const AudioMsgBox = styled.div`
    width: 100%;
    height: auto;
`
export const AudioMessage = styled.div`
    width:280px;
    height: 45px;
    overflow: hidden;
    left:20px;
    background: #fff;
    border-radius: 8px;
    padding: 5px;
    display:flex;
    justify-content: flex-start;
    padding-right: 10px;
    margin-top: 10px;
    margin-left: 10px;

    @media screen and (max-width:426px) {
     width: 240px   
    }
`
export const PlayButton = styled(Button)`
    min-width: 35px;
    max-width: 35px;
    min-height: 35px;
    max-height: 35px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 20px;
`
export const AudioInput = styled.input`
    width: 80%;
`
export const SelectedFileAction = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0px;
    display: flex;
    align-items: center;
    padding: 5px 20px;
    backdrop-filter: blur(2px);
    /* background: rgba(0,0,0,0.1); */

    /* background: linear-gradient(0deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2), rgba(255,255,255,0.0)); */
    `
export const ActionButton = styled(Button)`
    font-size: 20px;
    font-weight: bold;
    color: aliceblue;
    width: 35px;
    height: 35px;
    border-radius: 10px;
    display: grid;
    color: rgb(62 66 72);
    place-items: center;
    &:hover{
        color: rgb(87 157 255);
    }
`
export const SelectedInner = styled.div`
    width: 100%;
    border-radius: inherit;
    position: relative;
    overflow:hidden;
    img {
        border-radius: inherit;
        width: 100%;
        height: auto;
    }

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

export const FileIcon = styled.div`
    cursor: pointer;
    display: block;
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    place-items:center;
    justify-content: center;
    color: #457678;
    font-size:20px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    margin-right: 10px;

    &:hover{
        color: #1976d2;
        label:nth-child(1){
            color: #1976d2;
            opacity: 1;
            visibility: visible;
            transform: translate(20%, -50%);
        }
    }
    `
export const Label = styled.label`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    left: 0px;
    cursor: pointer;
    &:hover ~ label{
        color: #1976d2;
            opacity: 1;
            visibility: visible;
            transform: translate(20%, -50%);
    }
`
export const Title = styled.label`
    visibility: hidden;
    position: absolute;
    cursor: pointer;
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
    position: relative;
    
`
export const NoMsgBox = styled(Div)`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`
export const MessageOuter = styled(Div)`
    max-width: 60%;
    position: relative;
    border-radius: 20px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    ${({ isMe }) => isMe ? 'border-bottom-right-radius' : 'border-bottom-left-radius'} : 2px;
    margin-right: ${({ isMe }) => isMe ? '10px' : "0px"};
    overflow: hidden;
    @media screen and (max-width:425px) {
    }

`
export const ClipBoard = styled(Div)`
    height: 100%;
    align-self: self-start;
    border-radius: 5px;
    margin: 4px 10px;
    /* color: #fff;
    background: rgba(0, 0, 0, 0.8); */
    font-size:14px;
    padding: 4px;
    transform: scale(0);
    animation: ${({ active }) => (active ? 'show 1.2s ease-in' : '')};
    @keyframes show {
        0%{
            transform: scale(0);
        }
        10%{
            transform: scale(1);
        }
        15%{
            transform: scale(1.2);
        }
        20%{
            transform: scale(1);
        }
        80%{
            transform: scale(1);
        }
        90%{
            transform: scale(1.2);
        }
        95%{
            transform: scale(1);
        }
        100%{
            transform: scale(0);
        }
    }
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
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
    background: red;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    background: #fff;
`
export const Msg = styled(Div)`
    font-size: 15px;
`
export const ChatImage = styled(Div)`
    border-radius: 6px;
    img{
        width: 100%;
        /* height: 100%; */
        border-radius: inherit;
    }
`

export const Time = styled(Div)`
    font-size: 12px;
    text-align: right;
    color: #999;
    backdrop-filter:blur(3px);
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
    @media screen and (max-width : 768px) {
        left: 50%;
        top : 50%;
        transform: translate(-50%,-50%)
    }
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
export const MassageOuter = styled(Div)` //6
    max-width: 60%;
    position: relative;
    border-radius: 20px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    ${({ isMe }) => isMe ? 'border-bottom-right-radius' : 'border-bottom-left-radius'} : 2px;
    overflow: hidden;

`
export const Massage = styled(Div)`
    padding: 10px 20px;
    width: 100%;
    height: 100%;
`
export const VideoMsg = styled(Div)` //7
     padding: 10px 10px;
     width: 280px;
     height: 100%;
    `
export const Video = styled(Div)` //8
      width: 100%;
      height: 0;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
      position: relative;
      overflow: hidden;
      border-radius: 10px;
    video{
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }
`
export const MsgContant = styled(Div)` //4
    position: relative;
`
export const VideoTime = styled(Div)` 
    position: absolute;
    bottom: 5px;
    right: 0px;
    font-size: 12px;
    text-align: right;
    color: #999;
    padding: 0px 10px;
`
export const AudioTime = styled(Div)` 
    bottom: 5px;
    right: 0px;
    font-size: 12px;
    text-align: right;
    color: #999;
    padding: 5px 10px;
`
export const VideoDesc = styled(Div)`  //3
    width: 100%;
    text-align: justify;
    padding: 5px 10px;
`
export const AudioDesc = styled(Div)`  //3
    width: 100%;
    text-align: justify;
    padding-left: 30px;
    padding-bottom: 15px;
    padding-right: 20px;
`
