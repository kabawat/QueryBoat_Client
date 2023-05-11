const chatMessage = (state = [], action) => {
    if (action.type === 'RECEIVE_MESSAGE') {
        return action?.payload
    }
    return state
}
export default chatMessage