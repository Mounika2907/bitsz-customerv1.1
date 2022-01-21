import React, { Component, useContext } from "react";
import Aux from "../../../hoc/Aux";
import { connect } from "react-redux";
import {
  GenerateAction,
  ExistUserAction,
  SendOtpVcipAction,
  VerifyMobileOtpAction,
  StageUpdateAction,
  LocationAction,
} from "../../../Store/Actions/GenerateAction";
import NewUserCmp from "../../../Component/Forms/UserForm/NewUserCmp";
import ExistUserCmp from "../../../Component/Forms/UserForm/ExistUserCmp";
import { toast } from "react-toastify";
import publicIp from "public-ip";
import {
  GetVcipStatusAction,
  ResetRdrAction,
} from "../../../Store/Actions/ProcessAction";
import { Redirect, Link } from "react-router-dom";
import LanguageSelector from "../../../Component/Forms/LanguageSelector";
import { Text } from "../../../View/Language/Language";
import queryString from "query-string";
const $ = window.$;

export class User extends Component {
  state = {
    user: "new",
    lat: "17.387140",
    long: "78.491684",
    ip: "0.0.0.0",
    mobile: "",
    mobileRead: false,
    email: "",
    vcipid: "",
    otpNumber: "",
    status: false,
    spinner: false,
    spinnerOtp: false,
    time: undefined,
    timerStat: false,
    checked: false,
    errMsg: {
      adrErr: "",
      otpErr: "",
      mobileErr: "",
    },
    email: "",
    existingUser: false,
  };

