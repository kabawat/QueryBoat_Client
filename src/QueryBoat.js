import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auths from './page/auth'
import Home from './page/Home'


const QueryBoat = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<Auths />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default QueryBoat
