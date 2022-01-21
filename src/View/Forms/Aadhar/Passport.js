import React, { Component } from 'react'

import Aux from '../../../hoc/Aux';
import { connect } from 'react-redux';
// import { OtpKycAction, SendOtpAction, PdfKycAction, XmlKycAction, StageUpdateAction } from '../../../Store/Actions/GenerateAction';
// import AadhaarOfflineCmp from '../../../Component/Forms/AadharCmp/AadhaarOfflineCmp';
// import AadhaarOfflinePdfCmp from '../../../Component/Forms/AadharCmp/AadhaarOfflinePdfCmp';
import { toast } from 'react-toastify';
// import { GetVcipStatusAction } from '../../../Store/Actions/ProcessAction';
import { Redirect } from 'react-router-dom';
import { Text } from '../../Language/Language';
import { PassportCmp } from './PassportCmp';
import { GetKycOCRPassport } from '../../../Store/Actions/BitzsAction/BitzsAction';
import { StageUpdateAction } from '../../../Store/Actions/GenerateAction';

const $ = window.$;

class Passport extends Component {
    state = {
        imgPath: '',
        imgPath1: '',
        adrType: '',
        agree: false,
        status: false,
        otpStatus: false,
        statuszip: false,
        disabled: false,
        sharecode: '',
        fileName: '',
        pwd: '',
        errMsg: {
            adrErr: '',
            otpErr: ''
        },
        // passport 
        imgSrc: "",
        enableBtn: false,
        rotateVal: 0,
        modelImg: "",
        spinner: false,
        imgInpStatus: true,



    }

    // componentDidMount() {
    //     this.loadScripts();
    //     const vcipid = sessionStorage.getItem("vcipid");
    //     if (vcipid) {
    //         this.props.GetVcipStatusAction();
    //     }
    //     $(function () {
    //         $('[data-toggle="tooltip"]').tooltip()
    //     });
    // }

    // loadScripts = () => {
    //     const dynamicScripts = [
    //         '/assets/js/script.js',
    //     ];
    //     for (let i = 0; i < dynamicScripts.length; i++) {
    //         const node = document.createElement('script');
    //         node.src = dynamicScripts[i];
    //         node.type = 'text/javascript';
    //         node.async = false;
    //         node.charset = 'utf-8';
    //         document.getElementsByTagName('head')[0].appendChild(node);
    //     }
    // }

    // // CHANGE HANDLER FOR XML FILE UPLOAD
    // handleChange = (event) => {
    //     event.preventDefault();
    //     if (event.target.files) {
    //         if (event.target.files[0].type === "multipart/x-zip" ||
    //             event.target.files[0].type === "application/zip" ||
    //             event.target.files[0].type === "application/x-zip-compressed" ||
    //             event.target.files[0].type === "application/x-zip"
    //         ) {
    //             const val = event.target.files.length;
    //             for (let i = 0; i < val; i++) {
    //                 let reader = new FileReader();
    //                 reader.onload = function (ev) {
    //                     this.setState({
    //                         imgPath: ev.target.result.split(',')[1]
    //                     })
    //                 }.bind(this);
    //                 reader.readAsDataURL(event.target.files[i]);
    //             }
    //             this.setState({
    //                 statuszip: true,
    //                 fileName: 'xml'
    //             });
    //         } else if (event.target.files[0].type === "application/pdf") {
    //             const val = event.target.files.length;
    //             for (let i = 0; i < val; i++) {
    //                 let reader = new FileReader();
    //                 reader.onload = function (ev) {
    //                     this.setState({
    //                         imgPath1: ev.target.result.split(',')[1]
    //                     })
    //                 }.bind(this);
    //                 reader.readAsDataURL(event.target.files[i]);
    //             }
    //             this.setState({
    //                 status: true,
    //                 fileName: 'pdf',
    //                 statuszip: true,
    //             });
    //         } else {
    //             toast.error("Please upload ZIP File or PDF FIle")
    //         }
    //     }
    // }

