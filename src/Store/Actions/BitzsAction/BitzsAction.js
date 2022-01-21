import Axios from '../../../hoc/axios';
import { toast } from 'react-toastify';
import * as actionTypes from '../../Actions/types';
import base64 from 'react-native-base64';
import AES256 from 'aes-everywhere';
const $ = window.$;

const parsingData = (data) => {
    try {
        var passphrase = process.env.REACT_APP_API_KEY;
        let val1 = passphrase?.substr(0, 4);
        let val2 = passphrase?.substr(passphrase.length, 4);
        let updatedValue = val1 + passphrase + val2;
        const finalvalue = base64.encode(updatedValue).substr(0, 32);
        const encrypted = AES256.encrypt(JSON.stringify(data), finalvalue);
        return encrypted;
    } catch (err) {
        console.log(err, 'action');
    }
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
export const GetKycOCR = (URL, model, $this) => {
    return (dispatch) => {
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            ref1image: model.front_aadhar_file_inbase64,
            ref2image: model.back_aadhar_file,
            sid: "18",
            doctype: "1",
            rrn: Math.floor(Math.random() * 100).toString()
        }

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
                    $('#aadharCompletemodal').modal('show');
                    setTimeout(() => {
                        $('#aadharCompletemodal').modal('hide');
                        sessionStorage.setItem("width", "38%");
                        sessionStorage.setItem("step", 3);
                        const stage = {
                            height: "38%",
                            step: 3
                        }
                        $this.props.StageUpdateAction(stage);
                        $this.props.$history.history.push('/pan');
                    }, 3000);


                    toast.success(resp.respdesc);
                    // $this.setState({
                    //     status: true
                    // });                          // take reference to update state and push to next page
                    // $this.props.$history.history
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
                toast.error("Error in Aadhaar Verification");
            })
    }
}
export const GetKycOCRPassport = (URL, model, $this) => {
    return (dispatch) => {
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            ref1image: model.passport,
            ref2image: "Na",
            sid: "19",
            doctype: "2",
            rrn: Math.floor(Math.random() * 100).toString()
        }
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
                    $('#aadharofflineCompletemodal').modal('show');
                    setTimeout(() => {
                        $('#aadharofflineCompletemodal').modal('hide');
                        sessionStorage.setItem("width", "38%");
                        sessionStorage.setItem("step", 3);
                        const stage = {
                            height: "38%",
                            step: 3
                        }
                        $this.props.StageUpdateAction(stage);
                        $this.props.$history.history.push('/pan');
                    }, 3000);
                    
                    toast.success(resp.respdesc);
                    // $this.setState({
                    //     status: true
                    // });                          // take reference to update state and push to next page
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
                toast.error("Error in Passport Verification");
            })
    }
}

// {"slk" : "xyz","vcipid" : "xxx","panimage" : "base64ofpan","sid" : "1/2/3..","rrn" :
// "xxx","pwd" : "xxx"}
export const GetPanOcr = (model, $this) => {
    return (dispatch) => {
        const url = "GetPANOCRv2"
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            panimage: model.imgPath,
            sid: "6",
            rrn: Math.floor(Math.random() * 100).toString(),
            pwd: "xyz"
        }
        Axios.post(url, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $this.setState({
                        spinner: false,
                        status: true,
                        timerStat: true,
                        time: 120
                    });
                    // $('#panDataId').modal('hide');
                    $('#panmodal').modal('show');
                    setTimeout(() => {
                        $('#panmodal').modal('hide');
                        sessionStorage.setItem("width", "76%");
                        sessionStorage.setItem("step", 4);
                        const stage = {
                            height: "76%",
                            step: 4
                        }
                        $this.props.StageUpdateAction(stage);

                        $this.props.history.replace('/video-chat');
                    }, 3000);

                    toast.success(resp.respdesc);
                    // $this.setState({
                    //     status: true
                    // });                          // take reference to update state and push to next page
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
                toast.error("Error in Pan Verification");
            })
    }
}

