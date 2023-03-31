export const asideAction = (state = true, action) => {
    if (action.type === 'STORY_MODE') {
        return action.payload
    }
    return state
}   
export const BaseUrl = (state = 'http://localhost:2917', action) => {
    return state
}   