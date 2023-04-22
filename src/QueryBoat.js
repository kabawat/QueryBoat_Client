import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/from/login'
import Signup from './page/from/signup'
import Home from './page/Home'
import { Container } from './w3chat.style'
import ForgetPwd from './page/from/forget-password'

const QueryBoat = () => {
    return (
        <Container>
            <BrowserRouter basename='/'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/forgot-password' element={<ForgetPwd />} />
                </Routes>
            </BrowserRouter>
        </Container>
    )
}

export default QueryBoat
