export const myProfile = (payload) => {
    return {
        type: 'PROFILE',
        payload,
    }
}

export const storyMode = (payload) => {
    return {
        type: 'STORY_MODE',
        payload,
    }
}

// chatting 
// current-Chat
export const currentChat = (payload) => {
    return {
        type: 'GET_CHAT',
        payload
    }
}

// chat contact list 
