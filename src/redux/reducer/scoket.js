import io from 'socket.io-client'

const url = `https://queryboat-api.onrender.com` 
// const url = 'http://localhost:2917'

export const BaseUrl = (state = url, action) => {
    return state
}

// socket  handler 
const socketInit = io(url)
const socket = (state = socketInit, action) => {
    return state
}
export default socket

// contact list 
export const contactlist = (state = [], action) => {
    if (action.type === 'CONTACT_LIST') {
        return action.payload
    }
    return state
}

// chat list 
export const chatList = (state = null, action) => {
    if (action.type === 'CHAT_LIST') {
        return action.payload
    }
    return state
}

// current chat 
const data = {
    email: '',
    contact: '',
    image: '',
    chatID: ''
}
export const curChat = (state = data, action) => {
    if (action.type === 'CURRENT_CHAT') {
        return action.payload
    }
    return state
}

