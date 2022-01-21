import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Aux from '../../../hoc/Aux';
import { Text } from '../../Language/Language';
import {
    GetLanguagesAction, GetCalenderAction, CreateScheduleAction,
    InitiateConferenceQueueAction, UpdatedTokenNumbeAction, JoinVideoAction,
    EndVideoAction, GetQuestionsAction, GetVcipStatusAction, GetScheduleDetailsAction, CancelScheduleAction
} from '../../../Store/Actions/ProcessAction';
import { chatCreateSession, chatCreateToken } from '../../../Store/Actions/UsersActions/ChatAction';
import { GetNotificationAction, PushNotificationAction, StageUpdateAction } from '../../../Store/Actions/GenerateAction';
import { ResetEndRdrAction, ResetRdrAction } from '../../../Store/Actions/UsersActions/UserActions';
import Camera from 'react-html5-camera-photo';
import LivenessCapture from './LivenessCapture';
import { CheckImageLiveness } from '../../../Store/Actions/BitzsAction/BitzsAction';
import FaceDetections from '../../End/FaceDetection';

const $ = window.$;

class Reschedule extends Component {
    state = {
        langid: '',
        stime: '',
        sdate: '',
        mySessionId: 'syz',
        myUserName: '',
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
        message: '',
        myMessage: '',
        bankerMessage: '',
        msgArr: [],
        intervalId: undefined,
        intervalId1: undefined,
        createScheduleStatus: false,
        // liveness capture
        captureStatus: true,
        imgInpStatus: true,
        rotateVal: 0,
        spinner: false,
        streamVideo: null,
        errorMessage: "Please Wait...",
        loading:true,

    }

    inpRef = React.createRef();


    componentDidMount() {
        this.GetVcipStatus();
        window.addEventListener('beforeunload', this.onbeforeunload);
        $('#faceMatchModel').modal('show');
        setTimeout(() => {
            $('#faceMatchModel').modal('hide');
            var element = document.getElementById("hideText");
            element.classList.remove("errormessage");
        }, 2500);
        // this.fakeRequest().then(() => {
        //     const el = document.getElementById("hideText");
        //     if (el) {
        //       el.remove();  // removing the spinner element
        //       this.setState({ loading: false }); // showing the app
        //     }
        //   });
        // $(window).load(function() {
        //     $('#hideText').hide();
        //   });
        // var element = document.getElementById("hideText");
        // element.classList.remove("errormessage");
        // const u = document.getElementById('hideText')
        // element.classList.remove("ml-auto mr-auto mt-lg-3 mt-3");

        // const vcipid = sessionStorage.getItem("vcipid");
        // const langid = sessionStorage.getItem("langid");
        const status = this.props.pincodeRdr.statuses?.videoconfstatus || sessionStorage.getItem("videoconfstatus");
        // const isscheduled = this.props.pincodeRdr.statuses?.isscheduled || sessionStorage.getItem("isscheduled");
        console.log("fhdfhsfx");
        if (status !== "3") {
            const stage = {
                height: "76%",
                step: 4
            }
            this.props.StageUpdateAction(stage);
        }
        // if (isscheduled === "1") {
        //     this.initiate("1");
        // } else {
        //     this.getLanguages();
        //     $('#info').modal('show');
        // }
    }

    componentWillUnmount() {
        const vcipid = sessionStorage.getItem("vcipid");
        if (vcipid) {
            window.removeEventListener('beforeunload', this.onbeforeunload);
            this.leaveCallSession();
        }
        clearInterval(this.state.intervalId);
        clearInterval(this.state.intervalId1);
    }
    // fakeRequest = () => {
    //     return new Promise(resolve => setTimeout(() => resolve(), 2500));
    //   };

    GetVcipStatus = async () => {
        await this.props.GetVcipStatusAction();
    };

