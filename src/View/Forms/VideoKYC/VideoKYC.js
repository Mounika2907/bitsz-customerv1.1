import React, { Component } from 'react'
import Aux from '../../../hoc/Aux';
import VideoKYCCmp from '../../../Component/Forms/VideoKYCCmp/VideoKYCCmp';

class VideoKYC extends Component {
    // componentDidMount() {
    //     this.loadScripts();
    // }

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

    startSession = () => {
        sessionStorage.setItem("width", "70%");
        sessionStorage.setItem("step", 5);
        this.props.history.replace("/video-chat")
    }

    render() {
        return (
            <Aux>
                <VideoKYCCmp start={this.startSession}/>
            </Aux>
        )
    }
}

export default VideoKYC;
