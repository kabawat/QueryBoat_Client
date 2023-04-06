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
        type: 'CURRENT_CHAT',
        payload
    }
}

// chat contact list 
export const all_contact = (payload) => {
    return {
        type: 'CONTACT_LIST',
        payload
    }
}

// chat list handle 
export const chatList = (payload) => {
    return {
        type: 'CHAT_LIST',
        payload
    }
}