    initiate = async (langid) => {
        const vcipid = sessionStorage.getItem("vcipid");
        // const langid = sessionStorage.getItem("langid");
        const status = this.props.pincodeRdr.statuses?.videoconfstatus || sessionStorage.getItem("videoconfstatus");
        // const isscheduled = this.props.pincodeRdr.statuses?.isscheduled || sessionStorage.getItem("isscheduled");

        // if (isscheduled === "1") {
        if (vcipid) {
            if (status !== undefined || status === "0") {
                if (status !== "3") {
                    await this.props.InitiateConferenceQueueAction(langid);
                    let intervalId1 = setInterval(() => {
                        if (this.props.VideoReducer.waitingList?.isscheduled === "1") {
                            if (this.props.PanRdr.scheduleDetails?.joinstatus === "-1") {
                                clearInterval(this.state.intervalId1);
                                sessionStorage.clear();
                                this.props.ResetRdrAction();
                                this.props.history.replace("/");
                                window.location.reload(true);
                                return
                            } else {
                                this.props.GetScheduleDetailsAction();
                            }
                        } else {
                            if (this.props.VideoReducer.waitingList?.token === "0") {
                                clearInterval(this.state.intervalId1);
                            } else {
                                this.checkToken();
                            }
                        }
                    }, 15000);
                    this.setState({ intervalId1: intervalId1 });
                }
            }
        }
        // } else {
        //     this.getLanguages();
        //     $('#info').modal('show');
        // }
    }


    checkToken = () => {
        this.props.UpdatedTokenNumbeAction();
    }

    waitingCall = () => {
        $('#videomodel').modal('hide');
    }

    endVideoCall = () => {
        $('#endCallModal').modal('show');
    }

    // onbeforeunload = (event) => {
    //     this.leaveSession();
    // }

    handleChangeSessionId = (e) => {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName = (e) => {
        this.setState({
            myUserName: e.target.value,
        });
    }

    deleteSubscriber = (streamManager) => {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    joinSession = () => {
        clearInterval(this.state.intervalId1);
        this.OV = new OpenVidu();
        // if (this.state.errorMessage !== "Capture Photo") {
        //     document.getElementById("inner-circle")
        //     .disabled = "true";
        //     // document.getElementsByClassName('react-html5-camera-photo').innerHtml`<div id="inner-circle" style ="background:black"}} ></div>`
        //     // document.getElementById("inner-circle").style.backgroundColor = "black";

        // }
        // document.getElementsByClassName('fas fa-camera text-dark').setAttribute("id", "inner-circle disabled")

        this.setState({
            session: this.OV.initSession(),
        }, () => {
            var mySession = this.state.session;
            mySession.on('streamCreated', (event) => {
                var subscriber = mySession.subscribe(event.stream, undefined);
                // sessionStorage.setItem("connectionId", event.stream.connection.connectionId);

                if (event.stream.typeOfVideo !== "SCREEN") {
                    sessionStorage.setItem("connectionId", event.stream.connection.connectionId);
                }
                var subscribers = this.state.subscribers;
                subscribers.push(subscriber);
                sessionStorage.setItem("subscribers", Object.keys(subscribers))
                this.setState({
                    subscribers: subscribers,
                });
            });
            mySession.on('streamDestroyed', (event) => {
                this.deleteSubscriber(event.stream.streamManager);
            });

            const $this = this;
            // const name = sessionStorage.getItem("vcipid");
            const name = sessionStorage.getItem("videoconfsessionid");
            // const name = this.props.VideoReducer.waitingList?.videoconfsessionid;
            this.props.chatCreateSession(name, $this, this.OV);
            this.props.JoinVideoAction();
            this.props.GetQuestionsAction();
            this.props.GetNotificationAction();
        });

        let intervalId = setInterval(() => {
            this.props.GetQuestionsAction();
            this.props.GetNotificationAction();
        }, 2000);
        this.setState({ intervalId: intervalId });
    }

    leaveCallSession = () => {
        const mySession = this.state.session;
        if (mySession) {
            mySession.disconnect();
        }
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: '',
            myUserName: '',
            mainStreamManager: undefined,
            publisher: undefined
        });
        sessionStorage.removeItem("session");
        // this.props.EndVideoAction();
        sessionStorage.removeItem("connectionId");
        sessionStorage.removeItem("videoconfsessionid");
        sessionStorage.removeItem("publisher");
        sessionStorage.removeItem("session");
        // this.props.history.replace("/end");
    }

