import React from 'react';
import Aux from '../../../hoc/Aux';
// import UserVideoComponent from '../../../View/OpenVidu/UserVideoComponent';

const VideoChatCmp = (props) => {
    return (
        <Aux>
            <div className="row justify-content-center mt-4">
                <div className="col-md-7">
                    <div className="row m-0">
                        <div className="col-md">
                            <div className="video-chat border-left-0 sr1">
                                <h2 className="live-title">Banker</h2>
                                <div className="customer-video">
                                    <img src="./assets/images/live.png" className="w-100 h-100" alt="no img" />
                                    {/* <div className="w-100 h-100" onClick={props.videoStream(props.banker)}>
                                        <UserVideoComponent
                                            streamManager={props.banker}
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="video-chat sr1">
                                <h2 className="live-title">CUSTOMER</h2>
                                <div className="customer-video">
                                    <img src="./assets/images/live.png" className="w-100 h-100" alt="no img" />
                                    {/* {props.customer?.map((sub, i) => (
                                        <div key={i} className="w-100 h-100" onClick={props.videoStream(sub)}>
                                            <UserVideoComponent
                                                streamManager={sub}
                                            />
                                        </div>
                                    ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="chat-section">
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
                    </div>
                </div>
            </div>

        </Aux>
    )
}

export default VideoChatCmp
