import { combineReducers } from "redux";
import { asideAction } from "./hideShow";
import myProfile from "./userProfile";
const rootReducer = combineReducers(
    {
        myProfile,
        asideAction,
    }
);
export default rootReducer;