    leaveSession = () => {
        const mySession = this.state.session;
        if (mySession) {
            mySession.disconnect();
        }
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: '',
            myUserName: '',
            mainStreamManager: undefined,
            publisher: undefined
        });
        sessionStorage.removeItem("session");
        this.props.EndVideoAction();
        sessionStorage.removeItem("connectionId");
        sessionStorage.removeItem("publisher");
        sessionStorage.removeItem("session");
        const endCall = this.props.VideoReducer.endVideoCall;
        if (endCall === "2") {
            $('#endCallModalByAgent').modal('show');
            this.props.ResetEndRdrAction();
            setTimeout(() => {
                $('#endCallModalByAgent').modal('hide');
                sessionStorage.setItem("width", "100%");
                sessionStorage.setItem("step", 5);
                const stage = {
                    height: "100%",
                    step: 5
                }
                this.props.StageUpdateAction(stage);
                this.props.history.replace("/end");
            }, 3000);
        } else {
            const model = {
                id: "3",
                msg: "customer ended Call"
            }
            this.props.PushNotificationAction(model);
            $('#endCallModal').modal('hide');
            sessionStorage.setItem("width", "100%");
            sessionStorage.setItem("step", 5);
            sessionStorage.setItem("step", 5);
            const stage = {
                height: "100%",
                step: 5
            }
            this.props.StageUpdateAction(stage);
            this.props.history.replace("/end");
        }
    }

    handleChangeMsg = (event) => {
        event.preventDefault();
        this.setState({
            message: event.target.value
        });
    }

    sendMessage = (event) => {
        event.preventDefault();
        const vcipid = sessionStorage.getItem("vcipid");
        const model = {
            sender: vcipid,
            vcipid: vcipid
        }
        this.state.mainStreamManager.stream.session.signal({
            data: this.state.message,
            to: [],
            type: JSON.stringify(model)
        }).then(() => {
        }).catch(error => {
        });
        this.setState({
            ...this.state,
            message: ''
        });
        document.getElementById("chatform").reset();
    }

    time = (val) => {
        return new Date(val).toLocaleTimeString("en-IN");
    }

    // TO OPEN CHAT BOX
    openbot = () => {
        $('#bot').toggleClass('botactive');
        $('#chat-id').toggleClass('chatshow');
        $('.notify-msg').removeClass('notifyactive');
        this.setState({
            bot: !this.state.bot
        })
    }

    getLanguages = async () => {
        await this.props.GetLanguagesAction();
    }

    handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    submitLanguage = async (event) => {
        event.preventDefault();
        const langid = this.state.langid;
        sessionStorage.setItem("langId", langid);
        if (langid) {
            $('#info').modal('hide');
            await this.props.GetCalenderAction(langid);
            await this.initiate(langid);
        } else {
            toast.error("Please select language");
        }
    }

    formateDate = (val) => {
        const oldDate = val;
        let newDate = oldDate?.split("-").reverse().join("-");
        return newDate;
    }

    createSchedule = async () => {
        const { langid, stime, sdate } = this.state;
        const languageId = langid || sessionStorage.getItem("langId");
        if (languageId && stime && sdate) {
            const model = {
                langid: languageId,
                stime: stime,
                sdate: sdate
            };
            const $this = this;
            try {
                const result = await this.props.CreateScheduleAction(model, $this);
            } catch (error) {

            }
            // if (this.state.createScheduleStatus) {
            //     return;
            // }
            // await this.GetVcipStatus();
            await this.initiate("1");
        } else {
            toast.error("Please select all fields");
        }
    }

    cancelSchedule = async () => {
        try {
            const $this = this.props.history;
            const result = await this.props.CancelScheduleAction($this);
            this.getLanguages();
        } catch (error) {

        }
        // await this.GetVcipStatus();
        // this.initiate("1");
    }


    handleTakePhoto = (dataUri) => {
        const base64result = dataUri.split(',')[1];
        // document.getElementsByClassName('fas fa-camera text-dark').setAttribute("id", "inner-circle-disabled")
        // $('#inner-circle #inner-circle-disabled').append('<i className="fas fa-camera text-dark"></i>');
        if (this.state.errorMessage !== "Capture Photo") {
            // $('.react-html5-camera-photo #inner-circle').append('<i className="fas fa-camera text-dark"></i>');
            this.setState({
                imgPath: null,
                imgInpStatus: true
            })
        } else {
            
            // <div id ="inner-circle disabled"></div>
            this.setState({
                imgInpStatus: false,
                imgPath: base64result
            });

        }
    }

    rotateImage = (val) => {
        if (val) {
            this.setState({
                rotateVal: this.state.rotateVal + val
            })
        }
        $("#rotateImg").css({ 'transform': 'rotate(' + this.state.rotateVal + 'deg)' });
    }

    uploadFile = (e) => {
        e.preventDefault();
        this.setState({
            spinner: true,
        });

        // $('#panDataId').modal('hide');
        const model = {
            imgPath: this.state.imgPath,
        }
        const $this = this;
        this.props.CheckImageLiveness(model, $this)

    }

    handleCameraStart = (stream) => {
        this.setState({
            streamVideo: stream
        })
    }

    handleErrorMessage = (event) => {
        this.setState({
            errorMessage: event
        })
    }

    render() {
        // if (this.state.loading) {
        //     return null; //app is not ready (fake request is in process)
        //   }
      
        // const languagesList = this.props.PanRdr.languagesList;
        // const calenderDetails = this.props.PanRdr.calenderDetails;
        // const scheduleDetails = this.props.PanRdr.scheduleDetails;

        // const myUserName = this.state.myUserName || sessionStorage.getItem("vcipid");
        // const liveStatus = this.state.session;
        const status = this.props.pincodeRdr.statuses?.videoconfstatus;
        const endCall = this.props.VideoReducer.endVideoCall;
        // const waitingList = this.props.VideoReducer.waitingList;
        const subscribers = this.state.subscribers;
        // const mainStreamManager = this.state.mainStreamManager;
        const { captureStatus, imgPath } = this.state;

        if (endCall === "2") {
            this.leaveSession();
        }
        // if (status !== undefined || status === "3") {
        //     return <Redirect to="/end" />
        // }

        const styleColor = {
            fontSize: "16px", position: "absolute", textAlign: "center", background: "rgba(255, 255, 255, 0.37)", zIndex: "1", width: "100%", paddingTop: "6px", paddingBottom: "6px"
            // paddingBottom: "4px",
            // paddingLeft:"10px", paddingRight:"10px",paddingTop: "6px",
            // paddingBottom: "4px",
        };
        if (this.state.errorMessage === "Capture Photo") {
            styleColor.color = "green";
        } else {
            styleColor.color = "red"
        }

        return (
            <Aux>
                <h6 className="heading-h6" style={{ color: "white", fontSize: "16px", }}>
                    <Text tid="chat_initial_video" /></h6>


                {/* <h6 className="ml-6 ml-md-5 mt-lg-3 mt-3" style={styleColor}>
                    {this.state.errorMessage}
                </h6> */}
                {
                    (status === undefined || status !== "3") ? (
                        <Aux>
                            <div className="row justify-content-center">
                                {captureStatus
                                    ? <div className="col-md-6">
                                        <div className="row justify-content-center">
                                       
                                            <Camera
                                                isImageMirror={false}
                                                onTakePhoto={(dataUri) => { this.state.errorMessage === "Capture Photo" ? this.handleTakePhoto(dataUri) : this.handleTakePhoto("s") }}
                                                onCameraStart={(stream) => { this.handleCameraStart(stream); }}

                                            />
                                            <FaceDetections errorMessage={this.handleErrorMessage} />

                                            {
                                                this.state.errorMessage != "Please Wait..." ? (

                                                    <h6 className="ml-auto mr-auto mt-lg-3 mt-3 errormessage" id="hideText" style={styleColor}>
                                                {this.state.errorMessage}
                                            </h6>
                                               ) : null
                                           }
                                           

                                            {/* <div className="row">
                                            <div className="col-sm-2"></div>
                                            <div className="col-sm-2"> <h6 className="ml-auto mr-auto mt-lg-3 mt-3" style={styleColor}>
               {this.state.errorMessage}
           </h6></div>
                                            <div className="col-sm-2"></div>
                                            </div> */}
                                        </div>

                                    </div>
                                    : null
                                }

                                <LivenessCapture
                                    imgSrc={imgPath}
                                    captureStatus={captureStatus}
                                    rotate={(val) => this.rotateImage(val)}
                                    upload={this.uploadFile}
                                    spinner={this.state.spinner}
                                    errorMessage = {this.state.errorMessage}
                                />
                            </div>
                        </Aux>
                    ) : <Redirect to="/end" />
                }

                <hr className="hr" />

                <div className="row justify-content-center">
                    <div className="col-md">
                        <div className="instructions sr1 border-right-0 p-0">
                            <h5 className="instructions-title mb-1 pl-0">
                                <Text tid="video_instruction" />
                            </h5>
                            <p className="text-danger small mb-3">
                                <Text tid="video_please_note" />
                            </p>
                            <ul className="instructions-list pl-4 text-white">
                                <li>
                                    <Text tid="video_ins1" />
                                </li>
                                <li>
                                    <Text tid="video_ins2" />
                                </li>
                                <li>
                                    <Text tid="video_ins3" />
                                </li>
                                <li>
                                    <Text tid="video_ins4" />
                                </li>
                                <li>
                                    <Text tid="video_ins5" />
                                </li>
                                <li>
                                    <Text tid="video_ins6" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="instructions sr1 border-right-0 p-0">
                            <div className="">
                                <img
                                    src="./assets/images/instructions.png"
                                    alt="no img"
                                    className="w-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>



                <div className="modal fade" id="endCallModalByAgent" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "auto" }} role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions border-right-0">
                                    <h6 className="instructions-title text-center m-0">
                                        <Text tid="agent_disconnected" />
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="endCallModal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "auto" }} role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions pt-4 border-right-0">
                                    <h6 className="instructions-title text-center">
                                        <Text tid="are_you_sure" />
                                    </h6>

                                    <div className="pb-3 text-center">
                                        <button type="button" className="btn custom-btn btn-secondary mr-2" data-dismiss="modal">
                                            <Text tid="no" />
                                        </button>
                                        <button type="button" onClick={this.leaveSession} className="btn custom-btn">
                                            <Text tid="yes" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade custom-modal" id="faceMatchModel" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                    <h1 className="modal-data-title">Face Photo Capture Submitted successfully!</h1>
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




            </Aux>
        )
    }
};

