import React from 'react'
import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { AiOutlineGithub } from 'react-icons/ai'
import { useFormik } from 'formik'
const Login = () => {
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: value => handleFormSubmit(value)
    })
    const handleFormSubmit = (value) => {
        
    }
    return (
        <form className="form" id="b-form" onSubmit={handleSubmit} >
            <h2 className="form_title title">Sign in to Website</h2>
            <div className="form__icons">
                <button className='form__icon' type='button'><BsGoogle /></button>
                <button className='form__icon' type='button'><FaFacebookF /></button>
                <button className='form__icon' type='button'><AiOutlineGithub /></button>
            </div>
            <span className="form__span">or use your email account</span>
            <input className="form__input" name='email' value={values.email} onChange={handleChange} type="text" autoComplete="true" placeholder="Email" />
            <input className="form__input" name='password' value={values.password} onChange={handleChange} autoComplete="current-password" type="password" placeholder="Password" />
            <a href='/' className="form__link">Forgot your password?</a>
            <button type='submit' className="form__button button submit">SIGN IN</button>
        </form>
    )
}
export default Login