    // // CHANGE HANDLER FOR PDF FILE UPLOAD
    // handleChangePdf = (event) => {
    //     event.preventDefault();
    //     if (event.target.files) {
    //         if (event.target.files[0].type === "application/pdf") {
    //             const val = event.target.files.length;
    //             for (let i = 0; i < val; i++) {
    //                 let reader = new FileReader();
    //                 reader.onload = function (ev) {
    //                     this.setState({
    //                         imgPath1: ev.target.result.split(',')[1]
    //                     })
    //                 }.bind(this);
    //                 reader.readAsDataURL(event.target.files[i]);
    //             }
    //             this.setState({
    //                 status: true
    //             });
    //         } else {
    //             toast.error("Please upload PDF File")
    //         }
    //     }
    // }

    // handleAccept = (event) => {
    //     // event.preventDefault();
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //     this.setState({
    //         [name]: value
    //     });

    // }

    // // CHANGE HANDLER FOR PASSWORD
    // changepwd = (event) => {
    //     event.preventDefault();
    //     this.setState({
    //         [event.target.name]: event.target.value,
    //     });
    // }

    // handlepwd = (event) => {
    //     event.preventDefault();
    //     // if (event.target.name === "otpNumber") {
    //     if (event.target.value.length === 4) {
    //         this.setState({
    //             disabled: true,
    //             [event.target.name]: event.target.value,
    //             errMsg: {
    //                 otpErr: ""
    //             }
    //         });
    //     }
    //     else {
    //         this.setState({
    //             disabled: false,
    //             errMsg: {
    //                 otpErr: "enter 4 character password"
    //             }
    //         });
    //     }
    //     // }
    // }

    // zipSubmit = () => {
    //     $('#xml').modal('show');
    //     $('#xml').modal({
    //         keyboard: false
    //     });
    // }

    // xmlSubmit = (event) => {
    //     event.preventDefault();
    //     if (this.state.agree) {
    //         if (this.state.fileName === "xml") {
    //             const model = {
    //                 data: this.state.imgPath,
    //                 sharecode: this.state.sharecode
    //             }
    //             const $this = this;
    //             this.props.XmlKycAction(model, $this);
    //         } else if (this.state.fileName === "pdf") {
    //             const model = {
    //                 data: this.state.imgPath1,
    //                 pwd: this.state.pwd
    //             }
    //             const $this = this;
    //             this.props.PdfKycAction(model, $this);
    //         }
    //     } else {
    //         toast.error("Please accept the conditions")
    //     }
    // }

    // pdfSubmit = (event) => {
    //     event.preventDefault();
    //     const model = {
    //         data: this.state.imgPath1,
    //         pwd: this.state.pwd
    //     }
    //     const $this = this;
    //     this.props.PdfKycAction(model, $this);
    //     // this.setState({
    //     //     status: true,
    //     //     aadharPattern: ''
    //     // });
    // }


    // handleProceed = () => {
    //     $('#xmlInfo').modal('hide');
    //     $('#aadharofflineCompletemodal').modal('show');
    //     setTimeout(() => {
    //         $('#aadharofflineCompletemodal').modal('hide');
    //         sessionStorage.setItem("width", "51%");
    //         sessionStorage.setItem("step", 3);
    //         const stage = {
    //             height: "51%",
    //             step: 3
    //         }
    //         this.props.StageUpdateAction(stage);
    //         this.props.history.push('/pan');
    //     }, 5000);
    // }

    back = () => {
        this.props.history.push('/start');
    }

    play = () => {
        $('#tutorial').modal({
            keyboard: false
        });
    }

    pause = () => {
        var vid = document.getElementById("myVideo");
        vid.pause();
    }

