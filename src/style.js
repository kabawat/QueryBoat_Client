import styled from 'styled-components'
const Div = styled.div``
export const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: inherit;
`

export const Button = styled.button`
    outline: none;
    font-size: inherit;
    outline: none;
`
export const ContextAction = styled(Div)`
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
    &:hover{
        cursor: pointer;
        background: #fafafa;
    }
    button{
        display: flex;
        align-items: center;
        width: 100%;
        text-align: left;
        color: #2d4251;
        span{
            padding-left: 5px;
        }
    }
`
