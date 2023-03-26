import styled from "styled-components"
import { Button } from "../style"
const Div = styled.div`

`
export const SubTitle = styled(Div)`
    font-size: 18px;
    font-weight: 500;
    padding-bottom: 10px;
`
export const AddUser = styled.input`
    width: 100%;
    height: 32px;
    border: none;
    border-bottom: 2px solid #E3F2FD;
    padding: 0px 5px;
    border-radius: 4px;
    background: #fff;
`
export const NewUserModale = styled(Div)`
    width: 100%;
    height: 100vh;
    background:transparent;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 40;
`
export const SearchContainer = styled(Div)`
    position: absolute;
    width:300px;
    background: #f9f9f9;
    border: 1px solid #f9f9f9;
    border-radius: 8px;
    backdrop-filter: blur(3px);
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    position: absolute;
    left: ${({ left }) => `${left}px`};
    top: ${({ top }) => `${top}px`};
    padding: 20px 10px;
    z-index: 100;
`
export const NewUserName = styled(Div)`
    font-size: 14px;
    padding-left: 10px;
    line-height:16px;
    font-weight: 600;
    text-align: left;
`
export const AddUserHeading = styled(Div)`
    font-size: 14px;
    padding: 5px 0px;
`
export const ContactList = styled(Div)`
    width: 100%;
    max-height: 200px;
    overflow: auto;
    &::-webkit-scrollbar{
        width: 16px;
    }
    &:hover::-webkit-scrollbar-thumb{
        border: 6px solid #f9f9f9;
        background: rgba(0,0,0,0.2);
        border-radius: 10px;
    }
`
export const ContactItem = styled(Button)`
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 10px;
    border-radius: 4px;
    margin: 10px 0px;
    cursor: pointer;
    &:hover{
        background: rgba(0,0,0,0.04);
    }
`

export const NewUserDp = styled(Div)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    img{
        border-radius: 50%;
    }
`
export const TagLine = styled(Div)`
    font-weight: 500;
    font-size: 12px;
    padding-left: 10px;
    line-height:16px ;
    text-align: left;
`

// setting modale 
export const SettingModalContainer = styled(Div)`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    `
export const SettingContainer = styled(Div)`
    width: 500px;
    height: 450px;
    transform: translateY(-100%);
    border-radius:8px;
    border: 1px solid #dddddd9e;
    position: absolute;
    left: 52px;
    top: ${({ mouse }) => `${mouse.y}px`};
    overflow:hidden;
`
export const SettingNavigation = styled(Div)`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: #e3f2fd99;
    backdrop-filter:blur(15px);
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
`
export const SettionSection = styled(Div)`
    padding: 4px 4px;
    width: 100%;
`

export const UserSection = styled(Button)`
    width: 100%;
    padding: 4px;
    border-radius: 6px;
    background:  ${({ active }) => active ? '#d0d5d769' : ""};
    position: relative;
    margin: 2px 0px;
    div{
        color: ${({ active }) => active ? '#1976d2' : ""};
    }
    &::before{
        content: "";
        position: absolute;
        width: 4px;
        height: 60%;
        left: 0px;
        background: ${({ active }) => active ? '#1976d2' : ""};
        top: 50%;
        transform: translateY(-50%);
        border-radius: 0px 3px 3px 0px;
    }
`

export const ActionList = styled(Div)`
    padding-left:10px;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:flex-start;
`
export const Icon = styled(Div)`
    padding-top:5px; 
    color: ${({ active }) => active ? '#1976d2' : ""};
`
export const Item = styled(Div)`
    font-size:13px;
    padding-left:10px;
`
export const SettionMenu = styled(Div)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    padding-left: 30%;
    z-index: 8;
`
export const InnerSettingMenu = styled(Div)`
    width: 100%;
    height: 100%;
    background: #fff;
    padding:10px 20px;
`