export const asideAction = (state = true, action) => {
    if (action.type === 'STORY_MODE') {
        return action.payload
    }
    return state
}
