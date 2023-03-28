import React from 'react'
import { NavLink, } from 'react-router-dom'
import "../style.css"
import { BsFacebook } from 'react-icons/bs'
const Login = () => {
    return (
        <section class="container forms">
            <div class="form login">
                <div class="form-content">
                    <div className='form-heading'>Login</div>
                    <form id='login'>
                        <div class="field input-field">
                            <input type="email" placeholder="Email" class="input" />
                        </div>

                        <div class="field input-field">
                            <input type="password" placeholder="Password" class="password" />
                            <i class='bx bx-hide eye-icon'></i>
                        </div>

                        <div class="form-link">
                            <NavLink href="#" class="forgot-pass">Forgot password?</NavLink>
                        </div>

                        <div class="field button-field">
                            <button className='form-btn'>Login</button>
                        </div>
                    </form>

                    <div class="form-link">
                        <span>Don't have an account? <NavLink to="/signup" class="link signup-link">Signup</NavLink></span>
                    </div>
                </div>
                <div class="line"></div>

                <div class="media-options">
                    <a href="/assets/facebook.webp" class="field facebook">
                        <span class="google-img"><BsFacebook /></span>
                        <span>Login with Facebook</span>
                    </a>
                </div>

                <div class="media-options">
                    <a href="#" class="field google">
                        <img src="/assets/google.png" alt="" class="google-img" />
                        <span>Login with Google</span>
                    </a>
                </div>

            </div>
        </section>
    )
}

export default Login
