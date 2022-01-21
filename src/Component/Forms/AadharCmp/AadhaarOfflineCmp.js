import React from "react";
import Aux from "../../../hoc/Aux";
import { Text } from "../../../View/Language/Language";
// import { Link } from 'react-router-dom';

const AadhaarOfflineCmp = (props) => {
  return (
    <Aux>
      <div className="">
        <form className="custom-form sr1">
          {/* <div className="form-group position-relative">
                        <label className="custom-label">Step 1</label>
                        <Link to=" https://uidai.gov.in/my-aadhaar/get-aadhaar.html" target="_blank">
                            <div className="upload-img">
                                <h6 className="upload-title">Do not have eAadhaar PDF/XML. Click here to download</h6>
                            </div>
                        </Link>
                    </div> */}

          {/* <h6 className="">Do not have eKYC XMl</h6>
                    <p>No worries... "Download eKYC XML" from UIDAI website:
                        <a href="https://resident.uidai.gov.in/offline-kyc" rel="noopener noreferrer" className="pl-2" target="_blank">Click Here</a>
                    </p> */}

          <div className="form-group position-relative mt-3">
            {/* <label className="custom-label">Upload File</label> */}
            <div className="panupload-inp">
              <input
                type="file"
                className="form-control panupload-custom-inp"
                name="aadharno"
                accept=".zip, .pdf"
                onChange={props.change}
                required
              />
              <span className="file-icon">
                {/* <i className="fas fa-paperclip"></i> */}
                <i
                  className="fas fa-file-upload"
                  style={{ color: "#ff6e30" }}
                ></i>
              </span>
              <span htmlFor="panname" className="file-icon1">
                <strong>
                  <Text tid="drag_drop" />
                </strong>
                <Text tid="or" />
                <strong>
                  <Text tid="click_file" />
                </strong>
              </span>
            </div>
            <p className="small text-center" style={{ color: "#1a488d" }}>
              <span className="text-danger">*</span>
              <Text tid="upolad_either" />
            </p>
            {/* <div className="upload-img">
                            <h6 className="upload-title">Choose file</h6>
                            <input
                                type="file"
                                className="form-control custom-inp upload-file"
                                name="aadharno"
                                accept=".zip"
                                onChange={props.change}
                                required
                            />
                            <span className="file-icon text-white"><i className="fas fa-paperclip"></i></span>
                        </div> */}
            <small id="emailHelp" className="form-text text-muted">
              {props.errors?.adrErr}
            </small>
          </div>

          {props.statuszip ? (
            <div>
              <div className="form-group position-relative mb-2">
                <label className="custom-label">
                  <Text tid="zip_password" />
                </label>
                <input
                  type="password"
                  className="form-control custom-inp w-75"
                  name="sharecode"
                  onChange={props.handlepwd}
                  maxLength="4"
                  required
                  placeholder="Enter Password"
                />
                <small className="form-text text-danger">
                  {props.errors.otpErr}
                </small>
              </div>
              <div className="text-left mb-3">
                <button
                  type="button"
                  disabled={!props.disabled}
                  onClick={props.zipSubmit}
                  className="custom-btn"
                >
                  <Text tid="submit" />
                </button>
              </div>
            </div>
          ) : null}

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

      <div
        className="modal fade"
        id="xml"
        data-backdrop="static"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "50%" }}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              <div className="instructions border-right-0">
                <h5 className="instructions-title text-center pt-4 pl-0">
                  User Consent
                </h5>
                <div className="w-75 mx-auto">
                  <p className="text-center py-3">
                    I, the holder of aadhaar number, here by give my consent to
                    Syntizen technologies name to Get obtail my offline kyc
                    through "
                    <span className="text-primary">Paperless eKYC</span>".
                    Entity has informed That the details will be used only for
                    <span className="text-primary">test</span>
                    and will not be shared with any Other entity/organization
                  </p>
                </div>
                <form onSubmit={props.xmlSubmit}>
                  <div className="pl-3 d-flex justify-content-center">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="adr"
                        name="agree"
                        onChange={props.handleAccept}
                      />
                      <label className="custom-control-label" htmlFor="adr">
                        I agree with all the above mentioned points.{" "}
                      </label>
                      {/* <span className="badge badge-primary">{props.agree ? "Yes" : "No"}</span> */}
                    </div>
                  </div>
                  <div className="pb-3 text-center">
                    <button type="submit" className="btn custom-btn text-white">
                      <Text tid="proceed" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default AadhaarOfflineCmp;
