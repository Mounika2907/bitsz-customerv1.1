import React, { Component } from 'react'
import Aux from '../../../hoc/Aux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { GetVcipStatusAction } from '../../../Store/Actions/ProcessAction';
import { Redirect } from 'react-router-dom';
import { StageUpdateAction } from '../../../Store/Actions/GenerateAction';
import { Text } from '../../Language/Language';
import Aadhar from '../Aadhar/Aadhar';
import Passport from '../Aadhar/Passport';
const $ = window.$;

export class Start extends Component {
    state = {
        agree: false,
        proceed: ''
    }
    componentDidMount() {
        const status = this.props.pincodeRdr.statuses?.kycstatus;
        if (status === "0") {
            const stage = {
                height: "28%",
                step: 2
            }
            this.props.StageUpdateAction(stage);
        }
        this.loadScripts();
        const vcipid = sessionStorage.getItem("vcipid");
        if (vcipid) {
            this.props.GetVcipStatusAction();
        }
    }

    componentWillUnmount() {
        $('#aadhaarmodal').modal('hide');
    }

    loadScripts = () => {
        const dynamicScripts = [
            '/assets/js/script.js',
        ];
        for (let i = 0; i < dynamicScripts.length; i++) {
            const node = document.createElement('script');
            node.src = dynamicScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }

    handleAccept = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    selectProcess = (event) => {
        this.setState({
            proceed: event.target.value
        });
    }
    // selectProcessProceed = (event) => {
    //     setTimeout(() => {
    //         // $('#panmodal').modal('hide');
    //         sessionStorage.setItem("width", "51%");
    //         sessionStorage.setItem("step", 3);
    //         const stage = {
    //             height: "51%",
    //             step: 3
    //         }
    //         this.props.StageUpdateAction(stage);
    //         this.props.history.push('/pan');
    //     }, 3000);
    // }

    proceed = () => {
        // $('#aadhaarmodal').modal('show');
        // $('#aadhaarmodal').modal({
        //     keyboard: false
        // });
        // if (this.state.agree) {
        if (this.state.proceed === "otp") {
            toast.success("Thank You");
            // $('#aadhaarmodal').modal('hide');
            this.props.history.push("/aadhaar");

        } else if (this.state.proceed === "offline") {
            toast.success("Thank You");
            // $('#aadhaarmodal').modal('hide');
            this.props.history.push("/passport");
        }
        // } else {
        //     toast.error("Please accept the conditions");
        // }

    }

    // acceptConditions = (event) => {

    //     if (this.state.agree) {
    //         if (this.state.proceed === "otp") {
    //             toast.success("Thank You");
    //             $('#aadhaarmodal').modal('hide');
    //             this.props.history.push("/aadhaar");

    //         } else if (this.state.proceed === "offline") {
    //             toast.success("Thank You");
    //             $('#aadhaarmodal').modal('hide');
    //             this.props.history.push("/passport");
    //         }
    //     } else {
    //         toast.error("Please accept the conditions");
    //     }
    // }

    back = () => {
        this.props.history.push('/')
    }

    render() {
        const status = this.props.pincodeRdr?.statuses?.kycstatus;
        const vcipid = sessionStorage.getItem("vcipid");
        const $this = this.props;
        return (
            <Aux>
                <h5 className="heading">
                <Text tid="adr_title" />

                    {/* {
                        this.state.proceed === 'otp' ? (
                            <Text tid="adr_title" />
                        ) : (
                            null
                        )
                    }
                    {
                        this.state.proceed === 'offline' ? (
                            <Text tid="passport_title" />) : (
                            null
                        )
                    } */}
                    {/* {
                        this.state.proceed === 'offline' ? (
                            <Passport $history={$this} />
                        ) : null
                    } */}
                </h5>
                {(status === undefined || status === "0") ? (<Aux>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="proceed sr1 text-center my-3">
                                <h3 className="proceed-title">
                                    <Text tid="proceed_with" />
                                </h3>
                                <form className="proceed-form">
                                    <div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="otpRadio" name="proceed" value="otp" onChange={this.selectProcess} defaultChecked={false} className="custom-control-input" />
                                            <label className="custom-control-label" htmlFor="otpRadio">
                                                <Text tid="otp_kyc" />
                                            </label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="otpRadio1" name="proceed" value="offline" onChange={this.selectProcess} className="custom-control-input" />
                                            <label className="custom-control-label" htmlFor="otpRadio1">
                                                <Text tid="offline_kyc" />
                                            </label>
                                        </div>
                                    </div>
                                    {/* <button type="button" className="custom-btn" onClick={this.selectProcessProceed}>
                                        <Text tid="proceed" />
                                    </button> */}
                                </form>
                                {
                                    this.state.proceed === 'otp' ? (
                                        <Aadhar $history={$this} />
                                    ) : null
                                }
                                {
                                    this.state.proceed === 'offline' ? (
                                        <Passport $history={$this} />
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>


                    {/* <hr className="hr" /> */}

                    <div className="row justify-content-center">
                        {/* <div className="col-md-6 p-0">
                            <div className="instructions sr1">
                                <h5 className="instructions-title">
                                    <Text tid="help" />
                                </h5>
                                <ul className="instructions-list">
                                    <li>
                                        <span className="qtn-name">Q</span>
                                        <Text tid="qtn1" />
                                    </li>
                                    <li>
                                        <span className="qtn-name">A</span>
                                        <Text tid="ans1" />
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6 p-0">
                            <div className="instructions sr1 border-right-0">
                                <h5 className="instructions-title">
                                    <Text tid="help" />
                                </h5>
                                <ul className="instructions-list">
                                    <li>
                                        <span className="qtn-name">Q</span>
                                        <Text tid="qtn2" />
                                    </li>
                                    <li>
                                        <span className="qtn-name">A</span>
                                        <Text tid="ans2" />
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>


                </Aux>) :
                    (<Redirect to="/pan" />)}

                <hr className="hr" />

                <div className="row text-white">
                    <div className="col-md-7">
                        <div className="instructions sr1 border-right-0 p-0">
                            <h5 className="instructions-title pl-4">
                                <Text tid="instructions" />
                            </h5>
                            <ul className="instructions-list">
                                <li>
                                    <Text tid="pan_ins1" />
                                </li>
                                <li>
                                    <Text tid="pan_ins2" />
                                </li>
                                <li>
                                    <Text tid="pan_ins3" />
                                </li>
                                <li>
                                    <Text tid="pan_ins4" />
                                </li>
                                <li>
                                    <Text tid="pan_ins5" />
                                </li>
                                <li>
                                    <Text tid="pan_ins6" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* <div className="modal fade" id="aadhaarmodal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "50%" }} role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions border-right-0">
                                    <h5 className="instructions-title pl-0">
                                        <Text tid="user_content" />
                                        <button type="button" className="close float-right text-danger" data-dismiss="modal" aria-label="Close">
                                            <span className="position-relative" style={{ top: "-3px", fontSize: "35px" }} aria-hidden="true">×</span>
                                        </button>
                                    </h5>

                                    <ul className="instructions-list pl-4">
                                        <li>
                                            <Text tid="content1" />
                                        </li>
                                        <li>
                                            <Text tid="content2" />
                                        </li>
                                        <li>
                                            <Text tid="content3" />
                                        </li>
                                        <li>
                                            <Text tid="content4" />
                                        </li>
                                        <li>
                                            <Text tid="content5" />
                                        </li>
                                        <li>
                                            <Text tid="content6" />
                                        </li>
                                        <li>
                                            <Text tid="content7" />
                                        </li>
                                    </ul>
                                    <form>
                                        <div className="pl-3">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="adr" name="agree" checked={this.state.agree} onChange={this.handleAccept} />
                                                <label className="custom-control-label" htmlFor="adr">
                                                    <Text tid="content_cdtn1" />
                                                    {vcipid}
                                                    <Text tid="content_cdtn2" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="pb-3 text-center">
                                            <button type="button" onClick={this.acceptConditions} className="btn custom-btn">
                                                <Text tid="proceed" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <button onClick={this.back} disabled={this.state.backDisbale} className="custom-btn text-white">
                    <Text tid="back" />
                </button>

            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { pincodeRdr } = state
    return {
        pincodeRdr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // GenerateAction: (body) => dispatch(GenerateAction(body)),
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Start);
