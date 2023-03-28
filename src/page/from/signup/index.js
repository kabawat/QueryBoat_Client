import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../style.css"
import { BsArrowLeft, BsFacebook } from 'react-icons/bs'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
const Signup = () => {
    const [isLoader, setIsLoader] = useState(false)
    const [isOtp, setIsOtp] = useState(false)

    const [step, setStep] = useState('email') //next 

    // error state manage 
    const [error, setError] = useState({
        email: "",
        password: '',
        username: '',
        otp: ''
    })

    // form state manage 
    const [formData, setFormData] = useState({
        email: "",
        password: '',
        username: '',
        otp: ''
    })

    const handalChange = event => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // password show and hide 
    const [pwdShow, setPwdShow] = useState('password')
    // send otp handaler 
    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const sendOtp = async () => {
        const { email } = formData
        try {
            if (email) {
                if (!isValidEmail(email)) {
                    throw new Error('Enter valid email')
                }
                setIsLoader(true)
                axios.post('https://queryboat-api.onrender.com/sendotp', { email }).then((respoce) => {
                    if (respoce.data.status) {
                        setError({
                            email: null
                        })
                        setIsOtp(true)
                        setIsLoader(false)
                    }
                }).catch((error) => {
                    setError({
                        email: error?.response?.data?.massage
                    })
                    setIsLoader(false)
                })
            } else {
                throw new Error('email is required')
            }
        } catch (error) {
            setIsLoader(false)
            setError({
                email: error.message
            })
        }
    }

    const verifyEmail = () => {
        const { email, otp } = formData
        try {
            if (!otp) {
                throw new Error('enter otp')
            }
            if (otp.length !== 6) {
                throw new Error('please enter valid OTP')
            }
            setError({ otp: null })
            setIsLoader(true)
            axios.post('https://queryboat-api.onrender.com/verify-email', { email, otp }).then((responce) => {
                if (responce.data.status) {
                    setIsLoader(false)
                    setStep('username')
                }
            }).catch((error) => {
                setIsLoader(false)
                setError({ otp: error?.response?.data?.message })
            })

        } catch (error) {
            setIsLoader(false)
            setError({ otp: error?.message })
        }
    }

    const userEmailValidation = (username, password) => {
        if (!username || !password) {
            if (!username && !password) {
                setError({
                    username: 'username is required',
                    password: 'password is required'
                })
            } else if (!username) {
                setError({
                    username: 'username is required',
                })
            } else {
                setError({
                    password: 'password is required'
                })
            }
            return false
        }

        if (username.length < 3 && password.length < 6) {
            setError({
                username: 'username length must be 3 letter',
                password: 'password length must be 6 letter'
            })
            return false
        }

        if (username.length < 3) {
            setError({
                username: 'username length must be 3 letter',
            })
            return false
        }
        if (password.length < 6) {
            setError({
                password: 'password length must be 6 letter'
            })
            return false
        }
        setError({})
        return true
    }
    // username and password 
    const NextStep = () => {
        const { username, password } = formData
        try {
            const isValid = userEmailValidation(username, password)
            if (!isValid) {
                throw new Error(false)
            }
            setStep('image')

        } catch (error) {

        }
    }

    return (
        <div>
            <section className="container forms">
                <div className="form login">
                    {
                        step === 'username' && <button className='back-btn' onClick={() => setStep('email')}>
                            <span><BsArrowLeft /></span>
                        </button>
                    }
                    {
                        step === 'image' && <button className='back-btn' onClick={() => setStep('username')}>
                            <span><BsArrowLeft /></span>
                        </button>
                    }

                    <div className="form-content">
                        {step === "email" && <div className='form-heading'>Verify Email</div>}
                        {step === "username" && <div className='form-heading'>Personal Details</div>}
                        {step === "image" && <div className='form-heading'>Profile Picture </div>}
                        <form id='signup'>
                            {
                                (step === "email") && <>
                                    {/* Email */}
                                    <div className="field input-field">
                                        <input type="email" value={formData?.email} name="email"
                                            placeholder="Email" className="input input-contaroll"
                                            onChange={handalChange}
                                        />
                                    </div>
                                    {error?.email && <span className='error'>{error?.email}</span>}

                                    {/* OTP  */}
                                    {
                                        isOtp && <div className="field input-field">
                                            <input type="text" placeholder="OTP"
                                                className="input input-contaroll"
                                                name='otp'
                                                value={formData?.otp} onChange={handalChange}
                                            />
                                        </div>
                                    }
                                    {error?.otp && <span className='error'>{error?.otp}</span>}

                                    {isLoader ?
                                        <div className="field button-field">
                                            <button className='form-loader form-btn' type='button'>
                                                <ThreeDots
                                                    height="60"
                                                    width="60"
                                                    radius="9"
                                                    color="#fff"
                                                    ariaLabel="three-dots-loading"
                                                    visible={true}
                                                />
                                            </button>
                                        </div> : <div className="field button-field">
                                            <button className='form-btn' type='button' onClick={isOtp ? verifyEmail : sendOtp}>
                                                {isOtp ? 'Verify OTP' : 'Send OTP'}
                                            </button>
                                        </div>
                                    }
                                </>
                            }{
                                (step === "username") && <>
                                    <div className="field input-field">
                                        <input type="text" value={formData?.username} name="username"
                                            placeholder="Username" className="input input-contaroll"
                                            onChange={handalChange}
                                        />
                                    </div>
                                    {error?.username && <span className='error'>{error?.username}</span>}

                                    <div className="field input-field">
                                        <input type={pwdShow} value={formData?.password} name="password"
                                            placeholder='password' className="input input-contaroll"
                                            onChange={handalChange}
                                        />
                                    </div>
                                    <div className="input-field-check">
                                        <input type="checkbox" id='pwd'
                                            onChange={() => setPwdShow((pwdShow === 'password') ? 'text' : 'password')}
                                            className='inupt-checked' />
                                        <label htmlFor="pwd" > show password</label>
                                    </div>
                                    {error?.password && <span className='error'>{error?.password}</span>}
                                    {isLoader ?
                                        <div className="field button-field">
                                            <button className='form-loader form-btn' type='button'>
                                                <ThreeDots
                                                    height="60"
                                                    width="60"
                                                    radius="9"
                                                    color="#fff"
                                                    ariaLabel="three-dots-loading"
                                                    visible={true}
                                                />
                                            </button>
                                        </div> : <div className="field button-field">
                                            <button className='form-btn' type='button' onClick={NextStep}>
                                                Next
                                            </button>
                                        </div>
                                    }
                                </>
                            }
                        </form>

                        <div className="form-link">
                            <span>Already have an account? <NavLink to="/login" className="link signup-link">login</NavLink></span>
                        </div>
                    </div>

                    <div className="line"></div>

                    <div className="media-options">
                        <a href="/assets/facebook.webp" className="field facebook">
                            <span className="google-img"><BsFacebook /></span>
                            <span>Login with Facebook</span>
                        </a>
                    </div>

                    <div className="media-options">
                        <a href="#" className="field google">
                            <img src="/assets/google.png" alt="" className="google-img" />
                            <span>Login with Google</span>
                        </a>
                    </div>

                </div >
            </section >
        </div >
    )
}

export default Signup
