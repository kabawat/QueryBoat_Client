import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import "../style.css"
import { BsArrowLeft, BsFacebook } from 'react-icons/bs'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const ForgetPwd = () => {
    const navigate = useNavigate()
    const { BaseUrl } = useSelector(state => state)
    const [cookies] = useCookies()
    const [isRender, setIsRender] = useState(false)
    useEffect(() => {
        if (cookies?.auth) {
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } else {
            setIsRender(true)
        }
    }, [cookies, navigate])

    const [isLoader, setIsLoader] = useState(false)
    const [isOtp, setIsOtp] = useState(false)
    const [step, setStep] = useState('email') //next 
    // error state manage 
    const [error, setError] = useState({
        email: "",
        password: '',
        confirm_password: '',
        otp: ''
    })

    // form state manage 
    const [formData, setFormData] = useState({
        email: "",
        password: '',
        confirm_password: '',
        otp: ''
    })

    const handalChange = event => {
        const { name, value } = event.target
        setError({})
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // password show and hide 
    const [pwdShow, setPwdShow] = useState(true)

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
                axios.post(`${BaseUrl}/forgot-otp`, { email }).then((respoce) => {
                    if (respoce.data.status) {
                        setError({
                            email: null
                        })
                        setIsOtp(true)
                        setIsLoader(false)
                    }
                }).catch((error) => {
                    setError({
                        email: error?.response?.data?.message
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
            axios.post(`${BaseUrl}/forgot-password-verify`, { email, otp }).then((responce) => {
                if (responce.data.status) {
                    setIsLoader(false)
                    setStep('password')
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

    // password validation 
    function passwordValidtion(password, confirmPassword) {
        // 1. password and confirm password empty nahi hona chahiye
        if (!password && !confirmPassword) {
            return {
                password: "password are required",
                confirm_password: "confirm password are required",
            };
        }

        // 2. if password is empty 
        if (!password) {
            return {
                password: "password are required",
            };
        }

        // 3. if confirm password is empty 
        if (!confirmPassword) {
            return {
                confirm_password: "confirm password are required",
            };
        }

        // 4. if password and confirm password bouth are empty
        if (password.trim().length === 0) {
            return {
                confirm_password: "confirm password are required",
            };
        }
        if (confirmPassword.trim().length === 0) {
            return {
                confirm_password: "confirm password are required",
            };
        }

        // 5. if password length < 6 
        if (password.trim().length < 6) {
            return {
                password: "password length must be 6 characters",
            };
        }

        // 6. if confirm password !== password 
        if (password !== confirmPassword) {
            return {
                confirm_password: "confirm password does not match",
            };
        }
        return false
    }

    function handalSubmit() {
        setIsLoader(true)
        const { password, confirm_password, email } = formData
        const pwd = passwordValidtion(password, confirm_password)
        setError({ ...pwd })
        if (!pwd) {
            axios.post(`${BaseUrl}/forgot-password`, { email, password }).then((respoce) => {
                setIsLoader(false)
                navigate('/login')
            }).catch((error) => {
                console.log(error)
                setIsLoader(false)
            })
        } else {
            setIsLoader(false)
        }
    }

    return (
        isRender ? <div>
            <section className="container forms">
                <div className="form login">
                    {
                        step === 'username' && <button className='back-btn' onClick={() => setStep('email')}>
                            <span><BsArrowLeft /></span>
                        </button>
                    }
                    <div className="form-content">
                        {step === "email" && <div className='form-heading'>Forgot Password</div>}
                        {step === "password" && <div className='form-heading'>New Password</div>}
                        <form id='signup'>
                            {
                                (step === "email") && <>
                                    {/* Email */}
                                    <div className="field input-field">
                                        <input type="email" value={formData?.email} name="email"
                                            placeholder="Email" className="input input-contaroll"
                                            onChange={handalChange} suggested="current-email"
                                        />
                                    </div>
                                    {error?.email && <span className='error'>{error?.email}</span>}

                                    {/* OTP  */}
                                    {
                                        isOtp && <div className="field input-field">
                                            <input type="text" placeholder="OTP"
                                                className="input input-contaroll"
                                                name='otp'
                                                suggested="current-otp"
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
                                (step === "password") && <>
                                    <div className="field input-field">
                                        <input type={pwdShow ? 'password' : 'text'} value={formData?.password} name="password"
                                            placeholder="new password" className="input input-contaroll"
                                            onChange={handalChange} suggested="current-password"
                                        />
                                    </div>
                                    {error?.password && <span className='error'>{error?.password}</span>}

                                    <div className="field input-field">
                                        <input type={pwdShow ? 'password' : 'text'} value={formData?.confirm_password} name="confirm_password"
                                            placeholder='confirm password'
                                            suggested="current-password"
                                            className="input input-contaroll"
                                            onChange={handalChange}
                                        />
                                    </div>
                                    {error?.confirm_password && <span className='error'>{error?.confirm_password}</span>}
                                    <div className="input-field-check">
                                        <input type="checkbox" id='pwd'
                                            onChange={() => setPwdShow(!pwdShow)}
                                            className='inupt-checked' />
                                        <label htmlFor="pwd" >{pwdShow ? 'show' : 'hide'}  password</label>
                                    </div>
                                    {isLoader ? <div className="field button-field">
                                        <button className='form-loader form-btn' type='button'>
                                            <ThreeDots height="60" width="60" radius="9" color="#fff" ariaLabel="three-dots-loading" visible={true} />
                                        </button>
                                    </div> : <div className="field button-field">
                                        <button className='form-btn' type='button' onClick={handalSubmit} >
                                            save
                                        </button>
                                    </div>}
                                </>
                            }
                        </form>

                        <div className="form-link">
                            <span>Already have an account? <NavLink to="/login" className="link signup-link">login</NavLink></span>
                        </div>
                    </div>

                    <div className="line"></div>

                    <div className="media-options">
                        <button className="field facebook" type="button">
                            <span className="google-img"><BsFacebook /></span>
                            <span>Login with Facebook</span>
                        </button>
                    </div>

                    <div className="media-options">
                        <button className="field google" type="button">
                            <img src="/assets/google.png" alt="" className="google-img" />
                            <span>Login with Google</span>
                        </button>
                    </div>

                </div >
            </section >
        </div > : <Loader />
    )
}

export default ForgetPwd
