export const userProfile = (payload) => {
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
export const RUserProfile = (payload) => {
    return {
        type: "RECEIVER_PROFILE",
        payload
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
export const contactList = (payload) => {
    return {
        type: 'CHAT_CONTACT',
        payload
    }
}

// current chatting data 
export const chatData = (payload) => {
    return {
        type: 'CHATING',
        payload,
    }
}

// delete massage one by one 
export const deleteMsg = (payload) => {
    return {
        type: 'DELETE_MSG',
        payload,
    }
}

// delete chat 
export const deleteChat = (payload) => {
    return {
        type: 'DELETE_CHAT',
        payload,
    }
}

// new chat contact 
export const newChatUser = (payload) => {
    return {
        type: "NEW_CHAT",
        payload
    }
}