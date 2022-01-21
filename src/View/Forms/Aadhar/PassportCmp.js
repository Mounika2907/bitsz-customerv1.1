import React from 'react'
import { Text } from '../../Language/Language'


export const PassportCmp = (props) => {
    const path = "data:image/png;base64," + props.imgSrc;


    return (
        <div>

            <form className="custom-form sr1 mb-3 mt-0 pt-1 pb-1 text-center " onSubmit={props.upload} >
                {/* <form className="custom-form sr1 mb-0 mt-0 pt-1 pb-1" onSubmit={props.upload}> */}
                {props.imgInpStatus ? (

                    <div className="row m-0 justify-content-center">
                        <div className="form-group position-relative col-md-6">
                            <label className="custom-label" htmlFor="aadhaar">
                                <Text tid="passport" />
                            </label>

                            <div className="panupload-inp">
                                <input
                                    type="file"
                                    className="form-control panupload-custom-inp"
                                    name="pan2"
                                    id="panname"
                                    accept="image/*"
                                    onChange={props.handleChangePassport}
                                    style={{ position: "relative", zIndex: "99", backgroundColor: "transparent", color: "transparent" }}
                                    required
                                />
                                <span className="file-icon text-muted">
                                    {/* <i className="fas fa-paperclip icon-ror" ></i> */}
                                    <i className="far fa-image icon-ror" ></i>
                                </span>
                                <span htmlFor="panname" className="file-icon1 text-muted">
                                    <Text tid="drag_drop" />
                                    <br />
                                    <Text tid="or" />
                                    <Text tid="click_file" />
                                </span>
                            </div>

                        </div>
                    </div>
                ) : (null)}


                {props.imgSrc
                    ? !props.pdfFileStatus
                        ? (<>
                            <div className="row m-0 justify-content-center">
                                <div className="col-md-4 mt-5 col-md p-0">
                                    {/* <div className={`${props.captureStatus ? 'col-md-8' : props.btnDisabled ? 'col-md-4' : 'col-md p-0'}`}> */}
                                    <div className="text-center">
                                        <span onClick={() => props.rotate(90)} className="rotateImg">
                                            <i className="fas fa-undo"></i>
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <div className="pan-preview" id="rotateImg">
                                            <img src={path} onClick={() => props.popup(path)} alt="no img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>)
                        : (null)
                    : null
                }

                {props.enableBtn === true ? (
                    <>
                        {!props.imgInpStatus
                            ? <button type="reset" className="custom-btn mr-2" onClick={props.reset}>
                                <Text tid="resubmit" />
                            </button>
                            : (null)}

                        <button type="submit" className="custom-btn m-0 ml-2 mt-2" >
                            <Text tid="submit" />
                            {props.spinner ? <span className="spinner"></span> : null}
                        </button>
                    </>

                ) : (
                    <button type="submit" disabled className="custom-btn m-0">
                        <Text tid="submit" />
                        {props.spinner ? <span className="spinner"></span> : null}
                    </button>

                )}

                {/* {props.btnDisabled
                        ? <div className="row m-0 justify-content-center">
                            <div className="col-md-4">
                                <div className="text-center">
                                    {!props.imgInpStatus
                                        ? <button type="reset" className="custom-btn" onClick={props.reset}>
                                            <Text tid="resubmit" />
                                        </button>
                                        : (null)
                                    }

                                    {props.selectPanUpload === "0" ? (
                                        <button type="submit" className="custom-btn" onClick={props.find}>
                                            <Text tid="submit" />
                                            {props.spinner ? <span className="spinner"></span> : null}
                                        </button>

                                    ) : (
                                        <button type="submit" disabled className="custom-btn">
                                            <Text tid="submit" />
                                            {props.spinner ? <span className="spinner"></span> : null}
                                        </button>

                                    )}

                                    <div className="modal-footer">
                                    </div>
                                </div>
                            </div>
                        </div>
                        : (null)
                    } */}
            </form>


        </div>
    )
}


export default PassportCmp;
