import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import { ResetRdrAction, ResetEndRdrAction } from '../../Store/Actions/UsersActions/UserActions';
// import { Redirect } from 'react-router-dom';
import { GetVcipStatusAction } from '../../Store/Actions/ProcessAction';
import { StageUpdateAction } from '../../Store/Actions/GenerateAction';
import { Text } from '../Language/Language';
const $ = window.$;

class End extends Component {
    state = {
        intervalId1: ''
    }

    componentDidMount() {
        this.props.ResetEndRdrAction();
        // sessionStorage.setItem("width", "100%");
        // sessionStorage.setItem("step", 5);
        const stage = {
            height: "100%",
            step: 5
        }
        this.props.StageUpdateAction(stage);
        const vcipid = sessionStorage.getItem("vcipid");
        if (vcipid) {
            this.props.GetVcipStatusAction();
        }
        // let intervalId1 = setInterval(() => {
        //     if (this.props.pincodeRdr.statuses?.qastatusus === "2" &&
        //         this.props.pincodeRdr.statuses?.livecapturestatus === "1") {
        //         clearInterval(this.state.intervalId1);
        //     } else {
        //         this.props.GetVcipStatusAction();
        //     }
        // }, 2000);
        // this.setState({ intervalId1: intervalId1 });
    }


    end = () => {
        $('#end').modal('hide');
        sessionStorage.clear();
        this.props.ResetRdrAction();
        var app = {
            launchApp: function () {
                const url = "bitszindia://bitsz"
                window.location.replace(url);
                this.timer = setTimeout(this.openWebApp, 3000);
            },

            openWebApp: function () {
                window.location.replace("https://kyc.bitsz.in/");
            }
        };

        app.launchApp();

        // this.props.history.replace("/");
        // window.open("https://trade.bitsz.io/account", "_blank")
        // var win = window.open("", "_self");
        // win.close();
        // window.location.reload(true);
    }

    inComplete = () => {
        sessionStorage.setItem("width", "76%");
        sessionStorage.setItem("step", 4);
        const stage = {
            height: "76%",
            step: 4
        }
        this.props.StageUpdateAction(stage);
        this.props.history.replace("/video-chat");
    }

