import React from 'react';
import Aux from '../../../hoc/Aux';
import { Text } from '../../../View/Language/Language';

const $ = window.$;

const LivenessCapture = (props) => {
    const path = "data:image/png;base64," + props.imgSrc;
    // console.log(props.errorMessage)
    // if (props.errorMessage === "Capture Photo") {
    //     $('#inner-circle').append('<i className="fas fa-camera text-dark"></i>');
    // } else {
    //     $('#inner-circle-disabled').append('<i className="fas fa-camera text-dark"></i>');
    // }
    
    return (
        <Aux>
            <div className="col-md-5 justify-content-center mt-5 ml-3">
                <form className="custom-form sr1 mb-0 mt-0 " onSubmit={props.upload}>
                    {/* {props.imgInpStatus ? (
                    <div>
                        <div className="row m-0 justify-content-center">
                            {props.selectPanUpload === "1"
                                ? <div className="form-group position-relative col-md-4">
                                    <div className="panupload-inp">
                                        <input
                                            type="file"
                                            className="form-control panupload-custom-inp"
                                            name="pan"
                                            id="panname"
                                            accept="image/*"
                                            onChange={props.selectImg}
                                            style={{ position: "relative", zIndex: "99", backgroundColor: "transparent", color: "transparent" }}
                                            required
                                        />
                                        <span className="file-icon text-muted">
                                            <i className="fas fa-paperclip icon-ror"></i>
                                        </span>
                                        <span htmlFor="panname" className="file-icon1 text-muted">
                                            <Text tid="drag_drop" />
                                            <br />
                                            <Text tid="or" />
                                            <Text tid="click_file" />
                                        </span>
                                    </div>
                                </div>
                                : <div className="form-group position-relative col-md-4 block-disabled">
                                    <div className="panupload-inp">
                                        <input
                                            type="file"
                                            className="form-control panupload-custom-inp"
                                            name="pan"
                                            id="panname"
                                            accept="image/*"
                                            style={{ position: "relative", zIndex: "99", backgroundColor: "transparent", color: "transparent" }}

                                        />
                                        <span className="file-icon text-muted">
                                            <i className="fas fa-paperclip"></i>
                                        </span>
                                        <span htmlFor="panname" className="file-icon1 text-muted">
                                            <Text tid="drag_drop" />
                                            <br />
                                            <Text tid="or" />
                                            <Text tid="click_file" />
                                        </span>
                                    </div>
                                </div>
                            }
                            {props.selectPanUpload === "2"
                                ? <div className="form-group position-relative col-md-4">
                                    <div className="panupload-inp">
                                        <input
                                            type="file"
                                            className="form-control panupload-custom-inp"
                                            name="pan"
                                            id="panname"
                                            accept=".pdf"
                                            onChange={props.selectImg}
                                            style={{ position: "relative", zIndex: "99", backgroundColor: "transparent", color: "transparent" }}
                                            required
                                        />
                                        <span className="file-icon text-muted">
                                            <i className="fas fa-file-upload icon-ror"></i>
                                        </span>
                                        {props.pdfFileStatus
                                            ? <span htmlFor="panname" className="file-icon1 text-muted">
                                                PDF FILE <i className="fas fa-check-circle pl-1 text-success"></i>
                                            </span>
                                            : <span htmlFor="panname" className="file-icon1 text-muted">
                                                <Text tid="drag_drop" />
                                                <br />
                                                <Text tid="or" />
                                                <Text tid="click_file" />
                                            </span>
                                        }
                                    </div>
                                </div>
                                : <div className="form-group position-relative col-md-4  block-disabled">
                                    <div className="panupload-inp">
                                        <input
                                            type="file"
                                            className="form-control panupload-custom-inp"
                                            name="pan"
                                            id="panname"
                                            accept=".pdf"
                                            style={{ position: "relative", zIndex: "99", backgroundColor: "transparent", color: "transparent" }}
                                            
                                        />
                                        <span className="file-icon text-muted">
                                            <i className="fas fa-file-upload"></i>
                                        </span>
                                        <span htmlFor="panname" className="file-icon1 text-muted">
                                            <Text tid="drag_drop" />
                                            <br />
                                            <Text tid="or" />
                                            <Text tid="click_file" />
                                        </span>
                                    </div>
                                </div>
                            }
                            {props.selectPanUpload === "3"
                                ? <div className="form-group position-relative col-md-4">
                                    <div className="panupload-inp" onClick={props.capture} style={{ cursor: "pointer" }}>
                                        <span className="file-icon text-muted">
                                            <i className="fas fa-camera icon-ror"></i>
                                        </span>
                                        <span htmlFor="panname" className="file-icon1 text-muted">
                                            <Text tid="passport" />
                                        </span>
                                    </div>
                                </div>
                                : <div className="form-group position-relative col-md-4 block-disabled">
                                    <div className="panupload-inp">
                                        <span className="file-icon text-muted">
                                            <i className="fas fa-camera"></i>
                                        </span>
                                        <span htmlFor="panname" className="file-icon1 text-muted">
                                            <Text tid="passport" />
                                        </span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>) : (null)} */}
                    {props.pdfFileStatus
                        ? <div className="row m-0 justify-content-center">
                            <div className={`form-group position-relative ${props.btnDisabled ? 'col-md-4' : 'col-md p-0'}`}>
                                <div className="panupload-inp pdffile">
                                    <span className="file-icon text-muted">
                                        <i className="fas fa-file-upload text-success"></i>
                                    </span>
                                    <span htmlFor="panname" className="file-icon1 text-muted">
                                        PDF FILE <i className="fas fa-check-circle pl-1 text-success"></i>
                                    </span>
                                </div>
                                {!props.status
                                    ? <div className="form-group position-relative mb-2 mt-2">
                                        <label className="custom-label">Please enter pdf Password</label>
                                        <input
                                            type="password"
                                            className="form-control custom-inp"
                                            name="pwd"
                                            onChange={props.handlepwd}
                                            required
                                            placeholder="Enter Password"
                                        />

                                        <small className="form-text text-danger">
                                            {props.errMsg}
                                        </small>
                                    </div>
                                    : (null)
                                }
                            </div>
                        </div>
                        : (null)
                    }
                    {props.imgSrc
                        ? !props.pdfFileStatus
                            ? (<Aux>
                                <div className="row m-0 justify-content-center">
                                    <div className={`${props.captureStatus ? 'col-md-12 m-0' : props.btnDisabled ? 'col-md-12 m-0' : 'col-md p-0'}`}>
                                        <div className="text-center">
                                            <span onClick={() => props.rotate(90)} className="rotateImg">
                                                <i className="fas fa-undo"></i>
                                            </span>
                                        </div>
                                        <div className="form-group">
                                            <div className="live-preview" id="rotateImg">
                                                <img src={path} alt="no img" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Aux>)
                            : (null)
                        : null
                    }
                    {props.btnDisabled
                        ? <div className="row m-0 justify-content-center">
                            <div className="col-md-4">
                                <div className="text-center">
                                    {!props.imgInpStatus
                                        ? <button type="reset" className="custom-btn" onClick={props.reset}>
                                            <Text tid="resubmit" />
                                        </button>
                                        : (null)
                                    }

                                    <button type="submit" className="custom-btn m-2 mr-3">
                                        <Text tid="submit" />
                                        {props.spinner ? <span className="spinner"></span> : null}
                                    </button>
                                </div>
                            </div>
                        </div>
                        : (null)
                    }
                    {props.imgSrc ? (
                        <button type="submit" className="custom-btn float-right mr-3 mt-3">Submit
                            {props.spinner ? <span className="spinner"></span> : null}
                        </button>

                    ) : (
                        <button className="d-none">Submit</button>
                    )}

                </form>
            </div>

            {/* Modal */}
            <div className={`modal fade ${props.addClass}`} id="attachment"
                tabIndex={-1} role="dialog"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">PAN INFO</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Status
                                    <span className="badge badge-primary badge-pill">{props.panInfo?.status}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    rrn
                                    <span className="badge badge-primary badge-pill">{props.panInfo?.result}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    checkid
                                    <span className="badge badge-primary badge-pill">{props.panInfo?.checkid}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    reportid
                                    <span className="badge badge-primary badge-pill">{props.panInfo?.reportid}</span>
                                </li>
                            </ul>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={props.find} data-dismiss="modal">
                                Report
                                {props.spinner ? <span className="spinner"></span> : null}
                            </button>
                            {/* <button type="button" className="btn btn-primary">Understood</button> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade custom-modal" id="panmodal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-data">
                                <img src="./assets/images/success.svg" alt="no img" />
                                <h1 className="modal-data-title">
                                    <Text tid="pan_success" />
                                </h1>
                                <div>
                                    <svg width="100px" height="100px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                        <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
                                        <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                                            <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
                                        </circle>
                                    </svg>
                                </div>
                                <p className="modal-data-content">
                                    <Text tid="pan_wait" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Aux>
    )
}

export default LivenessCapture;
// const mapStateToProps = (state) => {
//     const { bitszReducer, pincodeRdr } = state;
//     return {
//         bitszReducer, pincodeRdr
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
        // CheckImageLiveness: (modal, $this) => dispatch(CheckImageLiveness(modal, $this)),
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(LivenessCapture);
