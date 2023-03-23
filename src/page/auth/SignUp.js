import React, { useState } from 'react'
import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { AiOutlineGithub } from 'react-icons/ai'
import { useFormik } from 'formik'
const SignUp = () => {
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: value => handleSubmitForm(value)
    })
    const handleSubmitForm = (value) => {

    }

    const [isVerify, setIsVerify] = useState(false)
    const handleVerify = () => {
        setIsVerify(true)
    }
    return (
        <form className="form" id="a-form" onSubmit={handleSubmit}>
            <h2 className="form_title title">Create Account</h2>
            <div className="form__icons">
                <button className='form__icon' type='button'><BsGoogle /></button>
                <button className='form__icon' type='button'><FaFacebookF /></button>
                <button className='form__icon' type='button'><AiOutlineGithub /></button>
            </div>
            {
                !isVerify ? <>
                    <span className="form__span">Verify your email</span>
                    <input className="form__input" type="email"
                        name='verifyEmail'
                        placeholder="email"
                        autoComplete="current-email"
                    />
                    <button className="form__button button submit" type='button' onClick={handleVerify}>Verify</button>
                </> :
                    <>
                        <span className="form__span">or use email for registration</span>
                        <input className="form__input" type="text"
                            name='name'
                            placeholder="Name"
                            value={values.name}
                            autoComplete="current-name"
                            onChange={handleChange}
                        />
                        <input className="form__input" type="password"
                            name='password'
                            placeholder="Password"
                            value={values.password}
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <button className="form__button button submit" type='submit'  >SIGN UP</button>
                    </>
            }
        </form>
    )
}
export default SignUp