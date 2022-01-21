// import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
// import './App.css';
import UserVideoComponent from './UserVideoComponent';
import { connect } from 'react-redux';
import { chatCreateSession, chatCreateToken } from '../../Store/Actions/UsersActions/ChatAction';
import ChatCmp from '../../Component/ChatCmp/ChatCmp';
import {
    InitiateConferenceQueueAction,
    JoinVideoAction, EndVideoAction, GetQuestionsAction, GetVcipStatusAction,
    UpdatedTokenNumbeAction
} from '../../Store/Actions/ProcessAction';
import Aux from '../../hoc/Aux';
import { Redirect } from 'react-router-dom';
import { GetNotificationAction, PushNotificationAction, StageUpdateAction } from '../../Store/Actions/GenerateAction';
import { ResetEndRdrAction } from '../../Store/Actions/UsersActions/UserActions';
import { Text } from '../Language/Language';
const $ = window.$;

class ChatApp extends Component {
    state = {
        mySessionId: 'syz',
        // myUserName: 'Participant' + Math.floor(Math.random() * 100),
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
        intervalId1: undefined

    };


    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
        const vcipid = sessionStorage.getItem("vcipid");
        const status = this.props.pincodeRdr.statuses?.videoconfstatus || sessionStorage.getItem("videoconfstatus");
        if (status !== "3") {
            const stage = {
                height: "76%",
                step: 4
            }
            this.props.StageUpdateAction(stage);
        }
        if (vcipid) {
            // this.props.GetVcipStatusAction();
            // if (status === "0") {
            //     let intervalId = setInterval(() => {
            //         this.props.GetQuestionsAction();
            //     }, 3000);
            //     this.setState({ intervalId: intervalId });
            // }
            if (status !== undefined || status === "0") {
                if (status !== "3") {
                    this.props.InitiateConferenceQueueAction("1");
                    let intervalId1 = setInterval(() => {
                        if (this.props.VideoReducer.waitingList.token === "0") {
                            clearInterval(this.state.intervalId1);
                        } else {
                            this.checkToken();
                        }
                    }, 15000);
                    this.setState({ intervalId1: intervalId1 });
                }
            }
        }
        this.setState({
            myUserName: vcipid
        });
    }

    componentWillUnmount() {
        const vcipid = sessionStorage.getItem("vcipid");
        if (vcipid) {
            window.removeEventListener('beforeunload', this.onbeforeunload);
            // this.props.GetVcipStatusAction();
            // this.props.InitiateConferenceQueueAction("1");
            this.leaveCallSession();
        }
        clearInterval(this.state.intervalId);
        clearInterval(this.state.intervalId1);
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

    onbeforeunload = (event) => {
        this.leaveSession();
    }

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
        this.setState({
            session: this.OV.initSession(),
        }, () => {
            var mySession = this.state.session;
            mySession.on('streamCreated', (event) => {
                var subscriber = mySession.subscribe(event.stream, undefined);
                // sessionStorage.setItem("connectionId", event.stream.connection.connectionId);
                // if (event.stream.typeOfVideo !== "SCREEN") {
                    sessionStorage.setItem("connectionId", event.stream.connection.connectionId);
                // }
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
            const name = sessionStorage.getItem("vcipid");
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
        sessionStorage.removeItem("publisher");
        sessionStorage.removeItem("session");
        // this.props.history.push("/end");
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

    render() {
        // const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName || sessionStorage.getItem("vcipid");
        const liveStatus = this.state.session;
        const status = this.props.pincodeRdr.statuses?.videoconfstatus;
        const endCall = this.props.VideoReducer.endVideoCall;
        if (endCall === "2") {
            this.leaveSession();
        }

        return (
            <div className="">
                {(status === undefined || status !== "3") ? (<Aux>
                    {liveStatus === undefined ? (<div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="video-join">
                                <form className="custom-form sr1">
                                    <div className="form-group position-relative">
                                        {this.props.VideoReducer.waitingList.token !== "0" ? <h6 className="text-center">
                                            <Text tid="please_wait" />
                                        </h6> : null}
                                        <h5 className="text-center">
                                            <Text tid="token" />
                                            {this.props.VideoReducer.waitingList.token}</h5>
                                        <div className="video-join-box">
                                            <img src="./assets/images/customer.png" alt="no img" />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control custom-inp d-none"
                                            id="userName"
                                            value={myUserName}
                                            onChange={(e) => this.handleChangeUserName(e)}
                                            required
                                            placeholder="V-CIP Number"
                                        />
                                    </div>
                                    <div className="text-center">
                                        {this.props.VideoReducer.waitingList.token === "0"
                                            ? (<button type="button" className="custom-btn" onClick={this.joinSession}>
                                                <Text tid="join" />
                                            </button>
                                            ) :
                                            (<button type="button" className="custom-btn" disabled>
                                                <Text tid="join" />
                                            </button>)
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>) : (<Aux><h5 className="heading mb-0">
                            <Text tid="video_call_process" />
                        </h5>
                        <p className="small text-danger text-center mb-4">
                            <Text tid="under_recording_mode" />
                        </p>
                    </Aux>
                        )}

                    {liveStatus !== undefined ? (<div className="row justify-content-center mt-4">
                        <div className="col-md-8">
                            <div className="row m-0">
                                <div className="col-md">
                                    <div className="video-chat border-left-0  sr1">
                                        <h2 className="live-title">
                                            <Text tid="user" />
                                             - {myUserName}</h2>
                                        <div className="customer-video">
                                            {this.state.subscribers.length !== 0 ? null
                                                : <p className="text-center text-danger">
                                                    <Text tid="waiting_for_banker" />
                                                </p>
                                            }
                                            {this.state.subscribers.map((sub, i) => {
                                                if (sub.stream.typeOfVideo !== "SCREEN") {
                                                    return <div key={i} className="stream-container othervideo">
                                                        <UserVideoComponent streamManager={sub} />
                                                    </div>
                                                }
                                            })}
                                            <div className="myvideo">
                                                {this.state.mainStreamManager !== undefined ? (
                                                    <div id="main-video">
                                                        <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                                    </div>
                                                ) : null}
                                            </div>

                                            <div className="qtn-display">
                                                <p className="qtn-display-p">
                                                    {this.props.PanRdr?.singleQuestion.map((res) => (
                                                        res.ques
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-100 text-center">
                                            <button className="custom-btn bg-danger mt-2" onClick={this.endVideoCall} style={{ width: "auto" }}>
                                                <i className="fas fa-phone" style={{ transform: "rotate(-135deg)" }}></i>
                                            </button>
                                        </div>
                                        <div className="questions mt-2">
                                            <ul className="nav qtn-nav">
                                                <li className="qtn-item">
                                                    <div className="dropdown">
                                                        <button className="bg-info qtn-btn qtn-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Q</button>
                                                    </div>
                                                </li>
                                                {this.props.PanRdr.questions?.map((qtn, i) => <li className="qtn-item" key={i}>
                                                    <button className={`qtn-btn ${qtn.status === '0' ? '' : qtn.status === '-1' ? 'reject' : 'active'}`}>
                                                        {qtn.status === "0" ? qtn.sno : qtn.status === "-1" ? <i class="fas fa-times"></i> : <i className="fas fa-check" />}
                                                    </button>
                                                </li>)
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bot">
                            <button className="chat-bot" id="bot" onClick={this.openbot}>
                                <span className="notify-msg"></span>
                                {this.state.bot ?
                                    <span className="close-chat"><i className="fas fa-times"></i></span> :
                                    <span className="close-chat"><i className="far fa-comment-alt"></i></span>
                                }
                            </button>
                            <div className="bot-box" id="chat-id">
                                <ChatCmp send={this.sendMessage}
                                    changeMsg={this.handleChangeMsg}
                                    myMessage={this.state.myMessage}
                                    bankerStatus={this.state.subscribers}
                                    bulk={this.state.msgArr}
                                    time={(val) => this.time(val)}
                                    bankerMessage={this.state.bankerMessage} />
                            </div>
                        </div>
                    </div>) : (null)}



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
                                <ul className="instructions-list pl-4">
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
                                    <img src="./assets/images/instructions.png" alt="no img" className="w-100" />
                                </div>
                            </div>
                        </div>
                    </div>

                </Aux>) :
                    (<Redirect to="/end" />)}

                <div className="modal fade" id="videomodel" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "50%" }} role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions pt-4 border-right-0">
                                    <h6 className="instructions-title text-center">
                                        {this.props.VideoReducer.error ?
                                            this.props.VideoReducer.error :
                                            (<span>
                                                {this.props.VideoReducer.waitingList.token !== "0" ? (<Aux>
                                                    At present, all our bankers are busy your token number is
                                                    <span className="badge badge-danger ml-2">{this.props.VideoReducer.waitingList.token}</span>
                                                </Aux>) : (
                                                        (<span>Token No
                                                            <span className="badge badge-danger ml-2">{this.props.VideoReducer.waitingList.token}</span>
                                                            <br />
                                                        Please Join the Video call within 10 Secs.
                                                        </span>)
                                                    )}</span>)

                                        }
                                    </h6>
                                    <div className="instructions border-right-0 pb-0">
                                        <h5 className="instructions-title mb-1 pl-0">Video call Instructions:</h5>
                                        <p className="text-danger small mb-3">Please Note: Poor image/video quality may result in errors</p>
                                        <ul className="instructions-list pl-4">
                                            <li>
                                                Please make sure you are alone in the Video call.
                                        </li>
                                            <li>
                                                The background should be plain during the Video call.
                                        </li>
                                            <li>
                                                Enough light should be there in the room.
                                        </li>
                                            <li>
                                                Always make sure you are facing the camera by covering 70% of screen with your face to avoid background noise.
                                        </li>
                                            <li>
                                                Avoid Motion blur effect  during photo capturing process.
                                        </li>
                                            <li>
                                                Keep your eyes open during photo capturing process.
                                        </li>
                                        </ul>
                                    </div>
                                    <div className="my-3">
                                        <img src="./assets/images/instructions.png" alt="no img" className="w-100" />
                                    </div>
                                    <div className="pb-3 text-center">
                                        <button type="button" onClick={this.waitingCall} className="btn custom-btn">Ok</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="join" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions pt-4 border-right-0">
                                    <h6 className="instructions-title text-center">
                                        {this.props.VideoReducer.error ?
                                            this.props.VideoReducer.error :
                                            (<span>Token No
                                                <span className="badge badge-danger ml-2">{this.props.VideoReducer.waitingList.token}</span>
                                                <br />
                                                Please Join the Video call within 10 Secs.
                                            </span>)
                                        }
                                    </h6>
                                    <div className="instructions border-right-0 pb-0">
                                        <h5 className="instructions-title mb-1 pl-0">Video call Instructions:</h5>
                                        <p className="text-danger small mb-3">Please Note: Poor image/video quality may result in errors</p>
                                        <ul className="instructions-list pl-4">
                                            <li>
                                                Please make sure you are alone in the Video call.
                                        </li>
                                            <li>
                                                The background should be plain during the Video call.
                                        </li>
                                            <li>
                                                Enough light should be there in the room.
                                        </li>
                                            <li>
                                                Always make sure you are facing the camera by covering 70% of screen with your face to avoid background noise.
                                        </li>
                                            <li>
                                                Avoid Motion blur effect  during photo capturing process.
                                        </li>
                                            <li>
                                                Keep your eyes open during photo capturing process.
                                        </li>
                                        </ul>
                                    </div>
                                    <div className="my-3">
                                        <img src="./assets/images/instructions.png" alt="no img" className="w-100" />
                                    </div>
                                    <div className="pb-3 text-center">
                                        <button type="button" onClick={this.joinSession} className="btn custom-btn">Ok</button>
                                    </div>
                                </div>
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

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const { ChatReducer, VideoReducer, PanRdr, pincodeRdr } = state;
    return { ChatReducer, VideoReducer, PanRdr, pincodeRdr }
}

const mapDispatchToProps = (dispatch) => {
    return {
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
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
