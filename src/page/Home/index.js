import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const [cookies] = useCookies()
    const [isRender, setIsRender] = useState(false)
    useEffect(() => {
        if (cookies?.auth) {
            setIsRender(false)
        } else {
            navigate('/auth')
        }
    }, [])
    return (
        isRender ? <div>

        </div> : ''
    )
}

export default Home
