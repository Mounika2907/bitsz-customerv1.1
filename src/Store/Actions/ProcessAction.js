
import Axios from '../../hoc/axios';
// import aes256 from 'aes256';
import { toast } from 'react-toastify';
import * as actionTypes from '../Actions/types';
import base64 from 'react-native-base64';
import AES256 from 'aes-everywhere';
const $ = window.$;

const parsingData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase.substr(0, 4);
    let val2 = passphrase.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const encrypted = AES256.encrypt(JSON.stringify(data), finalvalue);
    return encrypted;
}

const extractData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase.substr(0, 4);
    let val2 = passphrase.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const decrypted = JSON.parse(AES256.decrypt(data, finalvalue));
    return decrypted;
}

const getVcipid = sessionStorage.getItem("vcipid");

// GET QUESTIONS FROM THE BANKER
export const GetVcipStatusAction = () => {
    return (dispatch) => {
        const URL = "GetVCIPIDStatuses";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    sessionStorage.setItem("videoconfstatus", resp.videoconfstatus);
                    sessionStorage.setItem("isscheduled", resp.isscheduled);
                    dispatch({
                        type: actionTypes.STATUSES,
                        payload: resp
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// GET QUESTIONS FROM THE BANKER
export const GetQuestionsAction = () => {
    return (dispatch) => {
        const URL = "GetQuestions";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            // quesid: "1"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    // console.log(resp.questions);    
                    // const qtns = resp.questions
                    // qtns.sort((a, b) => {
                    //     return parseInt(a.quesid) - parseInt(b.quesid);
                    // });          
                    dispatch({
                        type: actionTypes.QUESTIONS,
                        payload: resp.questions
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// InitiateVideoConferenceQueue
export const InitiateConferenceQueueAction = (lang) => {
    return (dispatch) => {
        const URL = "InitiateVideoConferenceQueue";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            langid: lang
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                // console.log(resp);                
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    sessionStorage.setItem("videoconfsessionid", resp.videoconfsessionid);
                    const model = {
                        token: resp.tokennumber,
                        // vCSid: resp.videoconfsessionid,
                        isscheduled: resp.isscheduled,
                        tokenlimit: resp.tokenlimit,
                        videoconfsessionid: resp.videoconfsessionid,
                    };
                    dispatch({
                        type: actionTypes.QUEUE,
                        payload: model
                    });
                    if (resp.isscheduled === "1") {
                        dispatch(GetScheduleDetailsAction());
                    } else {
                        dispatch(GetCalenderAction(lang));
                    }
                } else if (resp.respcode === "427") {
                    dispatch({
                        type: actionTypes.QUEUEERROR,
                        payload: resp.respdesc
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(
                err => {
                    const val = JSON.stringify(err);
                    toast.error(JSON.parse(val).message);
                }
            )
    }
}

// UpdatedTokenNumbeAction
export const UpdatedTokenNumbeAction = () => {
    return (dispatch) => {
        const URL = "GetUpdatedVCIPIDTokenNumber";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            langid: "1"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                // console.log(resp);
                if (resp.respcode === "200") {
                    if (resp.tokennumber === "0") {
                        var audio = new Audio('.././assets/images/audio/tone.mp3');
                        audio.play();
                    }
                    const model = {
                        token: resp.tokennumber,
                        vCSid: resp.videoconfsessionid
                    }
                    dispatch({
                        type: actionTypes.QUEUE,
                        payload: model
                    });
                } else if (resp.respcode === "427") {
                    dispatch({
                        type: actionTypes.QUEUEERROR,
                        payload: resp.respdesc
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// GET LANGUAGES
export const GetLanguagesAction = () => {
    return (dispatch) => {
        const URL = "GetLanguages";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            // vcipid: sessionStorage.getItem("vcipid"),
            userid: "0"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    // console.log(resp.languages);
                    dispatch({
                        type: actionTypes.LANGAUGESLIST,
                        payload: resp.languages
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// GET CUSTOMER SCHEDULE DETAILS
export const GetScheduleDetailsAction = () => {
    return (dispatch) => {
        const URL = "GetVideoCallScheduleDetails";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            vcipid: sessionStorage.getItem("vcipid"),
            // userid: "0"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                // console.log("============ GetVideoCallScheduleDetails", resp);
                if (resp.respcode === "200") {
                    if (resp.joinstatus === "-1") {
                        toast.error(resp.respdesc);                        
                    }
                    const details = {
                        sdate: resp.sdate,
                        time: resp.ftime + " - " + resp.ttime,
                        joinstatus: resp.joinstatus
                    }
                    dispatch({
                        type: actionTypes.SCHEDULEDETAILS,
                        payload: details
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// GetVideoCallScheduleCalender
export const GetCalenderAction = (lang) => {
    return (dispatch) => {
        const URL = "GetVideoCallScheduleCalender";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            langid: lang
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    const model = {
                        sfdate: resp.sfdate,
                        stdate: resp.stdate,
                        stimes: resp.stimes
                    };
                    dispatch({
                        type: actionTypes.CALENDER,
                        payload: model
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// CreateVideoCallSchedule
export const CreateScheduleAction = (model, $this) => {
    return (dispatch) => {
        const URL = "CreateVideoCallSchedule";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            langid: model.langid,
            stime: model.stime,
            sdate: model.sdate
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);                
                dispatch(GetVcipStatusAction());
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    document.getElementById("rescheduleForm").reset();
                    dispatch(ResetRdrAction());
                    dispatch(GetScheduleDetailsAction());
                    $this.props.history.replace("/video-chat");
                } else {
                    $this.setState({
                        createScheduleStatus: true
                    });
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// CancelVideoCallSchedule
export const CancelScheduleAction = ($this) => {
    return (dispatch) => {
        const URL = "CancelVideoCallSchedule";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                dispatch(GetVcipStatusAction());
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    dispatch(ResetRdrAction());
                    // let lang = sessionStorage.getItem("langId") || "1";
                    dispatch(GetCalenderAction("1"));
                    $('#info').modal('show');   
                    // toast.success(resp.respdesc);
                    // $this.replace("/video-chat");
                    // setTimeout(async () => {
                    //     try {
                    //         const r = await $('#info').modal('show');
                    //     } catch (error) {

                    //     }

                    // }, 100);
                    // window.location.reload(true);
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}

// JOINING VIDEO CONFERENCE WITH SESSION ID
export const JoinVideoAction = () => {
    return (dispatch) => {
        const URL = "JoinVideoConferenceSessionID";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            usertype: "1",
            userid: "0"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// END VIDEO CONFERENCE WITH SESSION ID
export const EndVideoAction = () => {
    return (dispatch) => {
        const URL = "EndVideoConferenceSessionID";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            userid: "0"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}



// RESET ALL REDUCERES
export const ResetRdrAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESET,
            payload: undefined
        })
    }
}
