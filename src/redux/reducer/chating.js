const chatMessage = (state = [], action) => {
    if (action.type === 'GET_CHAT') {
        const data = JSON.parse(localStorage.getItem([action?.payload]))
        return data
    }
    // store message 
    if (action.type === 'STORE_MESSAGE') {
        const oldData = JSON.parse(localStorage.getItem([action?.user]))
        if (oldData) {
            localStorage.setItem([action.user], JSON.stringify([...oldData, action?.payload]))
        } else {
            localStorage.setItem([action.user], JSON.stringify([action?.payload]))
        }
    }
    // delete chat 
    if (action.type === 'DELETE_MESSAGE') {
        localStorage.removeItem([action?.payload])
    }
    const chat = localStorage.getItem('curUser')
    return chat ? JSON.parse(localStorage.getItem([chat])) : state
}
export default chatMessage