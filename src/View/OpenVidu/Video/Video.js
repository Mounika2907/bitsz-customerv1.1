import React, { Component } from 'react';
import OpenViduSession from 'openvidu-react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Aux';
import { chatCreateSession, chatCreateToken } from '../../../Store/Actions/UsersActions/ChatAction';

class Video extends Component {
    state = {
        mySessionId: 'SessionA',
        myUserName: 'User' + Math.floor(Math.random() * 100),
        token: undefined,
        session: undefined,
        messageList: [],
        message: ''
    }

    componentDidMount() {

    }



    handlerJoinSessionEvent = () => {
        console.log('Join session');
    }

    handlerLeaveSessionEvent = () => {
        console.log('Leave session');
        this.setState({
            session: undefined,
            token: undefined
        });
        this.props.ChatReducer.token = undefined;
    }

    handlerErrorEvent = () => {
        console.log('Leave session');
    }

    handleChangeSessionId = (e) => {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    joinSession = (event) => {
        event.preventDefault();
        if (this.state.mySessionId && this.state.myUserName) {
            const $this = this.state;
            this.props.chatCreateSession(this.state.mySessionId)
            this.props.chatCreateToken(this.state.mySessionId, $this)
            // this.sendMessage();
            // if (this.props.ChatReducer.token) {
            //     this.setState({
            //         ...this.state,
            //         session: true
            //     });
            // }
        }
        else {
            alert("error")
        }
    }


    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const session = this.state.session;
        // const token = this.state.token;

        return (
            <Aux>
                {session === undefined ? (<div className="row justify-content-center" id="join">
                    <div className="col-md-6" id="join-dialog">
                        <form className="form mt-5" onSubmit={this.joinSession}>
                            <h1 className="text-center">Join Video Call</h1>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="userName">Participant</label>
                                <input type="text"
                                    id="userName"
                                    onChange={(e) => this.handleChangeUserName(e)}
                                    className="form-control"
                                    value={myUserName} required />
                            </div>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="sessionId">Session</label>
                                <input type="text"
                                    id="sessionId"
                                    onChange={(e) => this.handleChangeSessionId(e)}
                                    className="form-control"
                                    value={mySessionId} required />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn custom-btn">Join</button>
                                {/* <button type="reset" className="btn custom-btn ml-3">Clear</button> */}
                            </div>
                        </form>

                    </div>
                </div>) : (
                        <div id="session">
                            {/* {this.props.ChatReducer.token ? */}
                            {/* <OpenViduSession
                                id="opv-session"
                                sessionName={mySessionId}
                                user={myUserName}
                                token={this.props.ChatReducer.token}
                                joinSession={this.handlerJoinSessionEvent}
                                leaveSession={this.handlerLeaveSessionEvent}
                                error={this.handlerErrorEvent}
                            /> */}
                            {/* : null } */}
                        </div>
                    )}

            </Aux>
        )
    }

}

const mapStateToProps = (state) => {
    const { ChatReducer } = state;
    return { ChatReducer }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chatCreateSession: (sessionId) => dispatch(chatCreateSession(sessionId)),
        chatCreateToken: (sessionId, $this) => dispatch(chatCreateToken(sessionId, $this))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);