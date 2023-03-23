import React, { useState } from 'react'
import './style.css'

import Login from './Login'
import SignUp from './SignUp'
const Auths = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [snack, setSnack] = useState('')
    const handalChangeForm = (event) => {
        setSnack('is-gx')
        setIsLogin(event)
        setTimeout(() => {
            setSnack('')
        }, 1500)
    }
    return (
        <div className="main">
            <div className={isLogin ? "container a-container is-txl" : "container a-container"} id="a-container">
                <SignUp />
            </div>
            <div className={isLogin ? "container b-container  is-txl is-z200" : "container b-container"} id="b-container">
                <Login />
            </div>
            <div className={isLogin ? `switch is-txr ${snack}` : `switch ${snack}`} id="switch-cnt">
                <div className={isLogin ? "switch__circle is-txr" : "switch__circle "}></div>
                <div className={isLogin ? "switch__circle is-txr switch__circle--t" : 'switch__circle switch__circle--t'}></div>
                <div className={isLogin ? "switch__container is-hidden" : "switch__container"} id="switch-c1">
                    <h2 className="switch__title title">Welcome Back !</h2>
                    <p className="switch__description description">To keep connected with us please login with your personal info</p>
                    <button className="switch__button button switch-btn" onClick={() => handalChangeForm(true)}>SIGN IN</button>
                </div>
                <div className={isLogin ? "switch__container" : "switch__container is-hidden"} id="switch-c2">
                    <h2 className="switch__title title">Hello Friend !</h2>
                    <p className="switch__description description">Enter your personal details and start journey with us</p>
                    <button className="switch__button button switch-btn" onClick={() => handalChangeForm(false)}>SIGN UP</button>
                </div>
            </div>
        </div >
    )
}

export default Auths
