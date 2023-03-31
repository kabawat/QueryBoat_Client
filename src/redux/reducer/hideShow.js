export const asideAction = (state = true, action) => {
    if (action.type === 'STORY_MODE') {
        return action.payload
    }
    return state
}
export const BaseUrl = (state = 'https://queryboat-api.onrender.com', action) => {
    return state
}   