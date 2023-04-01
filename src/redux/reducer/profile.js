const profile = {
    username: '',
    token: '',
    profile: ''
}
export const userProfile = (state = profile, action) => {
    if (action.type === 'PROFILE') {
        return {
            ...action.payload
        }
    }
    return state
} 