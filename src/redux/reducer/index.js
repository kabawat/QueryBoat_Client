import { combineReducers } from "redux";
import { asideAction, BaseUrl } from "./hideShow";
import { userProfile } from "./profile";
const rootReducer = combineReducers(
    {
        BaseUrl,
        userProfile,
        asideAction,
    }
);
export default rootReducer;