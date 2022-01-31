import Axios from '../../hoc/axios';
import { toast } from 'react-toastify';
import * as actionTypes from '../Actions/types';
import base64 from 'react-native-base64';
import AES256 from 'aes-everywhere';
const $ = window.$;

const parsingData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase?.substr(0, 4);
    let val2 = passphrase?.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const encrypted = AES256.encrypt(JSON.stringify(data), finalvalue);
    return encrypted;
}

const extractData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase?.substr(0, 4);
    let val2 = passphrase?.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const decrypted = JSON.parse(AES256.decrypt(data, finalvalue));
    return decrypted;
}

// SEND OTP NEW CUSTOMER VCIP GENERATOR
export const SendOtpVcipAction = (URL, model, $this) => {
    return (dispatch) => {
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            mobile: model.mobile,
            ref1: "",
            rrn: Math.floor(Math.random() * 100).toString(),
            sid: "11",
            env: "3",
            ppoid: "14129",
            treasury_code: "1891",
            bankacc_no: "123456",
        }
        parsingData(body)
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $this.setState({
                        spinner: false,
                        status: true,
                        timerStat: true,
                        time: 120
                    });
                    toast.success(resp.respdesc);
                    sessionStorage.setItem("vcipid", resp.vcipid);
                    document.getElementById("contactNum").reset();
                    $('#contactNum').addClass('block-disabled');
                    $('#otp').focus();
                    // $this.setState({
                    //     status: true
                    // });
                } else if (resp.respcode === "201") {
                    $this.setState({
                        spinner: false
                    });
                    toast.success(resp.respdesc);
                    sessionStorage.removeItem("mobile")
                    sessionStorage.setItem("vcipid", resp.vcipid);
                    // sessionStorage.setItem("width", "0%");
                    // sessionStorage.setItem("step", 1);
                    // $this.push("/start");
                    // $('#newId').modal('show');
                    // $('#newId').modal({
                    //     keyboard: false
                    // });
                    // dispatch({
                    //     type: actionTypes.NEWID,
                    //     payload: resp.vcipid
                    // });
                    const url = "ValidateVCIPID";
                    const modelcum = {
                        vcipid: model.mobile,
                        custip: $this.state.ip,
                        custloc: $this.state.lat + "," + $this.state.long,
                        ref1: model.ref1,
                        ref2: model.ref2
                    }
                    dispatch(ExistUserAction2(url, modelcum, $this))
                } else {
                    toast.warn(resp.respdesc);
                    $this.setState({
                        spinner: false
                    });
                }
            })
            .catch(err => {
                $this.setState({
                    spinner: false
                });
                toast.error("Error in Send OTP");
            })
    }
}

// VERIFY MOBILE OTP
export const VerifyMobileOtpAction = (URL, model, $this) => {
    return (dispatch) => {
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            mobile: model.mobile,
            otp: model.otp,
            custip: model.custip,
            custloc: model.custloc,
            env: "3",
            ref1: model.ref1,
            ref2: model.ref2
        }
        // console.log(body, "verify");
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $this.setState({
                        spinnerOtp: false
                    });
                    toast.success(resp.respdesc);
                    sessionStorage.removeItem("mobile")
                    sessionStorage.setItem("vcipid", resp.vcipid);
                    // sessionStorage.setItem("width", "0%");
                    // sessionStorage.setItem("step", 1);
                    // $this.push("/start");
                    // $('#newId').modal('show');
                    $('#newId').modal({
                        keyboard: false
                    });
                    dispatch({
                        type: actionTypes.NEWID,
                        payload: resp.vcipid
                    });
                } else {
                    toast.warn(resp.respdesc);
                    $this.setState({
                        spinnerOtp: false
                    });
                }
            })
            .catch(err => {
                $this.setState({
                    spinnerOtp: false
                });
                toast.error("Error in VCIP ID Generator");
            })
    }
}

