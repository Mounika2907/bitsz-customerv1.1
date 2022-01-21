import React, { Component } from 'react'
// import { toast } from 'react-toastify';
import Aux from '../../../hoc/Aux';
import Attachment from '../../../Component/Forms/Attachment/Attachment';
import AttachmentInfo from '../../../Component/Forms/Attachment/AttachmentInfo111';
import { connect } from 'react-redux';
import { PanAction, PanReportAction } from '../../../Store/Actions/UsersActions/UserActions';
const $ = window.$;

class PAN extends Component {
    state = {
        imgPath: null,
        status: false,
        addClass: ""
    }

    componentDidMount() {
        // debugger
        // document.querySelector('steps-link');
        if (this.props.PanRdr.PanDetails) {
            this.setState({
                status: false
            })
        }
        // this.loadScripts();
    }

    loadScripts = () => {
        const dynamicScripts = [
            '/js/script.js',
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

    handleChange = (event) => {
        event.preventDefault();
        if (event.target.files) {
            const val = event.target.files.length;
            for (let i = 0; i < val; i++) {
                let reader = new FileReader();
                reader.onload = function (ev) {
                    this.setState({
                        imgPath: ev.target.result.split(',')[1]
                    })
                }.bind(this);
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }

    uploadFile = (event) => {
        event.preventDefault();
        const $this = this;
        this.props.PanAction(this.state.imgPath, $this);
        // this.setState({
        //     status: true
        // })
    }

    handleProceed = () => {
        sessionStorage.setItem("width", "54%");
        sessionStorage.setItem("step", 4);
        this.props.history.push('/video-chat');
    }
    findReportPAN = () => {
        const addClass = this;
        this.props.PanReportAction(addClass);
        // document.getElementById()
        // $('#attachment').modal('hide')
    }

    render() {

        return (
            <Aux>
                <h5 className="heading">PAN Verification</h5>
                <div className="row justify-content-center">
                    <Attachment
                        selectImg={this.handleChange}
                        imgSrc={this.state.imgPath}
                        upload={this.uploadFile}
                        addClass={this.state.addClass}
                        find={this.findReportPAN}
                        panInfo={this.props.PanRdr.PanInfo}
                    />
                    {this.state.status === true ?
                        <AttachmentInfo
                            panData={this.props.PanRdr.PanDetails}
                            proceed={this.handleProceed}
                        /> : (null)}

                </div>

                <hr className="hr" />

                <div className="row justify-content-center">
                    <div className="col-md">
                        <div className="instructions sr1">
                            <h5 className="instructions-title pl-4">Instructions</h5>
                            <ul className="instructions-list">
                                <li>
                                    The Image uploaded should be in JPG/JPEG/PNG format only
                                </li>
                                <li>
                                    The size of image should not be less than 300kb
                                </li>
                                <li>
                                    The image font size should have atleast 10 pixels
                                </li>
                                <li>
                                    please upload the front side of PAN card
                                </li>
                                <li>
                                    The captured image should not be blurred
                                </li>
                                <li>
                                    The image should be captured with flat angle and the Angle should not be tilted.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button type="button" className="custom-btn" data-toggle="modal" data-target="#panmodal">Proceed</button>

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
                                    <h1 className="modal-data-title">PAN verification successfull</h1>
                                    <p className="modal-data-content">
                                        Please wait, we are taking you to the next step
                                    </p>
                                </div>
                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.proceed}>Understood</button>
                            </div> */}
                        </div>
                    </div>
                </div>

            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { PanRdr } = state;
    return {
        PanRdr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        PanAction: (body, $this) => dispatch(PanAction(body, $this)),
        PanReportAction: (addClass) => dispatch(PanReportAction(addClass))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PAN);