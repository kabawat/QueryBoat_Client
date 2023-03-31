import { combineReducers } from "redux";
import { asideAction, BaseUrl } from "./hideShow";
import myProfile from "./userProfile";
const rootReducer = combineReducers(
    {
        myProfile,
        asideAction,
        BaseUrl
    }
);
export default rootReducer;