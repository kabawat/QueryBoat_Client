export const asideAction = (state = true, action) => {
    if (action.type === 'STORY_MODE') {
        return action.payload
    }
    return state
}

export const asideMobile = (state = true, action) => {
    if (action.type === 'IS_MOBILE_ASIDE') {
        return action.payload
    }
    return state
}