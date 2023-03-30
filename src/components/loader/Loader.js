import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { Loader_Container } from './style'

const Loader = () => {
    return (
        <Loader_Container>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </Loader_Container>
    )
}

export default Loader
