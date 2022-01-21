// import Home from "./View/Home/Home";
import Aadhar from "./View/Forms/Aadhar/Aadhar";
import PAN from "./View/Forms/PAN/PAN";
import Start from "./View/Forms/Start/Start";
import VideoKYC from "./View/Forms/VideoKYC/VideoKYC";
import VideoChat from "./View/Forms/VideoChat/VideoChat";
// import Video from "./View/OpenVidu/Video/Video";
// import ChatApp from "./View/OpenVidu/ChatApp";
import User from "./View/Forms/User/User";
import Passport from "./View/Forms/Aadhar/Passport";
import End from "./View/End/End";
import ChatAppMobile from "./View/OpenVidu/ChatAppMobile";
import Reschedule from "./View/Forms/Reschedule/Reschedule";
import Clear from "./View/Clear/Clear";
import RescheduleMobile from "./View/Forms/Reschedule/RescheduleMobile";

const routes = [
    // { path: "/", exact: true, name: 'Home', component: Home },
    { path: "/", strict: true, exact: true, name: 'User', component: User },
    { path: "/start", strict: true, exact: true, name: 'Start', component: Start },
    { path: "/aadhaar", strict: true, exact: true, name: 'Aadhar', component: Aadhar },
    { path: "/passport", strict: true, exact: true, name: 'Passport', component: Passport },
    { path: "/pan", strict: true, exact: true, name: 'PAN', component: PAN },
    { path: "/video-kyc", strict: true, exact: true, name: 'VideoKYC', component: VideoKYC },
    { path: "/video", strict: true, exact: true, name: 'VideoChat', component: VideoChat },
    // { path: "/video-chat", strict: true, exact: true, name: 'Video', component: ChatApp },
    { path: "/video-chat", strict: true, exact: true, name: 'Video', component: Reschedule },
    { path: "/schedule", strict: true, exact: true, name: 'Reschedule', component: Reschedule },
    // { path: "/videochat/:id", strict: true, exact: true, name: 'Video', component: ChatAppMobile },
    { path: "/videochat/:id", strict: true, exact: true, name: 'Video', component: RescheduleMobile },
    { path: "/end", strict: true, exact: true, name: 'End', component: End },
    { path: "/reset", strict: true, exact: true, name: 'Clear', component: Clear },
];

export default routes;