  componentDidMount() {
    sessionStorage.clear();
    this.props.ResetRdrAction();
    // localStorage.setItem("width", "0%");
    // localStorage.setItem("step", 1);

    this.loadScripts();
    const vcipid = sessionStorage.getItem("vcipid");
    this.intervalID = setInterval(() => this.tick(), 1000);
    if (vcipid) {
      this.props.GetVcipStatusAction();
    } else {
      $("#info").modal("show");
    }
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition((this.showPosition));
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // alert(position.coords.latitude, position.coords.longitude);
          if (position.coords.latitude) {
            this.setState({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
            const model = {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            };
            this.props.LocationAction(model);
          } else {
            toast.error("Please enable location");
          }
        },
        (error) => {
          console.log(error);

          // alert(error.message);
          // toast.error(error.message)
          // window.location.reload(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );
    } else {
      toast.warn("Geolocation is not supported by this browser.");
    }
    try {
      (async () => {
        this.setState({
          ip: await publicIp.v4(),
        });
      })();
    } catch (e) {
      console.log(e, "Geo loaction Time out");
    }

    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const params = Object.fromEntries(urlSearchParams.entries());

    // if (this.props.location.search) {
    //   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   let buff = new Buffer(params.number, "base64");
    //   let mobile_number = buff.toString("ascii");
    //   let buff1 = new Buffer(params.email, "base64");
    //   let email = buff1.toString("ascii");
    //   if (params.number.length === 10 && email) {
    //     this.setState({
    //       mobile: params.number,
    //       mobileRead: true,
    //     });

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (this.props.location.search) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let buff = new Buffer(params.number, "base64");
      let mobile_number = buff.toString("ascii");
      let buff1 = new Buffer(params.email, "base64");
      let email = buff1.toString("ascii");
      const emailValidate = re.test(String(email).toLowerCase());
      // if (mobile_number.toString() >= 10 && emailValidate) {

      if (params.number.toString().length >= 10 && params.email) {
        this.setState({
          mobile: params.number,
          email: params.email,
          mobileRead: true,
        });
        // const validate = (event) => {
        //   if (this.state.vcipid) {
        //     toast.warn("Geolocation is not supported by this browser.");
        //   } else {
        //     toast.warn("Geolocation is not supported by this browser.");
        //   }
        // };
        // const url = "ValidateVCIPID";
        // const model = {
        //   vcipid: this.state.vcipid,
        //   custip: this.state.ip,
        //   custloc: this.state.lat + "," + this.state.long,
        //   ref1: this.props.VideoReducer.location,
        // };

        // const $this = this;
        // this.props.ExistUserAction(url, model, $this);
        // setTimeout(() => {
        //   console.log(this.state.existingUser, 'user');
        //   if (this.state.existingUser === true) {
        //     const url = "VerifyMobileOTP";
        //     const model = {
        //       otp: "1234567",
        //       mobile: params.number,
        //       custip: this.state.ip,
        //       custloc: this.state.lat + "," + this.state.long,
        //       ref1: this.props.VideoReducer.location,
        //     };
        //     const $this = this;
        //     this.props.VerifyMobileOtpAction(url, model, $this);

        //   }
        // }, 1000)
      } else {
        toast.error("Invalid Credentials")
      }

      // if (params.number !== "") {
      //   var buttons = document.getElementById("clicker");
      //   setTimeout(function () {
      //     buttons.click();
      //   });
      // }
    }

    // this.getMyLocation();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  // getMyLocation = () => {
  //     const location = window.navigator && window.navigator.geolocation;
  //     if (location) {
  //         location.getCurrentPosition((position) => {
  //             // console.log(position);
  //             this.setState({
  //                 lat: position.coords.latitude,
  //                 long: position.coords.longitude,
  //             })
  //         }, (error) => {
  //             toast.warn("Please enable location");
  //             // this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' });
  //         })
  //     }
  // }

  tick() {
    if (this.state.timerStat) {
      if (this.state.time > 0) {
        this.setState({
          time: this.state.time - 1,
        });
      } else {
        // clearInterval(this.intervalID);
        this.setState({
          timerStat: false,
        });
      }
    }
  }
  // showPosition = (position) => {
  //     this.setState({
  //         lat: position.coords.latitude,
  //         long: position.coords.longitude
  //     });
  // }

  loadScripts = () => {
    const dynamicScripts = ["/assets/js/script.js"];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement("script");
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  };

  // SELECTING NEW USER OR EXISTING USER
  handleChange = (event) => {
    this.setState({
      user: event.target.value,
    });
  };

  // FOR NEW USER VALUES
  handleChangeNew = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const val = event.target.value;
    if (name === "mobile") {
      this.setState({
        [name]: val,
      });
      const phoneno = /^\d{10}$/;
      // const re = /^[0-9\b]+$/;
      if (val.match(phoneno)) {
        // if (re.test(val)) {
        this.setState({
          // [name]: val,
          errMsg: {
            mobileErr: "",
          },
        });
      } else {
        this.setState({
          errMsg: {
            mobileErr: "Invalid",
          },
        });
      }
    }
    //  else {
    //     this.setState({
    //         [name]: val
    //     });
    // }
  };

  // HANDLE FOR OTP
  handleOtp = (event) => {
    event.preventDefault();
    if (event.target.name === "otpNumber") {
      if (event.target.value.length <= 6) {
        this.setState({
          ...this.state,
          [event.target.name]: event.target.value,
          errMsg: {
            otpErr: "",
          },
        });
      } else {
        this.setState({
          ...this.state,
          errMsg: {
            otpErr: "Error OTP",
          },
        });
      }
    }
  };

