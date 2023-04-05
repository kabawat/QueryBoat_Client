import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, } from 'react-router-dom'
import "../style.css"
import { BsFacebook } from 'react-icons/bs'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import Loader from '../../../components/loader/Loader'
import { myProfile } from '../../../redux/action'
const Login = () => {
    const { BaseUrl, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [pwdShow, setPwdShow] = useState(true)
    const [isRender, setIsRender] = useState(false)
    const [cookies, setCookies] = useCookies()
    const navigate = useNavigate()
    useEffect(() => {
        if (!cookies?.auth) {
            setIsRender(true)
        } else {
            navigate('/')
        }
    }, [])

    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    const EmailValidation = (data) => {
        const { email, password } = data
        if (!email || !password) {
            if (!email && !password) {
                setError({
                    email: 'email is required',
                    password: 'password is required'
                })
            } else if (!email) {
                setError({
                    email: 'email is required',
                })
            } else {
                setError({
                    password: 'password is required'
                })
            }
            return false
        }
        const isEmail = isValidEmail(email)
        if (!isEmail) {
            setError({
                email: 'invalid format email',
            })
        }
        setError({})
        return isEmail
    }
    const handalChange = (event) => {
        const { name, value } = event.target
        if (value) {
            setError({
                ...error,
                [name]: null
            })
        }
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handalSubmit = event => {
        event.preventDefault()
        const isValid = EmailValidation(formData)
        if (isValid) {
            axios.post(`${BaseUrl}/login`, formData).then((Response) => {
                const { username, token } = Response?.data
                axios.get(`${BaseUrl}/profile/${username}`, {
                    headers: { token: token }
                }).then((result) => {
                    dispatch(myProfile(result?.data?.data))
                    setCookies('auth', {
                        username, token
                    })
                    socket.emit('refresh', username)
                    navigate('/')
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                setError({
                    password: error?.response?.data?.message
                })
            })
        }
    }
    return (
        isRender ? <section className="container forms">
            <div className="form login">
                <div className="form-content">
                    <div className='form-heading'>Login</div>
                    <form id='login' onSubmit={handalSubmit}>
                        <div className="field input-field">
                            <input type="text" value={formData?.email} name="email"
                                placeholder="email" className="input input-contaroll"
                                onChange={handalChange}

                            />
                        </div>
                        {error?.email && <span className='error'>{error?.email}</span>}

                        <div className="field input-field">
                            <input type={pwdShow ? 'text' : 'password'}
                                value={formData?.password} name="password"
                                suggested="current-password"
                                placeholder='password' className="input input-contaroll"
                                onChange={handalChange}
                            />
                        </div>
                        {error?.password && <span className='error'>{error?.password}</span>}
                        <div className="input-field-check">
                            <input
                                type="checkbox"
                                id='pwd'
                                checked={pwdShow}
                                onChange={() => setPwdShow(!pwdShow)}
                                className='inupt-checked'
                            />
                            <label htmlFor="pwd" >{pwdShow ? 'hide' : 'show'}  password</label>
                        </div>
                        <div className="form-link">
                            <NavLink href="#" className="forgot-pass">Forgot password?</NavLink>
                        </div>

                        <div className="field button-field">
                            <button className='form-btn' type='submit'>Login</button>
                        </div>
                    </form>

                    <div className="form-link">
                        <span>Don't have an account? <NavLink to="/signup" className="link signup-link">Signup</NavLink></span>
                    </div>
                </div>
                <div className="line"></div>

                <div className="media-options">
                    <button className="field facebook">
                        <span className="google-img"><BsFacebook /></span>
                        <span>Login with Facebook</span>
                    </button>
                </div>

                <div className="media-options">
                    <button className="field google">
                        <img src="/assets/google.png" alt="" className="google-img" />
                        <span>Login with Google</span>
                    </button>
                </div>

            </div>
        </section> : <Loader />
    )
}

export default Login
