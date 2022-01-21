import React, { Component } from 'react'
// import AadharFormCmp from '../../../Component/Forms/AadharCmp/AadharFormCmp';
// import AadharInfoCmp from '../../../Component/Forms/AadharCmp/AadharInfoCmp';
import { connect } from 'react-redux';
import { GetKycOCR } from '../../../Store/Actions/BitzsAction/BitzsAction';
import base64 from 'react-native-base64';
import { toast } from 'react-toastify';
// import { Redirect } from 'react-router-dom';
import { Text } from '../../Language/Language';
import Aadhar_utils from './Aadhar_utils';
import Camera from 'react-html5-camera-photo';
import { Redirect } from 'react-router-dom';
import { OtpKycAction, SendOtpAction, StageUpdateAction } from '../../../Store/Actions/GenerateAction';
import { GetVcipStatusAction } from '../../../Store/Actions/ProcessAction';


const $ = window.$;

class Aadhar extends Component {
    state = {
        backDisbale: false,
        imgInpStatus: true,
        imgPathAadhaarFront: null,
        imgPathAadhaarBack: null,
        captureStatus: false,
        status: false,
        addClass: "",
        spinner: false,
        edtname: '',
        edtfname: '',
        edtdob: '',
        edtpannumber: '',
        btnDisabled: true,
        rotateVal: 0,
        newdate: '',
        pdfFileStatus: false,
        pwd: '',
        selectPanUpload: '1',
        aadhaarSubmit: "",
        modelImg: "",
        rotateVal2: 0,
        adrNumber: '',
        aadharno1: '',
        aadharno2: '',
        aadharno3: '',
        aadhaarType: '',
        status: false,
        otpStatus: false,
        aadharPattern: '',
        spinner: false,
        spinner1: false,
        imgInpStatus1: false,
        otp: '',
        otpNumber: '',
        timer: 10,
        errMsg: {
            adrErr: '',
            otpErr: ''
        },
    }

    componentDidMount() {
        this.loadScripts();
        const vcipid = sessionStorage.getItem("vcipid");
        if (vcipid) {
            this.props.GetVcipStatusAction();
        }
    }

