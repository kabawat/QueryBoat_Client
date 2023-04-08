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
export const chat_List = (payload) => {
    return {
        type: 'CHAT_LIST',
        payload
    }
}

// fetch chat 
export const fetch_chat = (payload) => {
    return {
        type: 'GET_CHAT',
        payload
    }
}

// store messge in localStorage 
export const store_message = (user, payload) => {
    return {
        type: 'STORE_MESSAGE',
        payload,
        user,
    }
}
// delete all massage 
export const delete_message = (payload) => {
    return {
        type: 'DELETE_MESSAGE',
        payload,
    }
}
export const delete_Current_Message = (payload) => {
    return {
        type: 'DELETE_CURRENT_MESSAGE',
        payload,
    }
}

// clean chat message 
export const clean_message = (payload) => {
    return {
        type: 'CLEAN_MESSAGE',
        payload
    }
}