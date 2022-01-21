import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }
    // msg = () => {


    //     this.props.streamManager.stream.session.on('signal:my-chat', (event) => {
    //         console.log(event.data); // Message
    //         console.log(event.from); // Connection object of the sender
    //         console.log(event.type); // The type of message ("my-chat")
    //     });

    //     this.props.streamManager.stream.session.signal({
    //         data: 'My custom message',  // Any string (optional)
    //         to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
    //         type: 'my-chat'             // The type of message (optional)
    //     })
    //         .then(() => {
    //             console.log('Message successfully sent');
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }

    render() {
        return (
            <div>
                {/* <button onClick={this.msg}>Click</button> */}

                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        {/* <div><p>{this.getNicknameTag()}</p></div> */}
                    </div>
                ) : null}
            </div>
        );
    }
}