  // FOR OLD USER VALEUS
  handleChangeOld = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  validate = (event) => {
    event.preventDefault();
    // if (this.state.mobile.length >= 10) {
    if (this.state.mobile.toString().length >= 10) {
      this.setState({
        spinner: true,
      });
      const url = "ValidateVCIPID";
      const model = {
        vcipid: this.state.mobile,
        custip: this.state.ip,
        custloc: this.state.lat + "," + this.state.long,
        ref1: this.props.VideoReducer.location,
        ref2: this.state.email
      };
      const $this = this;
      this.props.ExistUserAction(url, model, $this);
      // setTimeout(() => {
      //   if (this.state.existingUser === true) {
      //     const url = "VerifyMobileOTP";
      //     const model = {
      //       otp: "1234567",
      //       mobile: this.state.mobile,
      //       custip: this.state.ip,
      //       custloc: this.state.lat + "," + this.state.long,
      //       ref1: this.props.VideoReducer.location,
      //       ref2: this.state.email
      //     };
      //     const $this = this;
      //     this.props.VerifyMobileOtpAction(url, model, $this);

      //   }
      // }, 1000)

    } else {
      toast.error("Invalid Mobile Number ")
    }
    // else{
    //   const url = "VerifyMobileOTP";
    //         const model = {
    //           otp: "1234567",
    //           mobile: this.state.mobile,
    //           custip: this.state.ip,
    //           custloc: this.state.lat + "," + this.state.long,
    //           ref1: this.props.VideoReducer.location,
    //         };
    //         const $this = this;
    //         this.props.VerifyMobileOtpAction(url, model, $this);
    // }
  }

