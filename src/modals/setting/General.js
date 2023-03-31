import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const General = () => {
    const [, , removeCookie] = useCookies()
    const navigate = useNavigate()
    const logout = () => {
        removeCookie('auth')
        localStorage.removeItem('curChatWith')
        localStorage.removeItem('user')
        navigate('/login')
    }
    return (
        <div>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default General
