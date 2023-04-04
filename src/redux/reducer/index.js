import { combineReducers } from "redux";
import { asideAction } from "./hideShow";
import { userProfile } from "./profile";
import socket, { BaseUrl } from './scoket'
const rootReducer = combineReducers(
    {
        BaseUrl,
        userProfile,
        asideAction,
        socket
    }
);
export default rootReducer;