  // FORM SUBMIT
  NewUser = (event) => {
    event.preventDefault();
    const selected = this.state.user;
    const filter_location = this.props.VideoReducer.location.slice(-5);
    const model = {
      lat: this.state.lat,
      long: this.state.long,
    };
    this.props.LocationAction(model);
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
          const model = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          this.props.LocationAction(model);
        },
        (error) => {
          console.log(error);
          // toast.warn("Please enable location");
          // this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' });
        }
      );
    }
    // FOR NEW API CALL
    if (this.state.long) {
      // console.log(filter_location)
      var buttons = document.getElementById("clicker");
      // buttons.parentNode.removeChild(buttons);

      if (filter_location === "India" || filter_location === "") {
        if (selected === "new") {
          // if (this.state.mobile && this.state.mobile.length === 10) {
          if (this.state.mobile.toString().length >= 10) {
            this.setState({
              spinner: true,
            });
            sessionStorage.setItem("mobile", this.state.mobile);
            const url = "SendOTP";
            const model = {
              mobile: this.state.mobile,
              custip: this.state.ip,
              custloc: this.state.lat + "," + this.state.long,
            };

            const $this = this;
            this.props.SendOtpVcipAction(url, model, $this);
            // }
          } else {
            toast.error("Please Enter 10 Digit number");
          }
          // this.props.GetContentAction();
        } else if (selected === "old") {
          // FOR OLD API CALL
          if (this.state.vcipid || this.state.mobile.toString().length >= 10) {
            this.setState({
              spinner: true,
            });
            const url = "ValidateVCIPID";
            const model = {
              vcipid: this.state.vcipid,
              custip: this.state.ip,
              custloc: this.state.lat + "," + this.state.long,
              ref1: this.props.VideoReducer.location,
              ref2: this.state.email
            };
            const $this = this;
            this.props.ExistUserAction(url, model, $this);
            // this.props.GetContentAction()
          } else {
            toast.error("Please enter VCIP ID");
          }
        }
      } else {
        toast.error("Region is not supported");
      }
      // debugger;
    } else {
      toast.error(
        "Please Enable Location or Clear Site settings to enable location"
      );
    }
  };

  // SEND OTP AGAIN
  getOtpAgain = () => {
    const mobile = sessionStorage.getItem("mobile");
    if (mobile) {
      const url = "SendOTP";
      const model = {
        mobile: mobile,
        custip: this.state.ip,
        custloc: this.state.lat + "," + this.state.long,
      };
      const $this = this;
      this.props.SendOtpVcipAction(url, model, $this);
    } else {
      toast.error("Please Register again.");
    }
  };

  // SUBMIT OTP
  otpSubmit = (event) => {
    event.preventDefault();
    const mobile = sessionStorage.getItem("mobile");
    if (mobile) {
      if (this.state.otpNumber) {
        this.setState({
          spinnerOtp: true,
        });
        const url = "VerifyMobileOTP";
        const model = {
          otp: this.state.otpNumber,
          mobile: sessionStorage.getItem("mobile"),
          custip: this.state.ip,
          custloc: this.state.lat + "," + this.state.long,
          ref1: this.props.VideoReducer.location,
          ref2: this.state.email,
        };
        const $this = this;
        this.props.VerifyMobileOtpAction(url, model, $this);
      }
    } else {
      toast.error("Please enter mobile number.");
    }
  };

  newProceed = () => {
    $("#newId").modal("hide");
    sessionStorage.setItem("width", "28%");
    sessionStorage.setItem("step", 2);
    const stage = {
      height: "28%",
      step: 2,
    };
    // this.props.StageUpdateAction(stage);
    this.props.history.replace("/start");
  };

  render() {
    // console.log(this.props.VideoReducer.location, 'loc');
    const status = this.props.pincodeRdr?.statuses?.vcipidstatus;

    return (
      <Aux>
        {/* <h5 className="heading clearfix">
                    {/* <Text tid="subtitle" /> */}
        {/* <Link to="./assets/images/user-guide.pdf" target="_blank" className="btn float-right custom-btn">
                        <i className="fas fa-book mr-2"></i>
                        <Text tid="user_guide" />
                    </Link>
                </h5> */}

        {status === undefined || status === "0" ? (
          <div>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="proceed sr1 text-center mt-3 mb-2">
                  {/* <h3 className="proceed-title">Proceed With</h3> */}
                  <div className="form-row">
                    <div className="form-group col-md position-relative">
                      <label
                        className="custom-label mr-2"
                        style={{ color: "white" }}
                      >
                        <Text tid="select_language" />
                      </label>
                      <LanguageSelector />
                    </div>
                  </div>

                  {/* <form className="proceed-form">
                    <div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="checkbox"
                          id="new2"
                          name="new"
                          value="old"
                          onChange={this.handleChange}
                          className="custom-control-input"
                        />
                        <label className="custom-control-label" htmlFor="new2">
                          <Text tid="continue_prev" />
                        </label>
                      </div>
                    </div>
                  </form> */}
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              {this.state.user === "new" ? (
                <NewUserCmp
                  changeNew={this.handleChangeNew}
                  errors={this.state.errMsg}
                  status={this.state.status}
                  // disable={!this.state.mobile}
                  mobile={this.state.mobile}
                  mobileRead={this.state.mobileRead}
                  disable2={!this.state.otpNumber}
                  changeotp={this.handleOtp}
                  spinner={this.state.spinner}
                  time={this.state.time}
                  timerStat={this.state.timerStat}
                  spinnerOtp={this.state.spinnerOtp}
                  NewUser={this.NewUser}
                  otpSubmit={this.otpSubmit}
                  sendAgain={this.getOtpAgain}
                  email={this.state.email}
                  validate={this.validate}
                  newProceed={this.newProceed}
                />
              ) : (
                // <ExistUserCmp
                //   changeOld={this.handleChangeOld}
                //   disable={!this.state.vcipid}
                //   spinner={this.state.spinner}
                //   NewUser={this.NewUser}
                // />
                null
              )}
            </div>

            {/* <hr className="hr" /> */}

            {/* <div className="row justify-content-center">
                            <div className="col-md-6 p-0">
                                <div className="instructions sr1">
                                    <h5 className="instructions-title">
                                        <Text tid="instructions" />
                                    </h5>
                                    <ul className="instructions-list">
                                        <li>
                                            <Text tid="ins1" />
                                        </li>
                                        <li>
                                            <Text tid="ins2" />
                                        </li>
                                        <li>
                                            <Text tid="ins3" />
                                        </li>
                                        <li>
                                            <Text tid="ins4" />
                                            <a href="https://uidai.gov.in/contact-support/have-any-question/307-faqs/aadhaar-online-services/aadhaar-paperless-offline-e-kyc.html">
                                                <Text tid="click_here"/>
                                            </a>
                                        </li>
                                        <li>
                                            <Text tid="ins5" />
                                        </li>
                                        <li>
                                            <Text tid="ins6" />
                                        </li>
                                        <li>
                                            <Text tid="ins7" />
                                        </li>
                                        <li>
                                            <Text tid="ins8" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6 p-0">
                                <div className="instructions sr1 border-right-0">
                                    {/* <div className="left-line"></div> */}
            {/* <h5 className="instructions-title"> </h5>
                                    <ul className="instructions-list">
                                        <li>
                                            <Text tid="ins9" />
                                        </li>
                                        <li>
                                            <Text tid="ins10" />
                                        </li>
                                        <li>
                                            <Text tid="ins11" />
                                        </li>
                                        <li>
                                            <p className="text-danger">
                                                <Text tid="please_note" />
                                            </p>
                                            <Text tid="ins12" />
                                            <a href="https://uidai.gov.in/contact-support/have-any-question/307-faqs/aadhaar-online-services/aadhaar-paperless-offline-e-kyc.html" className="pl-1">
                                                <Text tid="click_here" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> */}

            <div
              className="modal fade"
              id="newId"
              data-backdrop="static"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content p-4">
                  <h5 style={{ color: "#1a488d" }}>
                    <Text tid="generated_vcip" />
                  </h5>
                  <form className="proceed-form w-100 mt-3">
                    <div className="form-group position-relative col-md-8 mx-auto ">
                      <input
                        type="number"
                        className="form-control custom-inp text-center"
                        required
                        readOnly
                        value={this.props.VideoReducer?.newId}
                      />
                    </div>
                  </form>

                  <div className="instructions border-right-0">
                    <h5 className="instructions-title pl-0" style ={{color:"black"}}>
                      <Text tid="instructions" />
                    </h5>
                    <ul className="instructions-list pl-4" style ={{color:"black"}}>
                      <li>
                        <Text tid="model_ins1" />
                      </li>
                      <li>
                        <Text tid="model_ins2" />
                      </li>
                    </ul>
                    <p className="text-danger small">
                      <Text tid="model_ins3" />
                    </p>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={this.newProceed}
                        className="btn custom-btn text-white"
                      >
                        <Text tid="proceed" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="modal fade" id="info" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header border-0">
                                        <h1 className="modal-data-title text-center w-100 text-danger mt-0 mb-2">
                                            <Text tid="alert" /> */}
            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button> */}
            {/* </h1>
                                    </div>
                                    <div className="modal-body">
                                        <div className="modal-data text-center">
                                            <h4 className="modal-data-content text-primary w-75 mx-auto mb-2" style={{ color: "red" }}>
                                                <Text tid="alert_msg" />
                                            </h4>
                                            <h5 className="text-danger small mb-1"  style={{ fontSize: 15 }}>
                                                <Text tid="alert_note" />
                                            </h5>
                                            <div>
                                                <button type="button" className="btn custom-btn mt-3" data-dismiss="modal">
                                                    <Text tid="proceed" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
          </div>
        ) : (
          <Redirect to="/start" />
        )}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  const { VideoReducer, pincodeRdr } = state;
  return {
    VideoReducer,
    pincodeRdr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SendOtpVcipAction: (url, body, $this) =>
      dispatch(SendOtpVcipAction(url, body, $this)),
    VerifyMobileOtpAction: (url, body, $this) =>
      dispatch(VerifyMobileOtpAction(url, body, $this)),
    GenerateAction: (url, body, $this) =>
      dispatch(GenerateAction(url, body, $this)),
    ExistUserAction: (url, body, $this) =>
      dispatch(ExistUserAction(url, body, $this)),
    GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
    StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage)),
    LocationAction: (model) => dispatch(LocationAction(model)),
    ResetRdrAction: () => dispatch(ResetRdrAction()),
    // GetContentAction: () => dispatch(GetContentAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
