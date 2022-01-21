import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import pincodeRdr from "./PincodeReducer";
import PanRdr from "./UsersReducers/PanReducer";
import ChatReducer from "./UsersReducers/CustomerReducer";
import VideoReducer from "./UsersReducers/CustomerReducer";
import bitszReducer from './BitzsReducer/BitzsReducer';

const AllReducers = combineReducers({
    LoginReducer: LoginReducer,
    pincodeRdr: pincodeRdr,
    PanRdr: PanRdr,
    ChatReducer: ChatReducer,
    VideoReducer: VideoReducer,
    bitszReducer: bitszReducer
});

export default AllReducers;