import React from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { LoaderContainer } from './style'

const Loader = () => {
    return (
        <LoaderContainer>
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
        </LoaderContainer>
    )
}

export default Loader
