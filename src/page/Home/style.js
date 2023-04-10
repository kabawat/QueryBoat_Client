import styled from 'styled-components'
const Div = styled.div`
`
export const Container = styled(Div)`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #fafafa;
    position: relative;
`
export const Aside = styled(Div)`
    position: absolute;
    left: 0px;
    top:0px;
    width: 380px;
    height: 100%;
    background: #E3F2FD;
    z-index: 15;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    transition: all 0.1s linear;
    @media screen and (max-width:768px){
        width:${({ isActive }) => (isActive ? '100%' : '0px')};
        overflow: hidden;
    }
    
`
export const Main = styled(Div)`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0px;
    left: 0px;
    padding-left: 380px;
    z-index: 10;
    transition: all 0.1s linear;
    @media screen and (max-width:768px){
        padding-left: 0px;
    }
`

export const ChatContainer = styled(Div)`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding: 60px 0px;
`
export const Header = styled(Div)`
    top: 0px;
    left: 0px;
    position: absolute;
    width: 100%;
    height: 60px;
    z-index: 20;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    background: #fff;
    `
export const Footer = styled(Div)`
    position: absolute;
    width: 100%;
    height: 60px;
    bottom: 0px;
    right: 0px;
    box-shadow: rgba(33, 35, 38, 0.1) 0px -10px 10px -10px;
    background: #fff;
`
export const ChatAreaContainer = styled(Div)`
    width: 100%;
    height: 100%;
    overflow: hidden;
`
