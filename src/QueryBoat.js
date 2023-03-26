import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auths from './page/auth'
import Home from './page/Home'
import { Container } from './w3chat.style'


const QueryBoat = () => {
    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path='/auth' element={<Auths />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </Container>
    )
}

export default QueryBoat
