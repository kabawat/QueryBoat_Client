import { combineReducers } from "redux";
import { asideAction } from "./hideShow";
import { userProfile } from "./profile";
import socket, { BaseUrl, contactlist, chatList, curChat } from './scoket'
const rootReducer = combineReducers(
    {
        BaseUrl,
        userProfile,
        asideAction,
        socket,
        contactlist,
        chatList,
        curChat
    }
);
export default rootReducer;