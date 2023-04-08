const chatMessage = (state = [], action) => {
    const chat = localStorage.getItem('curUser')
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

    // delete individual chat 
    if (action.type === 'DELETE_MESSAGE') {
        localStorage.removeItem([action?.payload])
    }

    // clean all Message 
    if (action.type === 'CLEAN_MESSAGE') {
        localStorage.removeItem([action?.payload])
        if (chat === action?.payload) {
            return []
        }
    }

    // delete individual message from current chat 
    if (action?.type === 'DELETE_CURRENT_MESSAGE') {
        const oldChat = JSON.parse(localStorage.getItem([chat]))
        const newChat = oldChat.filter(item => {
            if (new Date(item?.time).getTime() !== new Date(action?.payload).getTime()) {
                return item
            }
        })
        localStorage.setItem([chat], JSON.stringify(newChat))
        return newChat
    }
    return chat ? JSON.parse(localStorage.getItem([chat])) : state
}
export default chatMessage