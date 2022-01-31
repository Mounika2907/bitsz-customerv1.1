import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { GetCapturePhoto } from '../../../Store/Actions/GenerateAction'

// import "./styles.css";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function Camers() {
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState(undefined);
    const dispatch = useDispatch();

    const capture = React.useCallback(() => {
        // console.log('asdflk')
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        // sessionStorage.setItem('photo', imageSrc);
        // dispatch(GetCapturePhoto(imageSrc));
        // console.log(imageSrc);
    }, [webcamRef]);
    return (
        <div>
            {!image ? (
                <div>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </div>
            ) : (
                <img src={image} alt="test-ilustartion" />
            )}
            <br />
            {/* {console.log(image, 'asd')} */}
            <button className="mt-5" onClick={() => (!image ? capture() : setImage(undefined))}>
                {!image ? "Capture photo" : "take photo"}
            </button>
        </div>
    );
}


export default Camers