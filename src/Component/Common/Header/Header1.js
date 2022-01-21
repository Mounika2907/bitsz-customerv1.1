import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    state = {
        width: '',
        classes: {
            steps: ''
        }
    }

    handleSteps = (val, steps) => {
        // this.setState({
        //     ...this.state,
        //     width: val
        // });
        // let step = "step"+steps;
        // let classes = "completed"+steps;
        sessionStorage.setItem("width", val);
        sessionStorage.setItem("step", steps);
        this.setState({
            ...this.state,
            width: val,
            className: {
                steps: steps
            }
        })
    }

    render() {
        const progress = {
            width: this.state.width || sessionStorage.getItem("width")
        }
        const completedSteps = this.state.classes.steps || sessionStorage.getItem("step");
        // console.log(completedSteps);

        return (
            <Aux>
                <div className="row">
                    <div className="col-12">
                        <h1 className="title">
                            Customer onboarding process - Video KYC
                        </h1>
                        <div className="user-steps">
                            <div className="step-line">
                                <div className="step-progress" style={progress} />
                            </div>
                            <ul className="nav nav-fill steps-nav">
                                <li className="nav-item steps-item">
                                    <NavLink to="/" exact onClick={() => this.handleSteps("0%", 1)}
                                        className="nav-link steps-link">
                                        <div className={`step-box ${1 < completedSteps ? 'completed' : ''}`}>
                                            <span className="step-count step-count1">
                                                Start
                                        </span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item steps-item">
                                    <NavLink to="/aadhaar"  exact onClick={() => this.handleSteps("19%", 2)}
                                        className="nav-link steps-link">
                                        <div className={`step-box ${2 < completedSteps ? 'completed' : ''}`}>
                                            <span className="step-count">
                                                1
                                        </span>
                                        </div>
                                        <p className="step-name">
                                            Aadhaar 
                                            Verification
                                        {/* <br /> */}
                                    </p>
                                    </NavLink>
                                </li>
                                <li className="nav-item steps-item">
                                    <NavLink to="/pan"  exact onClick={() => this.handleSteps("38%", 3)}
                                        className="nav-link steps-link">
                                        <div className={`step-box ${3 < completedSteps ? 'completed' : ''}`}>
                                            <span className="step-count">
                                                2
                                        </span>
                                        </div>
                                        <p className="step-name">
                                            PAN 
                                            Verification
                                        {/* <br /> */}
                                    </p>
                                    </NavLink>
                                </li>
                                <li className="nav-item steps-item">
                                    <NavLink to="/video-chat"  exact onClick={() => this.handleSteps("54%", 4)}
                                        className="nav-link steps-link">
                                        <div className={`step-box ${4 < completedSteps ? 'completed' : ''}`}>
                                            <span className="step-count">
                                                3
                                        </span>
                                        </div>
                                        <p className="step-name">
                                            Video 
                                            KYC
                                        {/* <br /> */}
                                    </p>
                                    </NavLink>
                                </li>
                                <li className="nav-item steps-item">
                                    <NavLink to="/video-chat"  exact onClick={() => this.handleSteps("70%", 5)}
                                        className="nav-link steps-link">
                                        <div className={`step-box ${5 < completedSteps ? 'completed' : ''}`}>
                                            <span className="step-count">
                                                4
                                        </span>
                                        </div>
                                        <p className="step-name">
                                            Q &amp; A 
                                            Session
                                        {/* <br /> */}
                                    </p>
                                    </NavLink>
                                </li>
                                <li className="nav-item steps-item">
                                    <NavLink to="/video-chat"  exact onClick={() => this.handleSteps("85%", 6)}
                                        className="nav-link steps-link">
                                        <div className={`step-box ${6 < completedSteps ? 'completed' : ''}`}>
                                            <span className="step-count">
                                                5
                                        </span>
                                        </div>
                                        <p className="step-name">
                                            Capture 
                                            Photo
                                        {/* <br /> */}
                                    </p>
                                    </NavLink>
                                </li>
                                <li className="nav-item steps-item">
                                    <NavLink to="/video-chat"  exact onClick={() => this.handleSteps("100%", 7)}
                                        className="nav-link steps-link">
                                        <div className="step-box">
                                            <span className="step-count step-count1">
                                                Finish
                                        </span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </Aux>
        )
    }
}

export default Header;
