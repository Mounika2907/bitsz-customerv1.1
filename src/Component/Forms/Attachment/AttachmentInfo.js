import React from 'react'
import Aux from '../../../hoc/Aux';

const AttachmentInfo = (props) => {
    return (
        <Aux>
            <div className="col-md-8">
                <div className="details">
                    {/* <h2 className="info-title">
                        PAN Details
                        <span className="success">
                            <i className="far fa-check-circle" />
                        </span>
                        <span class="danger"><i class="far fa-times-circle"></i></span>
                        <span class="warning"><i class="far fa-question-circle"></i></span>
                    </h2>
                    <div className="row m-0">
                        <div className="col-md-9 p-0">
                            <div className="table-responsive">
                                <table className="table info-data mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Fields</th>
                                            <th scope="col">OCR Info</th>
                                            <th scope="col">Edited</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>{props.panData.last_name}</td>
                                            <td>
                                                <div className="form-group position-relative mb-0 pb-0">
                                                    <input
                                                        type="text"
                                                        name=""
                                                        defaultValue="Name"
                                                        className="pan-inp"
                                                        value={props.panData.last_name}
                                                    />
                                                    <span className="pan-edit">
                                                        <i className="fas fa-pencil-alt" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Fathers Name</td>
                                            <td>{props.panData.first_name}</td>
                                            <td>
                                                <div className="form-group position-relative mb-0 pb-0">
                                                    <input
                                                        type="text"
                                                        name=""
                                                        defaultValue="Name"
                                                        className="pan-inp"
                                                        value={props.panData.first_name}
                                                    />
                                                    <span className="pan-edit">
                                                        <i className="fas fa-pencil-alt" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>DOB</td>
                                            <td>{props.panData.date_of_birth}</td>
                                            <td>
                                                <div className="form-group position-relative mb-0 pb-0">
                                                    <input
                                                        type="text"
                                                        name=""
                                                        defaultValue="Name"
                                                        className="pan-inp"
                                                        value={props.panData.date_of_birth}
                                                    />
                                                    <span className="pan-edit">
                                                        <i className="fas fa-pencil-alt" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Pan Number</td>
                                            <td>{props.panData.document_number}</td>
                                            <td>
                                                <div className="form-group position-relative mb-0 pb-0">
                                                    <input
                                                        type="text"
                                                        name=""
                                                        defaultValue="Name"
                                                        className="pan-inp"
                                                        value={props.panData.document_number}
                                                    />
                                                    <span className="pan-edit">
                                                        <i className="fas fa-pencil-alt" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Expiry Date</td>
                                            <td>{props.panData.date_of_expiry}</td>
                                            <td>
                                                <div className="form-group position-relative mb-0 pb-0">
                                                    <input
                                                        type="text"
                                                        name=""
                                                        defaultValue="Name"
                                                        className="pan-inp"
                                                        value={props.panData.date_of_expiry}
                                                    />
                                                    <span className="pan-edit">
                                                        <i className="fas fa-pencil-alt" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-center mt-3">
                                <button type="button" onClick={props.proceed} className="custom-btn" style={{ width: "auto" }}>
                                    Save And Proceed
                                </button>
                            </div>
                        </div>
                        <div className="col-md">
                            <p className="photo-name">PHOTO</p>
                            <img src="./assets/images/user.png" width="60px" height="60px" alt="no img" />
                        </div>
                    </div>

                    <hr className="hr" /> */}

                    <h2 className="info-title">
                        PAN Details
                        <span className="success">
                            <i className="far fa-check-circle" />
                        </span>
                        {/* <span class="danger"><i class="far fa-times-circle"></i></span> */}
                        {/* <span class="warning"><i class="far fa-question-circle"></i></span> */}
                    </h2>
                    <div className="row m-0">
                        <div className="col-md-9 p-0">
                            <div className="table-responsive">
                                <table className="table info-data mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="pl-0">Fields</th>
                                            <th scope="col" className="pl-0">OCR Info</th>
                                            {/* <th scope="col" className="pl-0">Edited</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            {/* <td>{props.panData.name}</td> */}
                                            <td>
                                                <div className="form-group position-relative mb-0 pb-0">
                                                    <input
                                                        type="text"
                                                        name="edtname"
                                                        defaultValue={props.panData.name}
                                                        className="pan-inp"
                                                        onChange={props.edit}
                                                    />
                                                    <span className="pan-edit">
                                                        <i className="fas fa-pencil-alt" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Fathers Name</td>
                                            {/* <td>{props.panData.fname}</td> */}
                                            <td>
                                                <div className="form-group position-relative mb-0 pb-0">
                                                    <input
                                                        type="text"
                                                        name="edtfname"
                                                        defaultValue={props.panData.fname}
                                                        className="pan-inp"
                                                        onChange={props.edit}
                                                    />
                                                    <span className="pan-edit">
                                                        <i className="fas fa-pencil-alt" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>DOB</td>
                                            {/* <td>{props.panData.dob}</td> */}
                                            <td>
                                                <div className="form-group position-relative mb-0 pb-0">
                                                    <input
                                                        type="date"
                                                        name="edtdob"
                                                        defaultValue={props.date}
                                                        className="pan-inp"
                                                        onChange={props.edit}
                                                    />
                                                    <span className="pan-edit">
                                                        <i className="fas fa-pencil-alt" />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Pan Number</td>
                                            {/* <td>{props.panData.pannumber}</td> */}
                                            <td>
                                                <div className="form-group position-relative mb-0 pb-0">
                                                    <input
                                                        type="text"
                                                        name="edtpannumber"
                                                        defaultValue={props.panData.pannumber}
                                                        className="pan-inp"
                                                        onChange={props.edit}
                                                    />
                                                    <span className="pan-edit">
                                                        <i className="fas fa-pencil-alt" />
                                                    </span>
                                                </div>
                                            </td>
                                            {/* <td>
                                                <div className="form-group position-relative mb-0 pb-0">
                                                    <input
                                                        type="text"
                                                        name=""
                                                        defaultValue="Name"
                                                        className="pan-inp"
                                                        value={props.panData.document_number}
                                                    />
                                                    <span className="pan-edit">
                                                        <i className="fas fa-pencil-alt" />
                                                    </span>
                                                </div>
                                            </td> */}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md">
                            <p className="photo-name">PHOTO</p>
                            <img src={`data:image/png;base64,${props.panData.pht}`} width="60px" height="60px" alt="no img" />
                        </div>
                        <div className="col-12">

                        <div className="text-center mt-3">
                                <button type="button" onClick={props.proceed} className="custom-btn" style={{ width: "auto" }}>
                                    Save And Proceed
                                    {props.spinner ? <span className="spinner"></span> : null}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default AttachmentInfo;
