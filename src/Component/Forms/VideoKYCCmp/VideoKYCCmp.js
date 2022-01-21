import React from 'react'
import Aux from '../../../hoc/Aux';

const VideoKYCCmp = (props) => {
    return (
        <Aux>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form className="custom-form sr1" onSubmit={props.start}>
                        <div className="form-group position-relative">
                            <label className="custom-label" for="">V-CIP Number</label>
                            <input
                                type="number"
                                className="form-control custom-inp"
                                id="vcip"
                                aria-describedby="otp"
                                required
                                placeholder="V-CIP Number"
                            />
                            {/* <small id="otp" className="form-text text-danger">
                                We'll never share your email with anyone else.
                                </small> */}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="custom-btn">
                                Submit
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </Aux>
    )
}

export default VideoKYCCmp;
