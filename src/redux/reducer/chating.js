const chatMessage = (state = [], action) => {
    if (action.type === 'GET_CHAT') {
        const data = JSON.parse(localStorage.getItem([action?.payload]))
        return data
    }
    if (action.type === 'STORE_MESSAGE') {
        const oldData = JSON.parse(localStorage.getItem([action?.user]))
        if (oldData) {
            localStorage.setItem([action.user], JSON.stringify([...oldData, action?.payload]))
        } else {
            localStorage.setItem([action.user], JSON.stringify([action?.payload]))
        }
        const chat = localStorage.getItem('curUser')
        return JSON.parse(localStorage.getItem([chat]))
    }
    return state
}
export default chatMessage

export const CurChatMessage = (state = [], action) => {
    if (action.type === 'GET_CHAT') {
        const data = JSON.parse(localStorage.getItem([action?.payload]))
        return data
    }
}