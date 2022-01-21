import React from 'react';
import Aux from '../../../hoc/Aux';
import { Text } from '../../../View/Language/Language';

const AadharFormCmp = (props) => {
    return (
        <Aux>
            <div className="col-md-6">
                <form className="custom-form sr1" id="aadhaarblobk" onSubmit={props.aadharForm} autoComplete="false">
                    <div className="form-group position-relative">
                        <label className="custom-label" htmlFor="aadhaar">
                            <Text tid="adr_number" />
                        </label>
                        <div className="row m-0">
                            <div className="col pl-0">
                                <input
                                    type="password"
                                    className="form-control custom-inp text-center"
                                    id="adrinp1"
                                    name="aadharno1"
                                    maxLength="4"
                                    onChange={props.changeAdr}
                                    value={props.aadharno1}
                                    pattern="\d{4}"
                                    placeholder="XXXX"
                                    required
                                    autoFocus
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col pl-0">
                                <input
                                    type="password"
                                    className="form-control custom-inp text-center"
                                    id="adrinp2"
                                    maxLength="4"
                                    name="aadharno2"
                                    onChange={props.changeAdr}
                                    value={props.aadharno2}
                                    pattern="\d{4}"
                                    placeholder="XXXX"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col pl-0">
                                <input
                                    type="number"
                                    className="form-control custom-inp text-center"
                                    id="adrinp3"
                                    name="aadharno3"
                                    maxLength="3"
                                    pattern="\d{4}"
                                    onChange={props.changeAdr}
                                    value={props.aadharno3}
                                    placeholder="XXXX"
                                    required
                                    autoComplete="off"
                                />

                            </div>
                        </div>
                        {/* <input
                            type="number"
                            className="form-control custom-inp"
                            id="aadhaar"
                            name="aadharno"
                            onChange={props.change}
                            value={props.adrpattern}
                            placeholder="Enter Aadhaar Number"
                            required
                            autoFocus
                            autoComplete="off"
                        /> */}
                        <small className="form-text text-muted">
                            {props.errors?.adrErr}
                        </small>
                    </div>
                    <div className="form-group text-center position-relative">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                id="sms"
                                name="aadhaarType"
                                // defaultChecked={true}
                                onChange={props.change}
                                value="1"
                                className="custom-control-input"
                                required
                            />
                            <label className="custom-control-label" htmlFor="sms">
                                <Text tid="sms" />
                            </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                id="EMAIL"
                                name="aadhaarType"
                                onChange={props.change}
                                value="2"
                                className="custom-control-input"
                                required
                            />
                            <label className="custom-control-label" htmlFor="EMAIL">
                                <Text tid="email" />
                            </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                id="Both"
                                name="aadhaarType"
                                onChange={props.change}
                                value="3"
                                className="custom-control-input"
                                required
                            />
                            <label className="custom-control-label" htmlFor="Both">
                                <Text tid="both" />
                            </label>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="custom-btn">
                            <Text tid="send_otp" />
                            {props.spinner ? <span className="spinner"></span> : null}
                        </button>
                    </div>
                </form>
                {props.status ? (<form className="custom-form sr1" id="aadhaarotpp" onSubmit={props.otpSubmit}>
                    <div className="form-group position-relative">
                        {/* <label className="custom-label" for="exampleInputEmail1">Email address</label> */}
                        <input
                            type="number"
                            className="form-control custom-inp"
                            id="aadhaarotpnunmber"
                            name="otpNumber"
                            onChange={props.change}
                            aria-describedby="otp"
                            required
                            placeholder="Enter OTP"
                            autoComplete="off"
                        />
                        <small className="form-text text-danger" onClick={props.sendAgain} style={{ cursor: "pointer" }}>
                            <Text tid="havent_receive_otp" />
                             {props.errors.otpErr}
                            {/* <span className="float-right">0.{props.timer} sec</span> */}
                        </small>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="custom-btn">
                            <Text tid="get_ekyc" />
                            {props.spinner1 ? <span className="spinner"></span> : null}
                        </button>
                    </div>
                </form>) : (<form className="custom-form sr1 block-disabled" >
                    <div className="form-group position-relative">
                        <input
                            type="number"
                            className="form-control custom-inp border-dark"
                            name="otpNumber"
                            aria-describedby="otp"
                            disabled
                            required
                            placeholder="Enter OTP"
                        />
                        <small className="form-text text-muted">
                            <Text tid="havent_receive_otp" />
                        </small>
                    </div>
                    <div className="text-center">
                        <button type="submit" disabled className="custom-btn">
                            <Text tid="get_ekyc" />
                        </button>
                    </div>
                </form>)}
            </div>

        </Aux>
    )
}

export default AadharFormCmp;
