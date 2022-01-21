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
const $ = window.$;

class ChatAppMobile extends Component {
    // constructor(props) {
    //     super(props);

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
            intervalId: undefined

        };

    // }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
        const id = this.props.match.params.id;
        sessionStorage.setItem("vcipid", id);        
        const vcipid = id;
        const status = this.props.pincodeRdr.statuses?.videoconfstatus;

        if (vcipid) {
            this.props.GetVcipStatusAction();
            // if (status === "0") {
            //     let intervalId = setInterval(() => {
            //         this.props.GetQuestionsAction();
            //     }, 3000);
            //     this.setState({ intervalId: intervalId });
            // }
            if (status !== undefined && status !== "3") {
                this.props.InitiateConferenceQueueAction("1");
            }
        }

        this.setState({
            myUserName: vcipid
        });

        if (vcipid) {
            if (status === "0") {
                $('#videomodel').modal('show');
                $('#videomodel').modal({
                    keyboard: false
                });
            }
            // if (status === "1") {
            //     $('#videomodel').modal('hide');
            // }
        }
    }

    checkToken = () => {
        this.props.UpdatedTokenNumbeAction();
    }

    waitingCall = () => {
        $('#videomodel').modal('hide');
    }


    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        this.props.GetVcipStatusAction();
        this.props.InitiateConferenceQueueAction("1");
        clearInterval(this.state.intervalId);
        this.leaveCallSession();
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

    // handleMainVideoStream = (stream) => {
    //     if (this.state.mainStreamManager !== stream) {
    //         this.setState({
    //             mainStreamManager: stream
    //         });
    //     }
    // }

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
        this.OV = new OpenVidu();
        this.setState({
            session: this.OV.initSession(),
        }, () => {
            var mySession = this.state.session;
            mySession.on('streamCreated', (event) => {
                var subscriber = mySession.subscribe(event.stream, undefined);
                sessionStorage.setItem("connectionId", event.stream.connection.connectionId);
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

            // if (this.state.mySessionId) {
            const $this = this;
            const id = this.props.match.params.id;
            const name = id;
            this.props.chatCreateSession(name, $this, this.OV);
            // this.props.chatCreateToken(name, $this, this.OV);
            this.props.JoinVideoAction();
            this.props.GetQuestionsAction();
            // }
            // else {
            //     alert("error")
            // }
        },
        );

        let intervalId = setInterval(() => {
            this.props.GetQuestionsAction();
        }, 3000);
        this.setState({ intervalId: intervalId });
        // sessionStorage.setItem("liveStatus", this.state.session)
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
        this.props.history.replace("/end");
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
        this.props.history.replace("/end");
    }

    handleChangeMsg = (event) => {
        event.preventDefault();
        this.setState({
            message: event.target.value
        });
    }

    sendMessage = (event) => {
        event.preventDefault();
        const id = this.props.match.params.id;
        const vcipid = id;
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
            // console.error(error);
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


    render() {
        // const mySessionId = this.state.mySessionId;
        const id = this.props.match.params.id;
        const myUserName = this.state.myUserName || id;
        const liveStatus = this.state.session;
        const status = this.props.pincodeRdr.statuses?.videoconfstatus;
        // console.log(this.props.PanRdr?.question[4]);


        if (this.props.PanRdr.questions[4]?.status === "1") {
            // debugger
            clearInterval(this.state.intervalId)
        }

        // if (status === "1") {
        //     $('#videomodel').modal('hide');
        // }
        // if (sessionStorage.getItem("vcipid")) {
        //     if (status === "0") {
        //         $('#videomodel').modal('show');
        //         $('#videomodel').modal({
        //             keyboard: false
        //         });            
        //     }
        // }

        return (
            <div className="container">
                {(status === undefined || status !== "3") ? (<Aux>
                    {liveStatus === undefined ? (<div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="video-join">
                                <form className="custom-form sr1" onSubmit={this.joinSession}>
                                    <div className="form-group position-relative">
                                        <div className="video-join-box">
                                            M
                                    </div>
                                        {/* <label className="custom-label" htmlFor="">V-CIP Number</label> */}
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
                                            ? (<button type="submit" className="custom-btn">
                                                Join Now
                                            </button>) :
                                            (<button type="button" className="custom-btn" data-toggle="modal" onClick={this.checkToken} data-target="#videomodel">
                                                Check Token
                                            </button>)
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>) : (null)}

                    {liveStatus !== undefined ? (<div className="row justify-content-center mt-4">
                        <div className="col-md-7">
                            <div className="row m-0">
                                <div className="col-md">
                                    <div className="video-chat border-left-0  sr1">
                                        <h2 className="live-title">CUSTOMER</h2>
                                        <div className="customer-video">
                                            {this.state.subscribers.map((sub, i) => (
                                                <div key={i} className="stream-container othervideo">
                                                    <UserVideoComponent streamManager={sub} />
                                                </div>
                                            ))}
                                            <div className="myvideo">
                                                {this.state.mainStreamManager !== undefined ? (
                                                    <div id="main-video">
                                                        <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="w-100 text-center">
                                            <button className="custom-btn bg-danger" onClick={this.leaveSession} style={{ width: "auto" }}>
                                                <i className="fas fa-phone" style={{ transform: "rotate(-135deg)" }}></i>
                                            </button>
                                        </div>
                                        <div className="questions">
                                            <ul className="nav qtn-nav">
                                                <li className="qtn-item">
                                                    <div className="dropdown">
                                                        <button className="bg-info qtn-btn qtn-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Q</button>
                                                    </div>
                                                </li>
                                                {this.props.PanRdr.questions?.map((qtn, i) => <li className="qtn-item" key={i}>
                                                    <button className={`qtn-btn ${qtn.status === '0' ? '' : 'active'}`}>
                                                        {qtn.status === "0" ? qtn.quesid : <i className="fas fa-check" />}
                                                    </button>
                                                </li>)
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md">
                                    <div className="video-chat sr1">
                                        <h2 className="live-title">Banker</h2>
                                        <div className="customer-video">
                                            {this.state.subscribers.map((sub, i) => (
                                                <div key={i} className="stream-container">
                                                    <UserVideoComponent streamManager={sub} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-5">
                            <ChatCmp send={this.sendMessage}
                                changeMsg={this.handleChangeMsg}
                                myMessage={this.state.myMessage}
                                bulk={this.state.msgArr}
                                time={(val) => this.time(val)}
                                bankerMessage={this.state.bankerMessage} />
                        </div>
                    </div>) : (null)}

                </Aux>) :
                    (<h1 className="text-center text-success">This process is Completed</h1>)}

                <div className="modal fade" id="videomodel" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions pt-4">
                                    <h6 className="instructions-title text-center">
                                        {this.props.VideoReducer.error ?
                                            this.props.VideoReducer.error :
                                            (<span>At Present, All Our Bankers Are Busy We Apologise To Keep You On Wait Your token number Is
                                                <span className="badge badge-danger ml-2">{this.props.VideoReducer.waitingList.token}</span></span>)
                                        }
                                    </h6>
                                    <div className="pb-3 text-center">
                                        <button type="button" onClick={this.waitingCall} className="btn custom-btn">Ok</button>
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
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatAppMobile);
