import React from 'react';
import Aux from '../../hoc/Aux';

const ChatCmp = (props) => {
    const val = sessionStorage.getItem('connectionId');
    // time = (val) => {
    //     return new Date(val).toLocaleTimeString("en-US");
    // }
    return (
        <Aux>
            <div className="chat-section">
                <div className="info border-right-0">
                    <h2 className="info-title">CHAT</h2>
                    <div className="chat">
                        <div className="chat-box" id="chatbox">
                            {props.bankerStatus.length !== 0 ? null : <p className="text-center small text-muted">
                                Once, The call has been attended by the banker you will be able to chat with him/her.</p>}
                            {props.bulk.map((res, i) => res.from.connectionId !== val ?
                                (<div key={i} className="message-box message-box1">
                                    <div className="bank-msg">
                                        <div className="media">
                                            <div className="media-body chat-right">
                                                <p className="chat-msg">{res.data}</p>
                                                <p className="chat-time text-right">{props.time(res.from.creationTime)}</p>
                                            </div>
                                            <img src="./assets/images/user.png" className="ml-2 chat-img border" alt="no img" />
                                        </div>
                                    </div>
                                </div>) :
                                (<div key={i} className="message-box message-box2">
                                    <div className="user-msg">
                                        <div className="media">
                                            <img src="./assets/images/live.png" className="mr-2 chat-img border" alt="no img" />
                                            <div className="media-body chat-left">
                                                <p className="chat-msg">{res.data}</p>
                                                <p className="chat-time text-left">{props.time(res.from.creationTime)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            )}

                        </div>
                        {props.bankerStatus.length !== 0 ? <form className="chat-form" onSubmit={props.send} autoComplete="off" id="chatform">
                            <div className="form-group position-relative">
                                <button type="button" className="chat-icon icon1">
                                    <i className="fas fa-paperclip" />
                                </button>
                                <input
                                    type="text"
                                    className="chat-inp"
                                    name="message"
                                    onChange={props.changeMsg}
                                    placeholder="Type Your Message"
                                />

                                <button type="submit" className="chat-icon icon2">
                                    {/* <i className="fas fa-microphone" /> */}
                                    <i className="fas fa-paper-plane" style={{ transform: "rotate(45deg)" }}></i>
                                </button>
                            </div>
                        </form> : <form className="chat-form" id="chatform">
                                <div className="form-group position-relative">
                                    <button type="button" className="chat-icon icon1">
                                        <i className="fas fa-paperclip" />
                                    </button>
                                    <input
                                        type="text"
                                        className="chat-inp"
                                        name="message"
                                        disabled
                                        placeholder="Type Your Message"
                                    />
                                    <button type="button" disabled className="chat-icon icon2">
                                        <i className="fas fa-paper-plane" style={{ transform: "rotate(45deg)" }}></i>
                                    </button>
                                </div>
                            </form>}
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default ChatCmp;
