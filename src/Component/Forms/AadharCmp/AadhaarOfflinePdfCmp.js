import React from 'react';
import Aux from '../../../hoc/Aux';
// import { Link } from 'react-router-dom';

const AadhaarOfflinePdfCmp = (props) => {
    return (
        <Aux>
            <div className="">
                <form className="custom-form sr1">
                    {/* <div className="form-group position-relative">
                        <label className="custom-label">Step 1</label>
                        <Link to="sajdhj" target="_blank">
                            <div className="upload-img">
                                <h6 className="upload-title">Download eAadhaar From UIDAI Website</h6>
                                
                            </div>
                        </Link>
                    </div> */}

                    <h6 className="">Do not have eAadhaar PDF</h6>
                    <p>No worries... "Download Aadhaar" from UIDAI website:
                        <a href="https://eaadhaar.uidai.gov.in/" rel="noopener noreferrer" className="pl-2" target="_blank">Click Here</a>
                    </p>

                    <div className="form-group position-relative mt-3">
                        <label className="custom-label">Upload File</label>
                        <div className="panupload-inp">
                            <input
                                type="file"
                                className="form-control panupload-custom-inp"
                                name="aadharno"
                                accept=".pdf"
                                onChange={props.changepdf}
                                required
                            />
                            <span className="file-icon text-muted"><i className="fas fa-paperclip"></i></span>
                            <span htmlFor="panname" className="file-icon1 text-muted" style ={{    color: "white"}}>
                                Drag and Drop file here
                                <br />
                                Or click to add file
                            </span>
                        </div>
                        {/* <div className="upload-img">
                            <h6 className="upload-title">Choose file</h6>
                            <input
                                type="file"
                                className="form-control custom-inp upload-file"
                                name="aadharno"
                                accept=".pdf"
                                onChange={props.changepdf}
                                required
                            />
                            <span className="file-icon text-white"><i className="fas fa-paperclip"></i></span>
                        </div> */}
                        <small id="emailHelp" className="form-text text-muted">
                            {props.errors?.adrErr}
                        </small>
                    </div>

                    {props.status ? (<div>
                        <div className="form-group position-relative mb-2">
                            <label className="custom-label">Please enter pdf Password</label>
                            <input
                                type="password"
                                className="form-control custom-inp w-75"
                                name="pwd"
                                onChange={props.changepwd}
                                required
                                placeholder="Enter Password"
                            />
                        </div>
                        <div className="text-left mb-3">
                            <button type="button" onClick={props.pdfSubmit} className="custom-btn">
                                Submit
                            </button>
                        </div>
                    </div>) : null}
                    {/* <div className="form-group position-relative">
                        <label className="custom-label">Step 2</label>
                        <div className="upload-img">
                            <h6 className="upload-title">Upload Downloaded Offline KYC UIDAI From My Computer</h6>
                            <p className="upload-subtitle">Lorem Ipsum is simply dummy text of the</p>
                        </div>
                        <small id="emailHelp" className="form-text text-muted">
                            {props.errors?.adrErr}
                        </small>
                    </div> */}

                </form>
            </div>
        </Aux>
    )
}

export default AadhaarOfflinePdfCmp;
