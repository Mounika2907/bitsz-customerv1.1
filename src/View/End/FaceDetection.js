import React from "react";
import * as faceApi from "face-api.js";
const $ = window.$;

// import "./styles.css";

// const expressionMap = {
//     neutral: "😶",
//     happy: "😄",
//     sad: "😞",
//     angry: "🤬",
//     fearful: "😖",
//     disgusted: "🤢",
//     surprised: "😲"
// };

class FaceDetections extends React.Component {
    video = React.createRef();
    canvas = React.createRef();
    state = { expressions: [], message: "" };

    componentDidMount() {
        this.run();
    }

    log = (...args) => {
        console.log(...args);
    };

    run = async () => {
        this.log("run started");
        try {
            await faceApi.nets.tinyFaceDetector.load("/models/");
            // await faceApi.loadFaceExpressionModel(`/models/`);
            this.mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" }
            });

            this.video.current.srcObject = this.mediaStream;
        } catch (e) {
            this.log(e.name, e.message, e.stack);
        }
    };

    singleFaceDetector = async () => {
        // const result = await faceApi
        //     .detectSingleFace(this.video.current, options).withFaceExpressions();
        try {
            const result = await faceApi.detectSingleFace(this.video.current, new faceApi.TinyFaceDetectorOptions())
            const displaySize = { width: result._imageDims._width, height: result._imageDims._height }
            try {
                const detectionsForSize = faceApi.resizeResults(result, { width: displaySize.width, height: displaySize.height })
                const canvas = document.getElementById('overlay')
                faceApi.matchDimensions(canvas, displaySize)
                faceApi.draw.drawDetections(canvas, detectionsForSize)
            } catch (er) {
                console.error('inside er', er)
            }
        } catch (e) {
            console.error(e, 'erro with')
        }
    }

    onPlay = async () => {
        if (
            this.video.current.paused ||
            this.video.current.ended ||
            !faceApi.nets.tinyFaceDetector.params
        ) {
            setTimeout(() => this.onPlay());
            return;
        }

        const options = new faceApi.TinyFaceDetectorOptions({
            inputSize: 512,
            scoreThreshold: 0.5
        });
        try {
            const result = await faceApi.detectAllFaces(this.video.current, new faceApi.TinyFaceDetectorOptions());
            if (result.length > 1) {
                // this.setState({ message: "Multiple Faces Found" })
                this.props.errorMessage("Multiple Faces Found")
            } else {
                this.props.errorMessage("Capture Photo")


                // $("#outer-circle").addClass("buttonelement");
                // document.getElementById("container-circles").style.opacity= 0.1 ;
                // document.getElementById("container-circles").style.display=block";
                // this.setState({ message: "" })
                document.getElementById("inner-circle").style.opacity=1
               
            }

            const final = result.map((item, i) => {
                return (
                    item
                )
            })
            const displaySize = { width: final[0]._imageDims._width, height: final[0]._imageDims._height }

            try {

                const detectionsForSize = faceApi.resizeResults(result, { width: displaySize.width, height: displaySize.height })
                const zoomError = detectionsForSize[0]._box._height
                if (zoomError <= "150"){
                    document.getElementById("inner-circle").style.opacity= 0.4 ;
                    this.props.errorMessage("Come closer")
                }
                else if (zoomError == "230" || (zoomError == "180") || (zoomError == "200")){
                    document.getElementById("inner-circle").style.opacity= 0.4 ;

                        this.props.errorMessage("Come Closer to camera - don't move")
                    } 
                    else if (zoomError == "290" || (zoomError == "320")){
                        document.getElementById("inner-circle").style.opacity= 0.4 ;

                        this.props.errorMessage("Come close")
                    }
                    else if (zoomError == "350"){
                        document.getElementById("inner-circle").style.opacity= 0.4 ;

                        this.props.errorMessage("move back")
                    }
                else if (zoomError >= "370") {
                    document.getElementById("inner-circle").style.opacity= 0.4 ;

                        this.props.errorMessage("back")
                    }

                    // if (zoomError <= "200"){
                    //     this.props.errorMessage("Come closer")
                    // // }
                    // } else if (zoomError <= "230"){
                    //     this.props.errorMessage("Come close")
                    // } 
                    // else if (zoomError >= "370") {
                    //     this.props.errorMessage("back")
                    // }
                
                const canvas = document.getElementById('overlay')
                faceApi.matchDimensions(canvas, displaySize)
                faceApi.draw.drawDetections(canvas, detectionsForSize)

            } catch (er) {
                console.error('inside er', er)
            }
        } catch (e) {
            // $("#outer-circle").addClass("disabeldButton");

            // document.getElementById("outer-circle").setAttribute("disabled","disabled");
            // document.getElementById("inner-circle").disabled=true;

            document.getElementById("inner-circle").style.opacity= 0.4 ;
            this.props.errorMessage(" Bring your face in centre");
           
            console.error(e, 'erro with')
        }
        setTimeout(() => this.onPlay(), 1);
    };

    render() {
        return (
            <div className="App">
                {/* <h3 className="text-danger mt-5" style={{ zIndex: 999 }}>{this.state.message ? this.state.message : null}</h3> */}
                {/* <div>
                    {this.state.expressions
                        .sort((a, b) => b[1] - a[1])
                        .filter((_, i) => i < 3)
                        .map(([e, w]) => (
                            <p key={e + w}>
                                {e} {w}
                            </p>
                        ))}
                </div> */}
                <div style={{ width: "100%" }}>
                    <video
                        ref={this.video}
                        autoPlay
                        muted
                        onPlay={this.onPlay}
                        style={{
                            position: "absolute",
                            width: "100%",
                            // height: "90vh",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                            border:"1px solid rgb(255, 110, 48)",
                        }}
                    />
                </div>
                <div style={{ width: "100%" }}>
                    <canvas
                        ref={this.canvas}
                        id="overlay"
                        style={{
                            position: "absolute",
                            width: "100%",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0
                        }}
                    />

                </div>
            </div>
        );
    }
}

export default FaceDetections