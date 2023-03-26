import React, { useState } from 'react'
import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { AiOutlineGithub } from 'react-icons/ai'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
const SignUp = () => {

    const [email, setEmail] = useState('')
    const [isEmailError, setIsEmailError] = useState()
    const [isSendEmail, setIsSendEmail] = useState(false)

    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState()

    const [isVerify, setIsVerify] = useState(false)
    const [isLoader, setIsLoader] = useState(false)

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState({
        username: '',
        password: ''
    })
    const handalChange = event => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleMail = (e) => { setEmail(e.target.value) }

    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    // send opt on email 
    const sendOpt = async () => {
        try {
            if (email) {
                if (!isValidEmail(email)) {
                    throw new Error('invalid email format')
                }
                setIsLoader(true)
                axios.post('https://queryboat-api.onrender.com/sendotp', { email }).then((respoce) => {
                    if (respoce.data.status) {
                        setIsEmailError(null)
                        setIsSendEmail(true)
                        setIsLoader(false)
                    }
                }).catch((error) => {
                    setIsEmailError(error.response.data.massage)
                    setIsLoader(false)
                })
            } else {
                throw new Error('email is required')
            }
        } catch (error) {
            setIsLoader(false)
            setIsEmailError(error.message)
        }
    }

    // verify email 
    const verifyEmail = () => {
        try {
            if (!otp) {
                throw new Error('enter otp')
            }
            if (otp.length !== 6) {
                throw new Error('please enter valid OTP')
            }
            setOtpError(null)
            setIsLoader(true)
            axios.post('https://queryboat-api.onrender.com/verify-email', { email, otp }).then((responce) => {
                if (responce.data.status) {
                    setIsLoader(false)
                    setIsVerify(true)
                }
            }).catch((error) => {
                setIsLoader(false)
                setOtpError(error.response.data.message)
            })

        } catch (error) {
            setIsLoader(false)
            setOtpError(error.message)
        }
    }

    // submit form 
    const handleSubmitForm = (event) => {
        event.preventDefault()
        try {
            

        } catch (error) {
            
        }
    }

    console.log(error)

    return (
        <form className="form" id="a-form" onSubmit={handleSubmitForm}>
            <h2 className="form_title title">Create Account</h2>
            <div className="form__icons">
                <button className='form__icon' type='button'><BsGoogle /></button>
                <button className='form__icon' type='button'><FaFacebookF /></button>
                <button className='form__icon' type='button'><AiOutlineGithub /></button>
            </div>
            {
                isVerify ? <>
                    <span className="form__span">Verify your email</span>
                    <input className="form__input" type="email"
                        name='verifyEmail'
                        placeholder="email"
                        value={email}
                        onChange={handleMail}
                        autoComplete="current-email"
                    />
                    {isEmailError ? <div className='error'>* {isEmailError}</div> : ''}
                    {
                        isSendEmail ? <input className="form__input" type="text"
                            name='verifyEmail'
                            placeholder="Enter OTP"
                            value={otp}
                            max='6'
                            onChange={event => setOtp(event.target.value)}
                            autoComplete="current-email"
                        /> : ''
                    }
                    {otpError ? <div className='error'>* {otpError}</div> : ''}

                    {
                        isLoader ?
                            <button className="form__button button submit" type='button' style={{ cursor: 'no-drop' }}>
                                <ThreeDots
                                    height="60"
                                    width="60"
                                    radius="9"
                                    color="#fff"
                                    ariaLabel="three-dots-loading"
                                    visible={true}
                                />
                            </button>
                            : isSendEmail ? (
                                <button className="form__button button submit" type='button' onClick={verifyEmail}>
                                    verify
                                </button>
                            ) : (
                                <button className="form__button button submit" type='button' onClick={sendOpt}>
                                    Send Otp
                                </button>
                            )
                    }


                </> : <>
                    <span className="form__span">or use email for registration</span>
                    <input className="form__input" type="text"
                        name='username'
                        placeholder="Username"
                        value={formData.username}
                        autoComplete="current-username"
                        onChange={handalChange}
                    />
                    {error?.username ? <div className='error'>* {error?.username}</div> : ''}
                    <input className="form__input" type="password"
                        name='password'
                        placeholder="Password"
                        value={formData.password}
                        autoComplete="current-password"
                        onChange={handalChange}
                    />
                    {error?.password ? <div className='error'>* {error?.password}</div> : ''}
                    <button className="form__button button submit" type='submit'>Submit</button>
                </>
            }
        </form>
    )
}
export default SignUp