const profile = {}
const myProfile = (state = profile, action) => {
    if (action.type === 'PROFILE') {
        return {
            profile: action.payload
        }
    }
    return state
}
export default myProfile