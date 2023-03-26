import React from 'react'
import { useCookies } from 'react-cookie'

const General = () => {
    const [, , removeCookie] = useCookies(['auth'])
    const logout = () => {
        removeCookie('auth')
        localStorage.removeItem('curChatWith')
        localStorage.removeItem('user')
    }
    return (
        <div>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default General