    loadScripts = () => {
        const dynamicScripts = [
            '/assets/js/script.js',
        ];
        for (let i = 0; i < dynamicScripts.length; i++) {
            const node = document.createElement('script');
            node.src = dynamicScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }
    // FOR 3 BOXES VALUES
    handleChangeAdr = (event) => {
        event.preventDefault();
        const val = event.target.value;
        const name = event.target.name;
        const num = /^[0-9\b]+$/;
        if (num.test(val)) {
            if (name === "aadharno1") {
                if (val.length <= 4) {
                    this.setState({
                        [name]: val
                    });

                    if (val.length === 4) {
                        $('#adrinp2').focus();
                    }
                }
                //  else {
                //     $('#adrinp2').focus();
                // }
            } else if (name === "aadharno2") {
                if (val.length <= 4) {
                    this.setState({
                        [name]: val
                    });
                    if (val.length === 4) {
                        $('#adrinp3').focus();
                    }
                }
                // else {
                //     $('#adrinp3').focus();
                // }
            } else if (name === "aadharno3") {
                if (val.length <= 4) {
                    // if (val.match(num)) {
                    this.setState({
                        [name]: val
                    });
                    // }
                }
            }
        } else if (val.length === 0) {
            this.setState({
                [name]: val
            });
        }

        // if (event.target.value.length <= 14) {
        //     this.setState({
        //         ...this.state,
        //         // aadharPattern: event.target.value.replace(/[^\d1-9]/g, '').replace(/(.{4})/g, '$1 ').trim()
        //         aadharPattern: event.target.value.replace(/[^\d1-9]/g, '').replace(/(.{4})/g, '$1').trim()
        //     })
        // }

    }

    handleChange = (event) => {
        if (event.target.name === "aadhaarType") {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        if (event.target.name === "otpNumber") {
            if (event.target.value.length <= 6) {
                this.setState({
                    [event.target.name]: event.target.value,
                    errMsg: {
                        otpErr: ""
                    }
                });
            }
            else {
                this.setState({
                    errMsg: {
                        otpErr: "Error OTP"
                    }
                });
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const str1 = this.state.aadharno1;
        const str2 = this.state.aadharno2;
        const str3 = this.state.aadharno3;
        const aadhaarNumberval = `${str1 + '' + str2 + '' + str3}`;
        if (aadhaarNumberval !== '' || this.state.aadhaarType !== '') {
            this.setState({
                spinner: true,
                // status: true,
                // aadharPattern: ''
            });
            const $this = this;
            let val = base64.encode(aadhaarNumberval);
            sessionStorage.setItem("aadhaar", val);
            const model = {
                adrno: val,
                otptype: this.state.aadhaarType
            }
            this.props.SendOtpAction(model, $this);
        } else {
            toast.error("Error")
        }
    }


    // SEND OTP AGAIN
    getOtpAgain = () => {
        const aadhaar = sessionStorage.getItem("aadhaar");
        if (aadhaar) {
            const model = {
                adrno: aadhaar,
                otptype: this.state.aadhaarType
            }
            const $this = this;
            this.props.SendOtpAction(model, $this);
        } else {
            toast.error("Please try again.")
        }
    }

    handleOtp = (event) => {
        event.preventDefault();
        this.setState({
            spinner1: true,
            // otpStatus: true,
        });
        const $this = this;
        let otp = base64.encode(this.state.otpNumber);
        this.props.OtpKycAction(otp, $this);
    }

    handleProceed = () => {
        $('#aadharCompletemodal').modal('show');
        setTimeout(() => {
            $('#aadharCompletemodal').modal('hide');
            sessionStorage.setItem("width", "51%");
            sessionStorage.setItem("step", 3);
            const stage = {
                height: "51%",
                step: 3
            }
            this.props.StageUpdateAction(stage);
        }, 3000);
    }

    back = () => {
        this.props.history.push('/start');
    }


    handleChangeAadharBack = (event) => {
        event.preventDefault();
        if (event.target.files) {
            const val = event.target.files.length;
            if (event.target.files[0].type === "application/pdf") {
                for (let i = 0; i < val; i++) {
                    let reader = new FileReader();
                    reader.onload = function (ev) {
                        this.setState({
                            imgInpStatus: true,
                            captureStatus: false,
                            pdfFileStatus: false,
                            // imgPath: ev.target.result.split(',')[1]
                        })
                    }.bind(this);
                    reader.readAsDataURL(event.target.files[i]);
                    toast.error("Please Upload Image Format")
                }
            } else {
                for (let i = 0; i < val; i++) {
                    let reader = new FileReader();
                    reader.onload = function (ev) {
                        this.setState({
                            imgInpStatus: false,
                            captureStatus: false,
                            selectPanUpload: "0",
                            imgPathAadhaarBack: ev.target.result.split(',')[1]
                        })
                    }.bind(this);
                    reader.readAsDataURL(event.target.files[i]);
                }

            }
        }
    }
    handleChangeAadharFront = (event) => {
        event.preventDefault();
        if (event.target.files) {
            const val = event.target.files.length;
            if (event.target.files[0].type === "application/pdf") {
                for (let i = 0; i < val; i++) {
                    let reader = new FileReader();
                    reader.onload = function (ev) {
                        this.setState({
                            imgInpStatus: true,
                            captureStatus: false,
                            pdfFileStatus: false,
                            // selectPanUpload: "2",
                            // imgPath: ev.target.result.split(',')[1]
                        })
                    }.bind(this);
                    reader.readAsDataURL(event.target.files[i]);
                    toast.error("Please Upload Image Format")
                }
            } else {
                for (let i = 0; i < val; i++) {
                    let reader = new FileReader();
                    reader.onload = function (ev) {
                        this.setState({
                            imgInpStatus1: false,
                            captureStatus: false,
                            selectPanUpload: "2",
                            imgPathAadhaarFront: ev.target.result.split(',')[1]
                        })
                    }.bind(this);
                    reader.readAsDataURL(event.target.files[i]);
                }

            }
        }
    }

    capture = () => {
        this.setState({
            imgInpStatus: false,
            captureStatus: true,
            imgPath: "data"
        });
    }




    handlepwd = (event) => {
        event.preventDefault();
        // if (event.target.name === "otpNumber") {
        if (event.target.value.length === 8) {
            this.setState({
                disabled: true,
                [event.target.name]: event.target.value,
                errMsg: {
                    otpErr: ""
                }
            });
        }
        else {
            this.setState({
                disabled: false,
                [event.target.name]: event.target.value,
                errMsg: {
                    otpErr: "enter 8 character password"
                }
            });
        }
        // }
    }

    selectPan = (event) => {
        this.setState({
            selectPanUpload: event.target.value
        });
    }

    uploadFile = (event) => {                        // uncomment this and check once
        event.preventDefault();
        this.setState({
            spinner: true,
            captureStatus: false
        });
        const $this = this;
        // const { pdfFileStatus, pwd } = this.state;
        // if (pdfFileStatus && this.state.imgPathAadhaarFront) {
        //     if (pwd.length === 8) {
        //         // const model = {
        //         //     imgPath: this.state.imgPathAadhaarFront,
        //         //     password: this.state.pwd
        //         // }
        //         // this.props.PanOcrAction(model, $this);
        //         const url = "GetKycOCR"
        //         const modal = {
        //             front_aadhar_file_inbase64: this.state.imgPathAadhaarFront,
        //             back_aadhar_file: this.state.imgPathAadhaarBack
        //         }
        //         // $('#aadharCompletemodal').modal('show');
        //         // setTimeout(() => {
        //         //     $('#aadharCompletemodal').modal('hide');
        //         //     sessionStorage.setItem("width", "38%");
        //         //     sessionStorage.setItem("step", 3);
        //         //     const stage = {
        //         //         height: "38%",
        //         //         step: 3
        //         //     }
        //         //     this.props.StageUpdateAction(stage);
        //         //     // this.props.history.replace('/pan');
        //         // }, 3000);
                
        //         this.props.GetKycOCR(url, modal, $this);

        //     } else {
        //         toast.error("Please enter 8 digit password");
        //     }
        // } else {
            if (this.state.imgPathAadhaarFront) {
                const url = "GetKycOCR"
                const modal = {
                    front_aadhar_file_inbase64: this.state.imgPathAadhaarFront,
                    back_aadhar_file: this.state.imgPathAadhaarBack
                }
                // $('#aadharCompletemodal').modal('show');
                // setTimeout(() => {
                //     $('#aadharCompletemodal').modal('hide');
                //     sessionStorage.setItem("width", "38%");
                //     sessionStorage.setItem("step", 3);
                //     const stage = {
                //         height: "38%",
                //         step: 3
                //     }
                //     this.props.StageUpdateAction(stage);
                // }, 3000);
                this.props.GetKycOCR(url, modal, $this);
        


            } else {
                this.setState({
                    spinner: false
                })
                toast.error("error");
            }
        // }

    }


    // findReportPAN = (event) => {
    //     const $this = this
    //     const url = "GetKycOCR"
    //     const modal = {
    //         front_aadhar_file_inbase64: this.state.imgPathAadhaarFront,
    //         back_aadhar_file: this.state.imgPathAadhaarBack
    //     }
    //     setTimeout(() => {
    //         // $('#panmodal').modal('hide');
    //         sessionStorage.setItem("width", "38%");
    //         sessionStorage.setItem("step", 3);
    //         const stage = {
    //             height: "38%",
    //             step: 3
    //         }
    //         this.props.StageUpdateAction(stage);
    //         this.props.GetKycOCR(url, modal, $this);
    //         // this.props.history.push('/pan');
    //     }, 3000);

    // }

    rotateImage = (val) => {
        if (val) {
            this.setState({
                rotateVal: this.state.rotateVal + val
            })
        }
        // const newval = 0;
        $("#rotateImg").css({ 'transform': 'rotate(' + this.state.rotateVal + 'deg)' });
        // $('#rotateImg').animate({ transform: val }, {
        //     step: function (now, fx) {
        //         $(this).css({ 'transform': 'rotate(' + now + 'deg)' });
        //     }
        // });
    }
    rotateImage2 = (val) => {
        if (val) {
            this.setState({
                rotateVal2: this.state.rotateVal2 + val
            })
        }
        // const newval = 0;
        $("#rotateImg2").css({ 'transform': 'rotate(' + this.state.rotateVal2 + 'deg)' });
        // $('#rotateImg').animate({ transform: val }, {
        //     step: function (now, fx) {
        //         $(this).css({ 'transform': 'rotate(' + now + 'deg)' });
        //     }
        // });
    }

    handleTakePhoto = (dataUri) => {
        const base64result = dataUri.split(',')[1];
        this.setState({
            imgInpStatus: false,
            imgPath: base64result
        });
    }


    // image size big

    popup = (val) => {
        $('#img').modal('show');
        this.setState({
            modelImg: val
        })
    }
    popup2 = (val) => {
        $('#img').modal('show');
        this.setState({
            modelImg2: val
        })
    }

    //     <div className="photo-img photo-img1 position-relative border">
    //     <div>
    //         <canvas id="canvas" width={widht['width']} height={widht['height']} style={{ objectFit: 'fill', position: "absolute", width: "100%", height: "100%", display: "none" }}></canvas>
    //         <img width={widht['width']} height={widht['height']} src={props.pic.canvasImage ? "data:image/png;base64," + props.pic.canvasImage : '../images/noimg.png'}
    //             onClick={() => props.popup("data:image/png;base64," + props.pic.canvasImage)}
    //             style={{ objectFit: 'fill', position: "absolute", width: "100%", height: "100%" }} alt="no img" />
    //     </div>
    // </div>
    // end here
    reset = () => {
        this.setState({
            imgInpStatus: true,
            imgSrc : "",
            captureStatus: false,
            pdfFileStatus: false,
            selectPanUpload: "1",
            imgPathAadhaarFront: "",
            imgPathAadhaarBack: "",
        })
    }

    render() {
        // const status = this.prop?.statuses?.kycstatus;
        const status = this.props.pincodeRdr?.statuses?.kycstatus;
        const { selectPanUpload, captureStatus, imgInpStatus, pdfFileStatus,
            imgPathAadhaarFront, imgPathAadhaarBack, errMsg, addClass, spinner, btnDisabled } = this.state;
        // if (kycstatus === "1") {
        //     return <Redirect to="/pan" />
        // }
        return (
            <>
                {/* <h5 className="heading">
                    <Text tid="adr_otp_title" />
                </h5> */}
                {/* {(status === undefined || status === "0") ? (<div className="row" style={{ width: "95%", margin: "0 auto" }}> */}
                {/*  <AadharFormCmp
                        adrpattern={this.state.aadharPattern}
                        errors={this.state.errMsg}
                        status={this.state.status}
                        aadharno1={this.state.aadharno1}
                        aadharno2={this.state.aadharno2}
                        aadharno3={this.state.aadharno3}
                        change={this.handleChange}
                        // changeAdr={this.handleChangeAdr}
                        // spinner={this.state.spinner}
                        spinner1={this.state.spinner1}
                        aadharForm={this.handleSubmit}
                        counter={this.state.timer}
                        otpSubmit={this.handleOtp}
                        sendAgain={this.getOtpAgain}
                    />
                    {this.state.otpStatus ? <AadharInfoCmp
                        proceed={this.handleProceed}
                        data={this.props.PanRdr.AadhaarDetails}
                    /> : (
                            <div className="col-md-6">
                                <div className="details sr1 block-disabled">
                                    <h2 className="info-title">
                                        <Text tid="adr_details" />
                                    </h2>

                                    <div className="row m-0">
                                        <div className="col-md-12 p-0">
                                            <div className="table-responsive aadhar-info">
                                                <table className="table info-data mb-0 text-muted">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <Text tid="name" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Text tid="fname" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Text tid="dob" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Text tid="adr_number" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Text tid="addr" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Text tid="photo" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button type="button" disabled className="custom-btn">
                                                    <Text tid="proceed" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}


                    {/* <Aadhar_utils
                    imgInpStatus={imgInpStatus}
                    reset={this.reset}
                    selectImg={this.handleChange}
                    capture={this.capture}
                    handlepwd={this.handlepwd}
                    selectPan={this.selectPan}
                    selectPanUpload={selectPanUpload}
                    pdfFileStatus={pdfFileStatus}
                    captureStatus={captureStatus}
                    status={this.state.status}
                    imgSrc={imgPath}
                    errMsg={errMsg.otpErr}
                    upload={this.uploadFile}
                    addClass={addClass}
                    spinner={spinner}
                    find={this.findReportPAN}
                    panInfo={this.props.PanRdr.PanInfo}
                    btnDisabled={btnDisabled}
                    rotate={(val) => this.rotateImage(val)}
                /> */}
                {(status === undefined || status === "0") ? (<div className="row" style={{ width: "95%", margin: "0 auto" }}>
                    <div className="row justify-content-center">
                        {captureStatus
                            ? <div className="col-md-6">
                                <Camera
                                    isImageMirror={false}
                                    onTakePhoto={(dataUri) => { this.handleTakePhoto(dataUri); }} />
                            </div>
                            : null
                        }
                        <Aadhar_utils
                            imgInpStatus={imgInpStatus}
                            reset={this.reset}
                            selectImg={this.handleChange}
                            handleChangeAadharFront={this.handleChangeAadharFront}
                            handleChangeAadharBack={this.handleChangeAadharBack}
                            capture={this.capture}
                            handlepwd={this.handlepwd}
                            selectPan={this.selectPan}
                            selectPanUpload={selectPanUpload}
                            pdfFileStatus={pdfFileStatus}
                            captureStatus={captureStatus}
                            status={this.state.status}
                            imgSrc={imgPathAadhaarFront}
                            imgSrcBack={imgPathAadhaarBack}
                            errMsg={errMsg.otpErr}
                            upload={this.uploadFile}
                            addClass={addClass}
                            spinner={spinner}
                            // find={this.findReportPAN}
                            // panInfo={this.props.PanRdr.PanInfo}
                            btnDisabled={btnDisabled}
                            rotate={(val) => this.rotateImage(val)}
                            rotate2={(val) => this.rotateImage2(val)}
                            popup={this.popup}
                            popup2={this.popup2}
                        />
                    </div>

                </div>) :
                    (<Redirect to="/pan" />)}

                <div className="modal fade custom-modal" id="aadharCompletemodal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    <img src="./assets/images/success.svg" alt="no img" />
                                    <h1 className="modal-data-title">Address Proof Submitted Successfully!</h1>
                                    <div>
                                        <svg width="100px" height="100px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                            <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
                                            <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                                                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                    </div>
                                    <p className="modal-data-content">
                                        Please wait, We are taking you to the next step
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button onClick={this.back} disabled={this.state.backDisbale} className="custom-btn">
                            <Text tid="back" />
                        </button> */}



                <div className="modal fade custom-modal" id="img" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    <img className="w-75" src={this.state.modelImg} alt="no img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { bitszReducer, pincodeRdr } = state;
    return {
        bitszReducer, pincodeRdr
    }
}

const mapsDispatchToProps = (dispatch) => {
    return {
        GetKycOCR: (url, modal, $this) => dispatch(GetKycOCR(url, modal, $this)),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage)),
        SendOtpAction: (aadhaarNo, $this) => dispatch(SendOtpAction(aadhaarNo, $this)),
        OtpKycAction: (otp, $this) => dispatch(OtpKycAction(otp, $this)),
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),

    }
}

export default connect(mapStateToProps, mapsDispatchToProps)(Aadhar);
