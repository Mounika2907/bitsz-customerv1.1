import React from 'react';
import Aux from '../../../hoc/Aux';
import { Text } from '../../../View/Language/Language';
const $ = window.$;

const Attachment = (props) => {
    const path = "data:image/png;base64," + props.imgSrc;
    $('#inner-circle').append('<i className="fas fa-camera text-dark"></i>');

    return (
        <Aux>
            <div className="col-md">

                <form className="custom-form sr1 mb-0 mt-0 pt-1 pb-1" onSubmit={props.upload}>
                    {props.imgInpStatus ? (
                        <div>
                            {/* <div className="proceed-form text-center">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="panUpload1" name="selectPanUpload" value="1" onChange={props.selectPan} defaultChecked={true} className="custom-control-input" />
                                <label className={`custom-control-label ${props.selectPanUpload === "1" ? 'text-primary' : ''}`} htmlFor="panUpload1">
                                    <Text tid="pan_card" />
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="panUpload2" name="selectPanUpload" value="2" onChange={props.selectPan} className="custom-control-input" />
                                <label className={`custom-control-label ${props.selectPanUpload === "2" ? 'text-primary' : ''}`} htmlFor="panUpload2">
                                    <Text tid="pan_card1" />
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="panUpload3" name="selectPanUpload" value="3" onChange={props.selectPan} className="custom-control-input" />
                                <label className={`custom-control-label ${props.selectPanUpload === "3" ? 'text-primary' : ''}`} htmlFor="panUpload3">
                                    <Text tid="passport" />
                                </label>
                            </div>
                        </div> */}
                            <div className="row m-0 justify-content-center">
                                {props.selectPanUpload === "1"
                                    ? <div className="form-group position-relative col-md-4 text-center">
                                        <label className="custom-label" htmlFor="aadhaar">
                                            <Text tid="upload_pan" />
                                        </label>
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
                                                {/* {props.pdfFileStatus
                                            ? <i className="fas fa-file-upload text-success"></i>
                                            : */}
                                                <i className="far fa-image icon-ror" ></i>
                                                {/* } */}
                                            </span>
                                            {/* {props.pdfFileStatus
                                        ? <span htmlFor="panname" className="file-icon1 text-muted">
                                            PDF FILE <i className="fas fa-check-circle pl-1 text-success"></i>
                                        </span>
                                        : */}
                                            <span htmlFor="panname" className="file-icon1 text-muted">
                                                <Text tid="drag_drop" />
                                                <br />
                                                <Text tid="or" />
                                                <Text tid="click_file" />
                                            </span>
                                            {/* } */}
                                        </div>
                                    </div>
                                    :( <div className="form-group position-relative col-md-4 block-disabled">
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
                                    </div>)
                                }
                                {/* {props.selectPanUpload === "2"
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
                            } */}
                            </div>
                        </div>) : (null)}
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
                                <div className="row m-0 justify-content-center mb-4">
                                    <div className={`${props.captureStatus ? 'col-md-8' : props.btnDisabled ? 'col-md-4 mt-5' : 'col-md p-0'}`}>
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

                                    <button type="submit" className="custom-btn" >
                                        <Text tid="submit" />
                                        {props.spinner ? <span className="spinner"></span> : null}
                                    </button>
                                </div>
                            </div>
                        </div>
                        : (null)
                    }
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


        </Aux>
    )
}

export default Attachment;
