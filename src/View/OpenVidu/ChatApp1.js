import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
// import './App.css';
import UserVideoComponent from './UserVideoComponent';
import { connect } from 'react-redux';
import { chatCreateSession, chatCreateToken } from '../../Store/Actions/UsersActions/ChatAction';
import ChatCmp from '../../Component/ChatCmp/ChatCmp';


// const OPENVIDU_SERVER_URL = 'https://demos.openvidu.io:4443';
// const OPENVIDU_SERVER_SECRET = 'MY_SECRET';


class ChatApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'syz',
            // myUserName: 'Participant' + Math.floor(Math.random() * 100),
            myUserName: '',
            session: undefined,
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],
        };

        // this.joinSession = this.joinSession.bind(this);
        // this.leaveSession = this.leaveSession.bind(this);
        // this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        // this.handleChangeUserName = this.handleChangeUserName.bind(this);
        // this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        // this.onbeforeunload = this.onbeforeunload.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
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

    handleMainVideoStream = (stream) => {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
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
        this.OV = new OpenVidu();
        this.setState({
            session: this.OV.initSession(),
        }, () => {
            var mySession = this.state.session;
            mySession.on('streamCreated', (event) => {
                var subscriber = mySession.subscribe(event.stream, undefined);
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
            this.props.chatCreateSession("syz")
            this.props.chatCreateToken("syz", $this, this.OV)
            // }
            // else {
            //     alert("error")
            // }
        },
        );
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
            mySessionId: 'syz',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    // msg = () => {

    //     const name = sessionStorage.getItem("session")
    //     name.on('signal:my-chat', (event) => {
    //         console.log(event.data); // Message
    //         console.log(event.from); // Connection object of the sender
    //         console.log(event.type); // The type of message ("my-chat")
    //     });
    // }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;

        return (
            <div className="container">
                {/* <button onClick={this.msg}>Click</button> */}


                {this.state.session === undefined ? (<div className="row justify-content-center">
                    <div className="col-md-4">
                        <form className="custom-form sr1" onSubmit={this.joinSession}>
                            <div className="form-group position-relative">
                                <label className="custom-label" htmlFor="">V-CIP Number</label>
                                <input
                                    type="text"
                                    className="form-control custom-inp"
                                    id="userName"
                                    value={myUserName}
                                    onChange={(e) => this.handleChangeUserName(e)}
                                    required
                                    placeholder="V-CIP Number"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="custom-btn">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>) : (null)}



                {this.state.session !== undefined ? (<div className="row justify-content-center mt-4">
                    <div className="col-md-7">
                        <div className="row m-0">
                            <div className="col-md">
                                <div className="video-chat border-left-0  sr1">
                                    <h2 className="live-title">CUSTOMER</h2>
                                    <div className="customer-video">
                                        {this.state.mainStreamManager !== undefined ? (
                                            <div id="main-video" className="col-md-6">
                                                <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="video-chat sr1">
                                    <h2 className="live-title">Banker</h2>
                                    <div className="customer-video">
                                        {this.state.subscribers.map((sub, i) => (
                                            <div key={i} className="stream-container" onClick={() => this.handleMainVideoStream(sub)}>
                                                <UserVideoComponent streamManager={sub} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-100">
                                        <button className="custom-btn" onClick={this.leaveSession}>
                                            Leave session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <ChatCmp />
                        {/* <div className="chat-section">
                            <div className="info border-right-0">
                                <h2 className="info-title">CHAT</h2>
                                <div className="chat sr1">
                                    <div className="chat-box">
                                        <div className="message-box message-box1">
                                            <div className="bank-msg">
                                                <div className="media">
                                                    <div className="media-body chat-right">
                                                        <p className="chat-msg">Lorem ipsum</p>
                                                        <p className="chat-time text-right">7.30</p>
                                                    </div>
                                                    <img
                                                        src="./assets/images/user.png"
                                                        className="ml-2 chat-img"
                                                        alt="no img"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="message-box message-box2">
                                            <div className="user-msg">
                                                <div className="media">
                                                    <img
                                                        src="./assets/images/live.png"
                                                        className="mr-2 chat-img"
                                                        alt="no img"
                                                    />
                                                    <div className="media-body chat-left">
                                                        <p className="chat-msg">
                                                            Lorem ipsum Lorem ipsum dolor sit. Lorem ipsum dolor sit
                                                            amet.
                    </p>
                                                        <p className="chat-time text-left">7.30</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="message-box message-box2">
                                            <div className="user-msg">
                                                <div className="media">
                                                    <img
                                                        src="./assets/images/live.png"
                                                        className="mr-2 chat-img"
                                                        alt="no img"
                                                    />
                                                    <div className="media-body chat-left">
                                                        <p className="chat-msg">
                                                            Lorem ipsum Lorem ipsum dolor sit. Lorem ipsum dolor sit
                                                            amet.
                    </p>
                                                        <p className="chat-time text-left">7.30</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="message-box message-box1">
                                            <div className="bank-msg">
                                                <div className="media">
                                                    <div className="media-body chat-right">
                                                        <p className="chat-msg">Lorem ipsum</p>
                                                        <p className="chat-time text-right">7.30</p>
                                                    </div>
                                                    <img
                                                        src="./assets/images/user.png"
                                                        className="ml-2 chat-img"
                                                        alt="no img"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="message-box message-box1">
                                            <div className="bank-msg">
                                                <div className="media">
                                                    <div className="media-body chat-right">
                                                        <p className="chat-msg">Lorem ipsum</p>
                                                        <p className="chat-time text-right">7.30</p>
                                                    </div>
                                                    <img
                                                        src="./assets/images/user.png"
                                                        className="ml-2 chat-img"
                                                        alt="no img"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <form className="chat-form">
                                        <div className="form-group position-relative">
                                            <button type="button" className="chat-icon icon1">
                                                <i className="fas fa-paperclip" />
                                            </button>
                                            <input
                                                type="text"
                                                className="chat-inp"
                                                name="message"
                                                placeholder="Type Your Message"
                                            />
                                            <button type="button" className="chat-icon icon2">
                                                <i className="fas fa-microphone" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>) : (null)}


                {/* {this.state.session !== undefined ? (
                    <div id="session">
                        <div id="session-header">
                            <h1 id="session-title">{mySessionId}</h1>
                            <input
                                className="btn btn-large btn-danger"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="Leave session"
                            />
                        </div>

                        {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="col-md-6">
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />
                            </div>
                        ) : null}
                        <div id="video-container" className="col-md-6">
                            {this.state.publisher !== undefined ? (
                                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                    <UserVideoComponent
                                        streamManager={this.state.publisher} />
                                </div>
                            ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (null)} */}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const { ChatReducer } = state;
    return { ChatReducer }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chatCreateSession: (sessionId) => dispatch(chatCreateSession(sessionId)),
        chatCreateToken: (sessionId, $this, OV) => dispatch(chatCreateToken(sessionId, $this, OV))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