    render() {
        const vcip = sessionStorage.getItem("vcipid");
        const status = this.props.pincodeRdr.statuses?.vcipidstatus;
        const kycstatus = this.props.pincodeRdr.statuses?.kycstatus;
        const panstatus = this.props.pincodeRdr.statuses?.panstatus;
        const videoconfstatus = this.props.pincodeRdr.statuses?.videoconfstatus;
        const qastatusus = this.props.pincodeRdr.statuses?.qastatusus;
        const livecapturestatus = this.props.pincodeRdr.statuses?.livecapturestatus;
        var content = '';
        if (status === "2") {
            content = 'Thank You for completing the Video-KYC process with us. Your V-CIP ID ' + vcip + ' has been approved by our Banker. We are waiting for the approval from Auditor for your V-CIP ID. We will share the final status soon.'
        } else if (status === "3") {
            content = 'We regret to inform you that your V-CIP ID ' + vcip + ' has been Rejected by our Banker. We request you to reinitiate the process with all the correct details.'
        }
        else if (status === "4") {
            content = 'The final approval for Your V-CIP ID ' + vcip + ' has been received from Auditor.'
        }
        else if (status === "5") {
            content = 'We regret to inform you that your V-CIP ID ' + vcip + ' has been Rejected by our Auditor. We request you to reinitiate the process with all the correct details.'
        }
        else if (status === "-2") {
            content = 'Your V-CIP ID ' + vcip + ' has been rejected by our Banker due to Incorrect details. We request you to Re-register with the same Mobile number and  initiate the new process with all the correct details. You can access to V-CIP process through'
        }
        else {
            if (kycstatus === "1" && panstatus === "1" && videoconfstatus === "3" && qastatusus === "2" && livecapturestatus === "1") {
                content = 'Thank You for completing the Video-KYC process with Syntizen Bank. We are waiting for the Approval from Banker and Auditor for your V-CIP ID.  The final status for your V-CIP ID will be shared to you Via SMS on your registered mobile number. You can revisit to the same web-link anytime to check the updated status. '
            }
            else {
                content = 'Your Video-KYC is incomplete, please continue the session and complete the process.'
            }
        }




        return (
            <Aux>
                <h5 className="heading">
                    <Text tid="end_title" />
                </h5>
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="end">
                            <table className="table end-table">
                                <thead className="end-thead">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">
                                            <Text tid="stage" />
                                        </th>
                                        <th scope="col">
                                            <Text tid="status" />
                                        </th>
                                        {/* <th scope="col">Handle</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr className="end-tr">
                                        <td>1</td>
                                        <td>VCIP ID Status</td>
                                        <td>
                                            {this.props.pincodeRdr.statuses?.vcipidstatus === "0" ?
                                                (<span className="danger"><i className="far fa-times-circle"></i></span>) :
                                                (<span className="success"><i className="far fa-check-circle" /></span>)
                                            }
                                        </td>
                                    </tr> */}
                                    <tr className="end-tr" style={{ color: "white" }}>
                                        <td>1</td>
                                        <td className="td_white">
                                            <Text tid="address_proof" />
                                        </td>
                                        <td>
                                            {kycstatus === "0" ?
                                                (<span className="warning">
                                                    <Text tid="failed" />
                                                </span>) :
                                                (<span className="success">
                                                    <Text tid="successful" />
                                                </span>)}
                                        </td>
                                    </tr>
                                    <tr className="end-tr" style={{ color: "white" }}>
                                        <td>2</td>
                                        <td>
                                            <Text tid="identity_proof" />
                                        </td>
                                        <td>
                                            {panstatus === "0" ?
                                                (<span className="warning">
                                                    <Text tid="failed" />
                                                </span>) :
                                                (<span className="success">
                                                    <Text tid="successful" />
                                                </span>)}
                                        </td>
                                    </tr>
                                    {/* <tr className="end-tr">
                                        <td>5</td>
                                        <td>Video Conference Status</td>
                                        <td>
                                            {this.props.pincodeRdr.statuses?.videoconfstatus === "0" ?
                                                (<span className="danger"><i className="far fa-times-circle"></i></span>) :
                                                (<span className="success"><i className="far fa-check-circle" /></span>)
                                            }
                                        </td>
                                    </tr> */}
                                    {/* <tr className="end-tr">
                                        <td>3</td>
                                        <td>
                                            <Text tid="qtn_ans" />
                                        </td>
                                        <td>
                                            {qastatusus === "0" ?
                                                (<span className="warning">
                                                    <Text tid="pending" />
                                                </span>) :
                                                (<span className="success">
                                                    <Text tid="completed" />
                                                </span>)}
                                        </td>
                                    </tr> */}
                                    <tr className="end-tr" style={{ color: "white" }}>
                                        <td>3</td>
                                        <td>
                                            <Text tid="photo_capture" />
                                        </td>
                                        <td>
                                            {livecapturestatus === "0" ?
                                                (<span className="warning">
                                                    <Text tid="pending" />
                                                </span>) :
                                                (<span className="success">
                                                    <Text tid="completed" />
                                                </span>)
                                            }
                                        </td>
                                    </tr>
                                    <tr className="end-tr" style={{ color: "white" }}>
                                        <td>4</td>
                                        <td>
                                            <Text tid="banker_remark" />
                                        </td>
                                        <td>
                                            {status === "1" ?
                                                (<span className="warning">
                                                    <Text tid="pending" />
                                                </span>) :
                                                (status === "2" || status === "4" || status === "5") ? (<span className="success">
                                                    <Text tid="approved" />
                                                </span>) :
                                                    (status === "3" ? (<span className="danger">
                                                        <Text tid="rejected" />
                                                    </span>) : (<span className="warning">
                                                        <Text tid="pending" />
                                                    </span>))
                                            }
                                        </td>
                                    </tr>
                                    {/* <tr className="end-tr">
                                        <td>6</td>
                                        <td>
                                            <Text tid="auditor_remark" />
                                        </td>
                                        <td>
                                            {status === "2" ?
                                                (<span className="warning">
                                                    <Text tid="pending" />
                                                </span>) :
                                                status === "4" ? (<span className="success">
                                                    <Text tid="approved" />
                                                </span>) :
                                                    (status === "5" ? (<span className="danger">
                                                        <Text tid="rejected" />
                                                    </span>) : (<span className="text-info">
                                                        <Text tid="waiting" />
                                                    </span>))
                                            }
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                        {/* <button type="button" data-toggle="modal" data-target="#end" className="btn custom-btn mr-2">Home</button> */}


                        {
                            (kycstatus === "1" &&
                                panstatus === "1" &&
                                videoconfstatus === "3" &&
                                qastatusus === "2" &&
                                livecapturestatus === "1") ?
                                (<Aux>
                                    {/* <h4 className="text-success text-center">
                                        Agent has ended the Video Conference
                                    </h4> */}
                                    <div className="text-center mb-4">
                                        <button type="button" data-toggle="modal" data-target="#end" className="btn custom-btn text-white">
                                            <Text tid="home" />
                                        </button>
                                    </div>
                                </Aux>) :
                                (<Aux>
                                    {/* <h4 className="text-warning text-center">
                                        Please complete Video KYC
                                    </h4> */}
                                    <div className="text-center mb-4">
                                        {/* <button type="button" onClick={this.inComplete} className="btn custom-btn">Re-join</button> */}
                                        <button type="button" data-toggle="modal" data-target="#end" className="btn custom-btn mr-2 text-white">
                                            <Text tid="home" />
                                        </button>
                                    </div>
                                </Aux>)
                        }

                    </div>
                </div>

                <div className="modal fade" id="end" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "50%" }} role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions border-right-0">
                                    <h6 className="instructions-title pl-0 text-center text-dark">
                                        {content}
                                    </h6>
                                    <h5 className="instructions-title pl-0 text-center text-dark">
                                        <Text tid="end_content2" />
                                        <span className="badge badge-primary ml-2"> {vcip}</span>
                                    </h5>
                                    <div className="text-center">
                                        <button type="button" onClick={this.end} className="btn custom-btn mt-3">
                                            <Text tid="home" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { pincodeRdr } = state;
    return { pincodeRdr }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ResetRdrAction: () => dispatch(ResetRdrAction()),
        ResetEndRdrAction: () => dispatch(ResetEndRdrAction()),
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(End);
