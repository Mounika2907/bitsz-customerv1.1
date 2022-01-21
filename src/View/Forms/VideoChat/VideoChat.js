import React, { Component } from 'react'
import Aux from '../../../hoc/Aux';
import VideoChatCmp from '../../../Component/Forms/VideoChatCmp.js/VideoChatCmp';
// import ChatApp from '../../OpenVidu/ChatApp';

class VideoChat extends Component {
    state = {
        publisher: undefined,
        subscribers: {},
        mainStreamManager: undefined
    }
    componentDidMount() {
        this.loadScripts();
        const banker = sessionStorage.getItem("publisher");
        const customer = sessionStorage.getItem("subscribers");
        this.setState({
            ...this.state,
            publisher: banker,
            subscribers: customer
        })
    }

    handleMainVideoStream = (stream) => {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload = (event) => {
        this.leaveSession();
    }

    loadScripts = () => {
        const dynamicScripts = [
            '/js/script.js',
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
    render() {
        const { publisher, subscribers } = this.state;
        return (
            <Aux>
                {/* <ChatApp /> */}
                {/* <div className="row justify-content-center"> */}
                <VideoChatCmp
                    banker={publisher}
                    customer={subscribers}
                    videoStream={(stream) => this.handleMainVideoStream(stream)}

                />
                {/* </div> */}
            </Aux>
        )
    }
}

export default VideoChat;