// {"slk" : "xyz","vcipid" : "xxx","liveimage" : "xx","sid" : "1/2/3..”,"rrn" : "xxx" }
export const CheckImageLiveness = (model, $this) => {
    return (dispatch) => {
        const url = "CheckImageLiveness"
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            liveimage: model.imgPath,
            sid: "9",
            rrn: Math.floor(Math.random() * 100).toString(),
        }
        Axios.post(url, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $this.setState({
                        spinner: false,
                        status: true,
                        timerStat: true,
                        time: 120
                    });
                    // $('#panDataId').modal('hide');
                    $('#faceMatchModel').modal('show');
                    setTimeout(() => {
                        $('#faceMatchModel').modal('hide');
                        sessionStorage.setItem("width", "100%");
                        sessionStorage.setItem("step", 7);
                        const stage = {
                            height: "100%",
                            step: 7
                        }
                        $this.props.StageUpdateAction(stage);
                        $this.props.history.replace('/end');
                    }, 3000);

                    toast.success(resp.respdesc);
                    // $this.setState({
                    //     status: true
                    // });                          // take reference to update state and push to next page
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
                toast.error("Error in Pan Verification");
            })
    }
}

// // VERIFY MOBILE OTP
// export const VerifyMobileOtpAction = (URL, model, $this) => {
//     return (dispatch) => {
//         const body = {
//             slk: process.env.REACT_APP_SLK_KEY,
//             mobile: model.mobile,
//             otp: model.otp,
//             custip: model.custip,
//             custloc: model.custloc,
//             env: "3",
//             ref1: model.ref1,
//             ref2: ""
//         }
//         // console.log(parsingData(body));

//         Axios.post(URL, parsingData(body))
//             .then((res) => {
//                 var resp = extractData(res.data);
//                 if (resp.respcode === "200") {
//                     $this.setState({
//                         spinnerOtp: false
//                     });
//                     toast.success(resp.respdesc);
//                     sessionStorage.removeItem("mobile")
//                     sessionStorage.setItem("vcipid", resp.vcipid);
//                     // sessionStorage.setItem("width", "0%");
//                     // sessionStorage.setItem("step", 1);
//                     // $this.push("/start");
//                     $('#newId').modal('show');
//                     $('#newId').modal({
//                         keyboard: false
//                     });
//                     dispatch({
//                         type: actionTypes.NEWID,
//                         payload: resp.vcipid
//                     });
//                 } else {
//                     toast.warn(resp.respdesc);
//                     $this.setState({
//                         spinnerOtp: false
//                     });
//                 }
//             })
//             .catch(err => {
//                 $this.setState({
//                     spinnerOtp: false
//                 });
//                 toast.error("Error in VCIP ID Generator");
//             })
//     }
// }

// // FOR NEW CUSTOMER VCIP GENERATOR BASED ON OTP
// export const GenerateAction = (URL, model, $this) => {
//     return (dispatch) => {
//         const body = {
//             slk: process.env.REACT_APP_SLK_KEY,
//             mobile: model.mobile,
//             email: "",
//             custip: model.custip,
//             custloc: model.custloc,
//             env: "3",
//             ref1: "",
//             ref2: ""
//         }
//         Axios.post(URL, parsingData(body))
//             .then((res) => {
//                 var resp = extractData(res.data);
//                 if (resp.respcode === "200") {
//                     toast.success(resp.respdesc);
//                     sessionStorage.setItem("vcipid", resp.vcipid);
//                     // sessionStorage.setItem("width", "0%");
//                     // sessionStorage.setItem("step", 1);
//                     // $this.push("/start");
//                     $('#newId').modal('show');
//                     $('#newId').modal({
//                         keyboard: false
//                     });
//                     dispatch({
//                         type: actionTypes.NEWID,
//                         payload: resp.vcipid
//                     });
//                 } else {
//                     toast.warn(resp.respdesc);
//                 }
//             })
//             .catch(err => {
//                 toast.error("Error in VCIP ID Generator");
//             })
//     }
// }

