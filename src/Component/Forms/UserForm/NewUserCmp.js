import React from "react";
import Aux from "../../../hoc/Aux";
import { Text } from "../../../View/Language/Language";

const NewUserCmp = (props) => {
  return (
    <Aux>
      {/* <div className="col-md-4">
        <form
          className="proceed-form sr1 text-left"
          id="contactNum"
          onSubmit={props.NewUser}
        >
          <div className="form-row">
            <div className="form-group col-md position-relative">
              <label className="custom-label">
                <Text tid="contact_number" />
                <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control custom-inp"
                name="mobile"
                pattern="[1-9]{1}[0-9]{9}"
                onChange={props.changeNew}
                autoFocus
                value={props.mobile}
                readOnly={props.mobileRead ? true : false}
                placeholder="Enter Number "
                required
                style={{
                  cursor: "not-allowed",
                  backgroundColor: "rgb(229, 229, 229)"
                }}

              />
            </div>
          </div>
        </form>
      </div> */}

      <div className="col-md-4">
        {props.status ? (
          <form className="proceed-form sr1" onSubmit={props.otpSubmit}>
            <div className="form-group position-relative">
              <label className="custom-label">
                <Text tid="contact_number" />
                <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control custom-inp"
                id="mobile"
                name="mobile"
                value={props.mobile}
                aria-describedby="otp"
                required
                placeholder="Enter Number"

              />
              <small className="form-text text-danger mt-2 text-left">
              </small>
            </div>
          </form>
        ) : (
          <form className="proceed-form sr1">
            <div className="form-group position-relative">
              <label className="custom-label">
                <Text tid="contact_number" />
                <span className="text-danger">*</span>
              </label>
              <input
                type="mobile"
                className="form-control custom-inp"
                name="mobile"
                disabled
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                onChange={props.changeNew}
                autoFocus
                value={props.mobile}
                readOnly={props.mobileRead ? true : false}
                placeholder="Enter Number "
                style={{
                  cursor: "not-allowed",
                  backgroundColor: "rgb(229, 229, 229)"
                }}
                required
              />
            </div>

          </form>
        )}

      </div>

      <div className="col-md-4">
        {props.status ? (
          <form className="proceed-form sr1" onSubmit={props.otpSubmit}>
            <div className="form-group position-relative">
              <label className="custom-label" htmlFor="exampleInputEmail1">
                <Text tid="otp" />
                <span className="text-danger">*</span>

              </label>
              <input
                type="number"
                className="form-control custom-inp"
                id="email"
                name="email"
                // onChange={props.changeotp}
                value={props.email}
                aria-describedby="otp"
                required
                placeholder="Enter Email"

              />
              {/* <input
                type="number"
                className="form-control custom-inp"
                id="otp"
                name="otpNumber"
                onChange={props.changeotp}
                aria-describedby="otp"
                required
                placeholder="Enter OTP"
              /> */}
              <small className="form-text text-danger mt-2 text-left">
                {/* {props.timerStat === false ? (
                  <span
                    onClick={props.sendAgain}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    <Text tid="havent_receive_otp" />
                  </span>
                ) : (
                  "Enter OTP"
                )} */}
                {/* {props.errors.otpErr} */}
                {/* <span className="float-right text-danger">
                  {props.time} sec
                </span> */}
              </small>
            </div>
            {/* <div className="text-center">
              <button
                type="submit"
                disabled={props.disable2}
                className="custom-btn"
              >
                <Text tid="proceed" />
                {props.spinnerOtp ? <span className="spinner"></span> : null}
              </button>
            </div> */}
          </form>
        ) : (
          <form className="proceed-form sr1">
            <div className="form-group position-relative">
              <label
                className="custom-label text-white"
                htmlFor="exampleInputEmail1"
              >
                <Text tid="otp" />
                <span className="text-danger">*</span>

              </label>
              <input
                type="email"
                className="form-control custom-inp"
                name="email"
                disabled
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                onChange={props.changeNew}
                autoFocus
                value={props.email}
                readOnly={props.mobileRead ? true : false}
                placeholder="Enter Email "
                style={{
                  cursor: "not-allowed",
                  backgroundColor: "rgb(229, 229, 229)"
                }}
                required
              />
              {/* <p>{props.email}</p> */}
              {/* <small
                className="form-text text-muted mt-2 text-left"
                style={{ fontWeight: "bold" }}
              >
                <Text tid="havent_receive_otp" />
              </small> */}
            </div>

          </form>
        )}

      </div>
      <div className="col-md-12 text-center">
        <div className="text-center">
          <button type="submit" className="custom-btn" onClick={props.validate}>
            <Text tid="proceed" />
          </button>
        </div>
      </div>
    </Aux>

  );
};

export default NewUserCmp;
