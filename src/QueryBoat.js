import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/from/login'
import Signup from './page/from/signup'
import Home from './page/Home'
import { Container } from './w3chat.style'


const QueryBoat = () => {
    return (
        <Container>
            <BrowserRouter basename='/'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </Container>
    )
}

export default QueryBoat
