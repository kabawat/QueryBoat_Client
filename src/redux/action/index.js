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

// mobile aside show hide 
export const isMobileActive = (payload) => {
    return {
        type: 'IS_MOBILE_ASIDE',
        payload
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

// store messge in localStorage 
export const recive_message = (payload) => {
    return {
        type: 'RECEIVE_MESSAGE',
        payload,
    }
}
