export const asideAction = (state = true, action) => {
    if (action.type === 'STORY_MODE') {
        return action.payload
    }
    return state
}
// const url = `https://queryboat-api.onrender.com`
const url = 'http://localhost:2917'
export const BaseUrl = (state = url, action) => {
    return state
}   