// FOR NEW CUSTOMER VCIP GENERATOR BASED ON OTP
export const GenerateAction = (URL, model, $this) => {
    return (dispatch) => {
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            mobile: model.mobile,
            email: "",
            custip: model.custip,
            custloc: model.custloc,
            env: "3",
            ref1: "",
            ref2: ""
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    sessionStorage.setItem("vcipid", resp.vcipid);
                    // sessionStorage.setItem("width", "0%");
                    // sessionStorage.setItem("step", 1);
                    // $this.push("/start");
                    $('#newId').modal('show');
                    $('#newId').modal({
                        keyboard: false
                    });
                    dispatch({
                        type: actionTypes.NEWID,
                        payload: resp.vcipid
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                toast.error("Error in VCIP ID Generator");
            })
    }
}


// FOR VALIDATING EXISTING VCIP ID
export const ExistUserAction = (URL, model, $this) => {
    return (dispatch) => {
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: model.vcipid,
            custip: model.custip,
            custloc: model.custloc,
            env: "3",
            ref1: model.ref1,
            ref2: model.ref2
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $this.setState({
                        spinner: false
                    });
                    sessionStorage.setItem("vcipid", resp.vcipid);
                    toast.success(resp.respdesc);
                    // $this.props.history.replace("/start");
                    if (resp.kycstatus === "0") {
                        sessionStorage.setItem("width", "28%");
                        sessionStorage.setItem("step", 2);
                        const stage = {
                            height: "28%",
                            step: 2
                        };
                        dispatch(StageUpdateAction(stage));
                        $this.props.history.replace("/start");
                    } else if (resp.kycstatus === "1" && resp.panstatus === "0") {
                        sessionStorage.setItem("width", "51%");
                        sessionStorage.setItem("step", 3);
                        const stage1 = {
                            height: "51%",
                            step: 3
                        };
                        dispatch(StageUpdateAction(stage1));
                        $this.props.history.replace("/pan");
                    } else if (resp.kycstatus === "1" && resp.panstatus === "1") {
                        if (resp.videoconfstatus === "3") {
                            sessionStorage.setItem("width", "100%");
                            sessionStorage.setItem("step", 5);
                            const stage3 = {
                                height: "100%",
                                step: 5
                            }
                            dispatch(StageUpdateAction(stage3));
                            $this.props.history.replace("/end");
                        } else {
                            sessionStorage.setItem("width", "76%");
                            sessionStorage.setItem("step", 4);
                            const stage2 = {
                                height: "76%",
                                step: 4
                            }
                            dispatch(StageUpdateAction(stage2));
                            $this.props.history.replace("/video-chat");
                        }
                    }
                } else {
                    toast.error(resp.respdesc);
                    $this.setState({
                        spinner: false,
                        existingUser: true,
                    });

                    const url = "VerifyMobileOTP";
                    const verifymodel = {
                        otp: "1234567",
                        mobile: model.vcipid,
                        custip: "0.0.0.0",
                        custloc: "17.387140" + "," + "78491684",
                        ref1: model.ref1,
                        ref2: model.ref2
                    };
                    // const $this = this;
                    // this.props.VerifyMobileOtpAction(url, model, $this);
                    dispatch(VerifyMobileOtpAction(url, verifymodel, $this));


                }
            })
            .catch(err => {
                $this.setState({
                    spinner: false,
                    existingUser: true,
                });
                const url = "VerifyMobileOTP";
                const veirfymodel = {
                    otp: "1234567",
                    mobile: model.vcipid,
                    custip: "0.0.0.0",
                    custloc: "17.387140" + "," + "78491684",
                    ref1: model.ref1,
                    ref2: model.ref2
                };
                // const $this = this;
                // this.props.VerifyMobileOtpAction(url, model, $this);
                dispatch(VerifyMobileOtpAction(url, veirfymodel, $this))


                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// FOR VALIDATING EXISTING VCIP ID
export const ExistUserAction2 = (URL, model, $this) => {
    return (dispatch) => {
        // var key = "f379e0b661ae4650b19169e4d93665dc";
        // var cipher = aes256.createCipher(key);
        // var encrypted = cipher.encrypt(JSON.stringify(body));

        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: model.vcipid,
            custip: model.custip,
            custloc: model.custloc,
            env: "3",
            ref1: model.ref1,
            ref2: model.ref2
        }
        console.log(body, 'exist action2')
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    // $this.setState({
                    //     spinner: false
                    // });
                    sessionStorage.setItem("vcipid", resp.vcipid);
                    toast.success(resp.respdesc);
                    // $('#newId').modal('show');
                    $('#newId').modal({
                        keyboard: false
                    });
                    dispatch({
                        type: actionTypes.NEWID,
                        payload: resp.vcipid
                    });
                } else {
                    toast.warn(resp.respdesc);
                    $this.setState({
                        spinner: false
                    });
                }
            })
            .catch(err => {
                $this.setState({
                    spinner: false
                });
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// FOR INSTRUCTIONS CONTENT
export const GetContentAction = () => {
    return (dispatch) => {
        const URL = "GetConsents";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    // debugger
                    // toast.success(resp.respdesc);
                    let encodedText = resp.consents;
                    // let val = base64.decode(encodedText)
                    // // var jsonStr = val.replace(/(\w+:)|(\w+ :)/g, (matchedStr) => {
                    // //     return '' + matchedStr.substring(0, matchedStr.length - 1) + '$';
                    // // });
                    // var test = val.split("$")
                    // const textDecode = JSON.parse(test);
                    dispatch({
                        type: actionTypes.CONTENT,
                        payload: encodedText
                    });
                    // $this.push("/start");
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


// FOR UPDATE USER ONLINE STATUS
export const UpdateOnlineAction = () => {
    return (dispatch) => {
        const URL = "UpdateCustomerOnlineStatus";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            isonline: "y"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                // if (resp.respcode === "200") {
                //     // toast.success(resp.respdesc);
                // } else {
                //     // toast.warn(resp.respdesc);
                // }
            })
            .catch(err => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// GET NOTIFICATION FROM THE BANKER
export const GetNotificationAction = () => {
    return (dispatch) => {
        const URL = "GetNotifications";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            // vcipid: sessionStorage.getItem("vcipid"),
            vcipid: sessionStorage.getItem("vcipid"),
            userid: "0"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    if (resp.notificationid === "1") {
                        dispatch(GetSingleQuestion(resp.notifications))
                        // resp.notifications.map((notification) => {
                        //     // return toast.success(notification.notifymsg)
                        //     // console.log(notification);                            
                        //     dispatch(GetSingleQuestion(notification))
                        // });
                    } else if (resp.notificationid === "2") {
                        dispatch({
                            type: actionTypes.ENDVIDEOCALL,
                            payload: "2"
                        });
                        toast.success(resp.notifications);
                    }
                } else {
                    // toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}

// ACTION TO GET SINGLE QUESTION FRO THE LIST OF QUESTION
export const GetSingleQuestion = (id) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SINGLEQUESTION,
            payload: id
        });
    }
}


// GET NOTIFICATION FROM THE BANKER
export const SendOtpAction = (model, $this) => {
    return (dispatch) => {
        const URL = "GenerateKycOTP";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            aadhaar: model.adrno,
            otptype: model.otptype,
            sid: "4",
            rrn: Math.floor(Math.random() * 100).toString()
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $this.setState({
                        spinner: false,
                        status: true
                    });
                    toast.success(resp.respdesc);
                    sessionStorage.setItem("kycotptxnid", resp.kycotptxnid)
                    $this.setState({
                        status: true,
                        aadharPattern: ''
                    });
                    $('#aadhaarblobk').addClass('block-disabled');
                    $("#aadhaarotpnunmber").focus();
                } else {
                    $this.setState({
                        spinner: false
                    });
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                $this.setState({
                    spinner: false
                });
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// OTP BASED KYC
export const OtpKycAction = (otp, $this) => {
    return (dispatch) => {
        const URL = "DoKycOTP";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            aadhaar: sessionStorage.getItem("aadhaar"),
            sid: "5",
            kycotptxnid: sessionStorage.getItem("kycotptxnid"),
            kycotp: otp,
            rrn: Math.floor(Math.random() * 100).toString()
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    document.getElementById("aadhaarotpp").reset();
                    $this.setState({
                        spinner1: false,
                        backDisbale: true
                    });
                    toast.success(resp.respdesc);
                    sessionStorage.removeItem("kycotptxnid");
                    sessionStorage.removeItem("aadhaar");
                    dispatch({
                        type: actionTypes.AADHAAR,
                        payload: resp.kycdetails
                    });
                    $this.setState({
                        otpStatus: true,
                        otpNumber: ''
                    });
                    $('#aadhaarotpp').addClass('block-disabled');
                } else {
                    toast.warn(resp.respdesc);
                    $this.setState({
                        spinner1: false
                    });
                }
            })
            .catch(err => {
                $this.setState({
                    spinner1: false
                });
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// XML OFFLINE KYC AADHAAR
export const XmlKycAction = (model, $this) => {
    return (dispatch) => {
        const URL = "DoOfflineKycXML";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            data: model.data,
            sharecode: model.sharecode,
            sid: "2",
            rrn: Math.floor(Math.random() * 100).toString()
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $('#xml').modal('hide');
                    toast.success(resp.respdesc);
                    dispatch({
                        type: actionTypes.KYCINFO,
                        payload: resp
                    });
                    $('#xmlInfo').modal('show');
                    // $('#xmlInfo').modal({
                    //     keyboard: false
                    // });
                    // $this.setState({
                    //     otpStatus: true,
                    //     otp: ''
                    // });
                } else {
                    $('#xml').modal('hide');
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                $this.setState({
                    spinner: false
                });
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}

// PDF OFFLINE KYC AADHAAR
export const PdfKycAction = (model, $this) => {
    return (dispatch) => {
        const URL = "DoOfflineKycPdf";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            data: model.data,
            sid: "3",
            pwd: model.pwd,
            rrn: Math.floor(Math.random() * 100).toString()
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $this.setState({
                        spinner: false
                    });
                    toast.success(resp.respdesc);
                    dispatch({
                        type: actionTypes.KYCINFO,
                        payload: resp
                    });
                    $('#xmlInfo').modal('show');
                    $('#xmlInfo').modal({
                        keyboard: false
                    });
                    // $this.setState({
                    //     otpStatus: true,
                    //     otp: ''
                    // });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                $this.setState({
                    spinner: false
                });
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// PAN OCR
export const PanOcrAction = (model, $this) => {
    return (dispatch) => {
        const URL = "GetPANOCR";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            panimage: model.imgPath,
            sid: "6",
            pwd: model.password,
            rrn: Math.floor(Math.random() * 100).toString()
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $this.setState({
                        spinner: false,
                        // edtname: resp.pandetails.name,
                        // edtfname: resp.pandetails.fname,
                        // edtdob: resp.pandetails.dob,
                        // edtpannumber: resp.pandetails.pannumber
                    });
                    toast.success(resp.respdesc);
                    dispatch({
                        type: actionTypes.PANINFO,
                        payload: resp.pandetails
                    });
                    var date = resp.pandetails.dob;
                    var newdate = date.split("/").reverse().join("-");
                    $this.setState({
                        status: true,
                        btnDisabled: false,
                        newdate: newdate
                    })
                } else {
                    toast.warn(resp.respdesc);
                    $this.setState({
                        spinner: false
                    });
                }
            })
            .catch(err => {
                $this.setState({
                    spinner: false
                });
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}



// TO SAVE EDITED PAN DETAILS
export const SavePanDataAction = (model, $this) => {
    return (dispatch) => {
        const URL = "SavePanData";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            vcipid: sessionStorage.getItem("vcipid"),
            userid: "0",
            edtname: model.edtname,
            edtfname: model.edtfname,
            edtdob: model.edtdob,
            edtpannumber: model.edtpannumber
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    // if (model.pannumber) {
                    //     toast.success(resp.respdesc);
                    // } else {
                    //     $this.setState({
                    //         spinner: false
                    //     });
                    //     $('#panmodal').modal('show');
                    //     setTimeout(() => {
                    //         $('#panmodal').modal('hide');
                    //         sessionStorage.setItem("width", "76%");
                    //         sessionStorage.setItem("step", 4);
                    //         const stage = {
                    //             height: "76%",
                    //             step: 4
                    //         }
                    //         dispatch(StageUpdateAction(stage));
                    //         $this.props.history.push('/video-chat');
                    //     }, 3000);
                    //     toast.success(resp.respdesc);
                    // }
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                $this.setState({
                    spinner: false
                });
                const val = JSON.stringify(err);
                toast.error(JSON.parse(val).message);
            })
    }
}


// TO VERIFY PAN DETAILS //remove this
export const VerifyPanAction = (model, $this) => {
    return (dispatch) => {
        const URL = "VerifyPANNumber";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            vcipid: sessionStorage.getItem("vcipid"),
            pannumber: model,
            sid: "7",
            rrn: Math.floor(Math.random() * 100).toString()
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $this.setState({
                        spinner: false
                    });
                    var panData = {
                        ispanvalid: resp.ispanvalid,
                        panname: resp.panname,
                        pannumber: resp.pannumber
                    }
                    dispatch({
                        type: actionTypes.PANDATA,
                        payload: panData
                    });
                    $('#panDataId').modal({
                        keyboard: false,
                        // backdrop: false
                    })
                    $('#panDataId').modal('show');
                    // $('#panmodal').modal('show');
                    // setTimeout(() => {
                    //     $('#panmodal').modal('hide');
                    //     sessionStorage.setItem("width", "76%");
                    //     sessionStorage.setItem("step", 4);
                    //     const stage = {
                    //         height: "76%",
                    //         step: 4
                    //     }
                    //     dispatch(StageUpdateAction(stage));
                    //     $this.props.history.replace('/video-chat');
                    // }, 3000);
                    toast.success(resp.respdesc);
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



// PUSH NOTIFICATION FORM THE AGENT
export const PushNotificationAction = (model) => {
    return (dispatch) => {
        const URL = "PushNotifications";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            vcipid: sessionStorage.getItem("vcipid"),
            notificationid: model.id,
            notifymsg: model.msg,
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    // console.log(resp);
                    // dispatch({
                    //     type: actionTypes.QUESTIONS,
                    //     payload: resp.questions
                    // });
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



// STAGES UPDATE
export const StageUpdateAction = (modal) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.STAGE,
            payload: modal
        })
    }
}



// TTO GET LACATION BASED ON THE LAT AND LONG
export const LocationAction = (model) => {
    return (dispatch) => {
        const url = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + model.lat + "&longitude=" + model.long;
        Axios.get(url)
            .then(res => {
                // console.log(res)
                // debugger
                // if (res.status === 200) {
                // var cityName;
                // if (res.city || res.city !== null || res.city !== undefined) {
                //     cityName = res.city;
                // } else {
                //     cityName = res.locality;
                // }
                const data =
                    (res.data.city ? res.data.city : res.data.locality)
                    + ", " + res.data.principalSubdivision
                    + ", " + res.data.countryName
                dispatch({
                    type: actionTypes.LOCATION,
                    payload: data
                });
                // }
            })
            .catch(err => {
                toast.error("Error in location");
            })
    }
}

//  store capture photo
export const GetCapturePhoto = (photo) => {
    // console.log(photo, 'gend')
    return (dispatch) => {
        dispatch({
            type: actionTypes.CAPTUREPHOTO,
            payload: photo
        });
    }
}