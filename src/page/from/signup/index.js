import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Loader from '../../../components/loader/Loader'
import "../style.css"
import { BsArrowLeft, BsFacebook } from 'react-icons/bs'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import { BsPlusLg } from 'react-icons/bs'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const Signup = () => {
    const navigate = useNavigate()
    const { BaseUrl } = useSelector(state => state)
    const [cookies, setCookies] = useCookies()
    const [isRender, setIsRender] = useState(false)

    useEffect(() => {
        if (cookies?.auth) {
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } else {
            setIsRender(true)
        }
    }, [])

    const [isLoader, setIsLoader] = useState(false)
    const [isOtp, setIsOtp] = useState(false)

    const [step, setStep] = useState('email') //next 
    const [imgFile, setImgFile] = useState('')
    const [file, setFile] = useState()
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
                axios.post(`${BaseUrl}/sendotp`, { email }).then((respoce) => {
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

    // verify email 
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
            axios.post(`${BaseUrl}/verify-email`, { email, otp }).then((responce) => {
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
            axios.post(`${BaseUrl}/verify-username`, { username }).then((result) => {
                if (result?.data?.status) {
                    setError({})
                    setStep('image')
                } else {
                    setError({
                        username: 'somthing wrong',
                    })
                }
            }).catch((error) => {
                setError({
                    username: error?.response?.data?.message,
                })
            })

        } catch (error) {

        }
    }

    const handalImage = (event) => {
        {
            const file = event.target.files[0];
            setFile(file)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64String = reader.result;
                setImgFile(base64String);
            };
        }
        setError({})
    }

    // handal submit 
    const handalSubmit = (event) => {
        event.preventDefault();
        setIsLoader(true);
        setError({});

        try {
            const finalData = new FormData();
            finalData.append("username", formData.username);
            finalData.append("password", formData.password);
            finalData.append("email", formData.email);
            if (event.target.id === "signup") {
                if (!file) {
                    setError({ image: "upload profile picture" });
                    throw new Error("upload profile picture");
                }
                finalData.append("profile", file);
                // Send the data to the server
                axios.post(`${BaseUrl}/registration`, finalData).then((response) => {
                    const { username, token } = response?.data
                    setCookies('auth', {
                        username, token
                    })
                    setIsLoader(false);
                    navigate('/')
                }).catch((error) => {
                    setIsLoader(false);
                    setError({ image: error?.response?.data?.message });
                });
            } else {
                axios.post(`${BaseUrl}/registration`, finalData).then((response) => {
                    const { username, token } = response?.data
                    setCookies('auth', {
                        username, token
                    })
                    setIsLoader(false);
                    setIsRender(false)
                    navigate('/')
                }).catch((error) => {
                    setIsLoader(false);
                    setError({ image: error?.response?.data?.message });
                });
            }
        } catch (error) {
            setIsLoader(false);
            setError({ image: error?.message });
        }
    };

    return (
        isRender ? <div>
            <section className="container forms">
                <div className="form login">
                    {
                        step === 'username' && <button className='back-btn' onClick={() => setStep('email')}>
                            <span><BsArrowLeft /></span>
                        </button>
                    }
                    {
                        step === 'image' && <div className='topArrow'>
                            <button className='back-btn' onClick={() => {
                                setStep('username')
                                setImgFile('')
                                setFile('')
                            }}>
                                <span><BsArrowLeft /></span>
                            </button>
                            <button className='skip-btn' type='button' id='skipImage' onClick={handalSubmit}>
                                <span>skip</span>
                            </button>
                        </div>
                    }

                    <div className="form-content">
                        {step === "email" && <div className='form-heading'>Verify Email</div>}
                        {step === "username" && <div className='form-heading'>Personal Details</div>}
                        {step === "image" && <div className='form-heading'>Profile Picture </div>}
                        <form id='signup' onSubmit={handalSubmit}>
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
                                (step === "username") && <>
                                    <div className="field input-field">
                                        <input type="text" value={formData?.username} name="username"
                                            placeholder="Username" className="input input-contaroll"
                                            onChange={handalChange} suggested="current-username"
                                        />
                                    </div>
                                    {error?.username && <span className='error'>{error?.username}</span>}

                                    <div className="field input-field">
                                        <input type={pwdShow ? 'password' : 'text'} value={formData?.password} name="password"
                                            placeholder='password'
                                            suggested="current-password"
                                            className="input input-contaroll"
                                            onChange={handalChange}
                                        />
                                    </div>
                                    {error?.password && <span className='error'>{error?.password}</span>}
                                    <div className="input-field-check">
                                        <input type="checkbox" id='pwd'
                                            onChange={() => setPwdShow(!pwdShow)}
                                            className='inupt-checked' />
                                        <label htmlFor="pwd" >{pwdShow ? 'show' : 'hide'}  password</label>
                                    </div>
                                    {error?.password && <span className='error'>{error?.password}</span>}
                                    {isLoader ? <div className="field button-field">
                                        <button className='form-loader form-btn' type='button'>
                                            <ThreeDots height="60" width="60" radius="9" color="#fff" ariaLabel="three-dots-loading" visible={true} />
                                        </button>
                                    </div> : <div className="field button-field">
                                        <button className='form-btn' type='button' onClick={NextStep}>
                                            Next
                                        </button>
                                    </div>}
                                </>
                            }{
                                (step === "image") && <>
                                    <div className='form-image_container'>
                                        <label htmlFor='imageFile' className='form-image_profile'>
                                            {imgFile ? <img src={imgFile} /> : <BsPlusLg />}
                                        </label>
                                        <input id='imageFile' type='file' onChange={handalImage} accept='image/*' />
                                    </div>
                                    {error?.image && <div className='error' style={{ textAlign: 'center', margin: '10px 0px' }}>{error?.image}</div>}
                                    {
                                        isLoader ?
                                            <div className="field button-field">
                                                <button className='form-loader form-btn' type='button'>
                                                    <ThreeDots height="60" width="60" radius="9" color="#fff" ariaLabel="three-dots-loading" visible={true} />
                                                </button>
                                            </div> : <div className="field button-field">
                                                <button className='form-btn' type={'submit'}>
                                                    Continue
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

export default Signup
