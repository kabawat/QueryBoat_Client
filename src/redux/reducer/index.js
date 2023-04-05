import { combineReducers } from "redux";
import { asideAction } from "./hideShow";
import { userProfile } from "./profile";
import socket, { BaseUrl, chatList } from './scoket'
const rootReducer = combineReducers(
    {
        BaseUrl,
        userProfile,
        asideAction,
        socket,
        chatList
    }
);
export default rootReducer;