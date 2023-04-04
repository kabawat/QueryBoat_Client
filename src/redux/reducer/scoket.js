import io from 'socket.io-client'

// const url = `https://queryboat-api.onrender.com`
const url = 'http://localhost:2917'

export const BaseUrl = (state = url, action) => {
    return state
}

// socket  handler 
const socketInit = io(url)
const socket = (state = socketInit, action) => {
    return state
}
export default socket
