import styled from "styled-components";
import { Button } from "../../style";
const Div = styled.div`

`
export const UserDpSection = styled(Div)`
    width: 100%;
    padding: 10px 0px;   
`
export const DpContainer = styled(Div)`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: red;
    position: relative;
`
export const DpImage = styled(Div)`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    left: 0px;
    overflow: hidden;
`
export const DpMenu = styled(Button)`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background: ${({ active }) => active ? 'rgba(0, 0, 0, 0.5)' : ' rgba(0, 0, 0, 0)'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
        color: #fff;
        font-size : 20px;
        visibility: ${({ active }) => active ? 'visible' : 'hidden'};
    }
    
    &:hover{
        background: rgba(0, 0, 0, 0.5);
         span{
            visibility: visible;
    }
    }
`
export const DpSetting = styled(Div)`
    position: absolute;
    left: 110%;
    top: 0px;
    border-radius: 4px;
    background: #fff;
    padding: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`

export const ActionList = styled(Button)`
    font-size: 14px;
    padding: 5px 10px;
    border-radius: 4px;
    background: #fff;
    white-space: nowrap;
    width: 100%;
    text-align: left;
    &:hover{
        background: #dddddd9e;
    }
`
export const UserInfoSection = styled(Div)`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
export const InfoGroup = styled(Div)`
    padding: 10px 0px;
`
export const TitleBox = styled(Div)`
    font-size: 14px;
    font-size: 1.1;
    color: #012303;
`
export const EditBox = styled(Div)`
    font-size: 16px;
    color: #000;
    font-size: 1.1;
    input{
        background: none;
        outline: none;
        width: 100%;
        padding: ${({ isEditEmail }) => isEditEmail ? '4px 10px' : '0px'};
        border: ${({ isEditEmail }) => isEditEmail ? '1px solid #000' : 'none'};
    }
`
export const EditButton = styled(Button)`
    font-size: 20px;
`