import { combineReducers } from "redux";
import { asideAction, asideMobile } from "./hideShow";
import { userProfile } from "./profile";
import socket, { BaseUrl, contactlist, chatList, curChat, chatUrl } from './scoket'
import chatMessage from './chating'
const rootReducer = combineReducers(
    {
        BaseUrl,
        chatUrl,
        userProfile,
        asideAction,
        asideMobile,
        socket,
        contactlist,
        chatList,
        curChat,
        chatMessage,
    }
);
export default rootReducer;