    // passport handle chagne
    handleChangePassport = (event) => {
        event.preventDefault();
        if (event.target.files) {
            const val = event.target.files.length;
            if (event.target.files[0].type === "application/pdf") {
                for (let i = 0; i < val; i++) {
                    let reader = new FileReader();
                    reader.onload = function (ev) {
                        // this.setState({
                        //     imgInpStatus: true,
                        //     // imgPath: ev.target.result.split(',')[1]
                        // })
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
                            enableBtn: true,
                            imgSrc: ev.target.result.split(',')[1]
                        })
                    }.bind(this);
                    reader.readAsDataURL(event.target.files[i]);
                }

            }
        }
    }

    popup = (val) => {
        $('#img').modal('show');
        this.setState({
            modelImg: val
        })
    }

    rotateImage = (val) => {
        if (val) {
            this.setState({
                rotateVal: this.state.rotateVal + val
            })
        }
        $("#rotateImg").css({ 'transform': 'rotate(' + this.state.rotateVal + 'deg)' });
    }

    reset = () => {
        this.setState({
            imgInpStatus: true,
            imgSrc : "",
            captureStatus: false,
            pdfFileStatus: false,
            selectPanUpload: "1"
        })
    }

    uploadFile = (event) => {                        // uncomment this and check once
        event.preventDefault();
        this.setState({
            spinner: true,
        });
        // const $this = this;
        // const { pdfFileStatus, pwd } = this.state;
        // if (pdfFileStatus && this.state.imgPath) {
        //     if (pwd.length === 8) {
        //         const model = {
        //             imgPath: this.state.imgPath,
        //             password: this.state.pwd
        //         }
        //         this.props.PanOcrAction(model, $this);

        //     } else {
        //         toast.error("Please enter 8 digit password");
        //     }
        // } else {
        //     if (this.state.imgPath) {
        //         const model = {
        //             imgPath: this.state.imgPath,
        //             password: ""
        //         }
        //         this.props.PanOcrAction(model, $this);
        //     } else {
        //         this.setState({
        //             spinner: false
        //         })
        //         toast.error("error");
        //     }
        // }
        const $this = this
        const url = "GetKycOCR"
        const modal = {
            passport: this.state.imgSrc,
        }
        // setTimeout(() => {
        //     // $('#panmodal').modal('hide');
        //     sessionStorage.setItem("width", "38%");
        //     sessionStorage.setItem("step", 3);
        //     const stage = {
        //         height: "38%",
        //         step: 3
        //     }
        //     this.props.StageUpdateAction(stage);
        //     this.props.GetKycOCRPassport(url, modal, $this);
        //     // this.props.history.push('/pan');
        // }, 3000);
        this.props.GetKycOCRPassport(url, modal, $this);


        // passport api 
    }

    render() {
        const status = this.props.pincodeRdr?.statuses?.kycstatus;
        const { imgSrc, enableBtn, spinner, imgInpStatus } = this.state;
        return (
            <Aux>
                {/* <h5 className="heading"> */}
                {/* <Text tid="offline_title" /> */}
                {/* Passport */}
                {/* <button type="button" onClick={this.play} className="btn btn-primary float-right" data-toggle="modal" data-target="#tutorial">
                        <Text tid="video" />
                    </button> */}
                {/* </h5> */}

                <div className="row justify-content-center w-100">
                    <div className="col-md-12 p-0">
                        {/* <AadhaarOfflineCmp
                            errors={this.state.errMsg}
                            statuszip={this.state.statuszip}
                            zipSubmit={this.zipSubmit}
                            agree={this.state.agree}
                            disabled={this.state.disabled}
                            change={this.handleChange}
                            handlepwd={this.handlepwd}
                            handleAccept={this.handleAccept}
                            xmlSubmit={this.xmlSubmit}
                        /> */}
                        <PassportCmp
                            imgSrc={imgSrc}
                            handleChangePassport={this.handleChangePassport}
                            enableBtn={enableBtn}
                            popup={this.popup}
                            rotate={(val) => this.rotateImage(val)}
                            upload={this.uploadFile}
                            spinner={spinner}
                            imgInpStatus={imgInpStatus}
                            reset={this.reset}

                        />
                    </div>
                </div>

                {/* <div className="aadhaar-link-box" data-toggle="tooltip" data-placement="top" title="Learn to perform Offline KYC">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-10 p-0">
                            <div className="d-flex align-items-center my-4">
                                <div>
                                    <h6 className="instructions-title pr-2 my-1" style={{ color: "#1a488d" }}>
                                        <Text tid="dont_have" />
                                    </h6>
                                </div>
                                <div>
                                    <p>
                                        <a href="https://resident.uidai.gov.in/offline-kyc" rel="noopener noreferrer" className="pr-2" target="_blank">
                                            <Text tid="click_here" />
                                        </a>
                                        <Text tid="download_xml" />
                                    </p>

                                    <p>
                                        <a href="https://eaadhaar.uidai.gov.in/" rel="noopener noreferrer" className="pr-2" target="_blank">
                                            <Text tid="click_here" />
                                        </a>
                                        <Text tid="download_pdf" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* <hr className="hr" /> */}
                {/* <div className="row justify-content-center w-100">
                    <div className="col-md-7 instructions border-0 py-2">
                        <h5 className="instructions-title text-center">
                            <Text tid="help_center" />
                        </h5>
                    </div>
                </div> */}
                {/* {(status === undefined || status === "0") ? (<div className="mx-auto position-relative" style={{ width: "90%" }}>
                    <div className="or">
                        <Text tid="OR" />
                    </div>
                    <div className="row justify-content-center w-100">
                        <div className="col-md-6 p-0">
                            <div className="instructions sr1">
                                <h5 className="instructions-title">
                                    <Text tid="ekyc" />
                                </h5>

                                <AadhaarOfflineCmp
                                    errors={this.state.errMsg}
                                    statuszip={this.state.statuszip}
                                    zipSubmit={this.zipSubmit}
                                    agree={this.state.agree}
                                    disabled={this.state.disabled}
                                    change={this.handleChange}
                                    handlepwd={this.handlepwd}
                                    handleAccept={this.handleAccept}
                                    xmlSubmit={this.xmlSubmit}
                                />

                                <h5 className="instructions-title">Help Center</h5>
                                <p className="instructions-title mb-2">step - 1 : download e-kyc xml from uidai website:</p>
                                <ul className="instructions-list">
                                    <li>
                                        <Text tid="step1" />
                                        <a href="https://resident.uidai.gov.in/offline-kyc" className="ml-1">UIDAI</a>
                                    </li>
                                    <li>
                                        <Text tid="step2" />
                                    </li>
                                    <li>
                                        <Text tid="step3" />
                                    </li>
                                    <li>
                                        <Text tid="step4" />
                                    </li>
                                </ul>
                                <p className="instructions-title text-danger text-danger mb-2">
                                    <Text tid="please_note" />
                                </p>
                                <p className="instructions-title  text-dark small">
                                    <Text tid="note1" />
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 p-0">
                            <div className="instructions sr1 border-right-0">
                                <h5 className="instructions-title">
                                    <Text tid="ekycPdf" />
                                </h5>
                                <AadhaarOfflinePdfCmp
                                    errors={this.state.errMsg}
                                    status={this.state.status}
                                    changepdf={this.handleChangePdf}
                                    changepwd={this.changepwd}
                                    pdfSubmit={this.pdfSubmit}
                                />

                                <h5 className="instructions-title">Help Center</h5>
                                <div className="left-line"></div>

                                <p className="instructions-title mb-2">step - 1 : download e-kyc xml from uidai website:</p>
                                <ul className="instructions-list">
                                    <li>
                                        <Text tid="step1" />
                                        <a href="https://eaadhaar.uidai.gov.in/#/" className="ml-2">UIDAI</a>
                                    </li>
                                    <li>
                                        <Text tid="step5" />
                                    </li>
                                    <li>
                                        <Text tid="step3" />
                                    </li>
                                    <li>
                                        <Text tid="step6" />
                                    </li>
                                </ul>
                                <p className="instructions-title text-danger text-danger mb-2">
                                    <Text tid="please_note" />
                                </p>
                                <p className="instructions-title  text-dark small">
                                    <Text tid="note2" />
                                </p>

                            </div>
                        </div>

                    </div>
                </div>) :
                    (<Redirect to="/pan" />)} */}
                {/* <button onClick={this.back} className="custom-btn">
                    <Text tid="back" />
                </button> */}



                <div className="modal fade" id="xmlInfo" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered custom-model-adr" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions border-right-0">
                                    <h5 className="instructions-title text-center pt-4">
                                        <Text tid="adr_details" />
                                    </h5>
                                    {this.props.PanRdr.KYCDetails ? (<div>
                                        <div className="w-75 mx-auto">

                                            <div className="text-center">
                                                <img src={this.props.PanRdr.KYCDetails.kycdetails?.pht ? `data:image/png;base64 ,${this.props.PanRdr.KYCDetails.kycdetails?.pht}` : null}
                                                    className="text-center mb-3" alt="aadhaar" style={{ width: "90px" }} />
                                            </div>

                                            <table className="table mx-auto">
                                                <tbody>
                                                    {/* <tr>
                                                        <td>Masked UID</td>
                                                        <td>{this.props.PanRdr.KYCDetails.kycdetails?.uid}</td>
                                                    </tr> */}
                                                    <tr>
                                                        <td>Name</td>
                                                        <td>{this.props.PanRdr.KYCDetails.kycdetails?.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gender</td>
                                                        <td>{this.props.PanRdr.KYCDetails.kycdetails?.gender}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>D.O.B</td>
                                                        <td>{this.props.PanRdr.KYCDetails.kycdetails?.dob}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address</td>
                                                        <td>{this.props.PanRdr.KYCDetails.kycdetails?.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>SIGNATURE VALIDATION STATUS :</td>
                                                        <td>
                                                            {this.props.PanRdr.KYCDetails?.kycstatus === "1" ? (
                                                                <span className="text-success">Valid</span>
                                                            ) : (
                                                                <span className="text-danger">Invalid</span>
                                                            )}
                                                            {/* <input type="checkbox"
                                                                checked={this.props.PanRdr.KYCDetails?.kycstatus === "1" ? true : false}
                                                                className="custom-control-input" disabled /> */}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                        {/* <form>
                                            <div className="pb-3 text-center">
                                                <button type="button" onClick={this.handleProceed} className="btn custom-btn">
                                                    <Text tid="proceed" />
                                                </button>
                                            </div>
                                        </form> */}
                                    </div>) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade custom-modal" id="aadharofflineCompletemodal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    <img src="./assets/images/success.svg" alt="no img" />
                                    <h1 className="modal-data-title">Address Proof Submission Successfully!</h1>
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

                <div className="modal fade custom-modal" id="tutorial" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" onClick={this.pause} aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    {/* <img src="./assets/images/success.svg" alt="no img" /> */}
                                    <video src="/assets/images/V-CIP_OKYC-DEMO.mp4" id="myVideo" className="w-75 mx-auto" controls></video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* to display passport image */}
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
                


            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { PanRdr, pincodeRdr, bitszReducer } = state;
    return {
        PanRdr, pincodeRdr, bitszReducer
    }

}

const mapsDispatchToProps = (dispatch) => {
    return {
        // SendOtpAction: (aadhaarNo, $this) => dispatch(SendOtpAction(aadhaarNo, $this)),
        // OtpKycAction: (otp, $this) => dispatch(OtpKycAction(otp, $this)),
        // XmlKycAction: (model, $this) => dispatch(XmlKycAction(model, $this)),
        // PdfKycAction: (model, $this) => dispatch(PdfKycAction(model, $this)),
        // GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        // StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage))
        GetKycOCRPassport: (url, modal, $this) => dispatch(GetKycOCRPassport(url, modal, $this)),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage)),

    }
}


export default connect(mapStateToProps, mapsDispatchToProps)(Passport);