const mapStateToProps = (state) => {
    const { ChatReducer, VideoReducer, PanRdr, pincodeRdr, bitszReducer } = state;
    return {
        ChatReducer, VideoReducer, PanRdr, pincodeRdr, bitszReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        GetLanguagesAction: () => dispatch(GetLanguagesAction()),
        GetCalenderAction: (id) => dispatch(GetCalenderAction(id)),
        CreateScheduleAction: (model, $this) => dispatch(CreateScheduleAction(model, $this)),
        chatCreateSession: (sessionId, $this, OV) => dispatch(chatCreateSession(sessionId, $this, OV)),
        chatCreateToken: (sessionId, $this, OV) => dispatch(chatCreateToken(sessionId, $this, OV)),
        InitiateConferenceQueueAction: (lang) => dispatch(InitiateConferenceQueueAction(lang)),
        UpdatedTokenNumbeAction: () => dispatch(UpdatedTokenNumbeAction()),
        JoinVideoAction: () => dispatch(JoinVideoAction()),
        EndVideoAction: () => dispatch(EndVideoAction()),
        GetQuestionsAction: () => dispatch(GetQuestionsAction()),
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        GetNotificationAction: () => dispatch(GetNotificationAction()),
        ResetEndRdrAction: () => dispatch(ResetEndRdrAction()),
        PushNotificationAction: (model) => dispatch(PushNotificationAction(model)),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage)),
        GetScheduleDetailsAction: () => dispatch(GetScheduleDetailsAction()),
        CancelScheduleAction: ($this) => dispatch(CancelScheduleAction($this)),
        ResetRdrAction: () => dispatch(ResetRdrAction()),
        CheckImageLiveness: (modal, $this) => dispatch(CheckImageLiveness(modal, $this)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reschedule);
