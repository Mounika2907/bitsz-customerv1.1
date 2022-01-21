import React from 'react'
import Aux from '../../../hoc/Aux';

const UserFormCmp = (props) => {
    return (
        <Aux>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5">
                        <div className="contact-form">
                            <h5 className="services-heading">Application Form</h5>
                            <form className="mt-sm-4" onSubmit={props.login}>
                                <div className="form-group position-relative">
                                    {/*    <label for="inputAddress">Address</label>*/}
                                    <input type="text" className="form-control custom_input"
                                        name="name" onChange={props.change}
                                        placeholder="Full Name" required />
                                    <i className="fas fa-user input_icon" />
                                </div>
                                <div className="form-group position-relative">
                                    {/*    <label for="inputAddress">Address</label>*/}
                                    <input type="email" className="form-control custom_input"
                                        name="email" onChange={props.change}
                                        placeholder="E-mail Address" required />
                                    <i className="fas fa-envelope input_icon" />
                                </div>
                                <div className="form-group position-relative">
                                    {/*    <label for="inputAddress">Address</label>*/}
                                    <input type="tel" className="form-control custom_input"
                                        name="phone" onChange={props.change}
                                        placeholder="Mobile" required />
                                    <i className="fas fa-user input_icon" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group position-relative col">
                                        {/*    <label for="inputAddress">Address</label>*/}
                                        <input type="number" className="form-control custom_input"
                                            name="pincode" value={props.pincode} onChange={props.change}
                                            placeholder="pincode" required />
                                        <i className="fas fa-user input_icon" />
                                    </div>
                                    <div className="form-group position-relative col">
                                        {/*    <label for="inputAddress">Address</label>*/}
                                        <input type="text" className="form-control custom_input"
                                            placeholder="State" name="state" value={props.state} required readOnly />
                                        <i className="fas fa-user input_icon" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group position-relative col">
                                        {/*    <label for="inputAddress">Address</label>*/}
                                        <input type="text" className="form-control custom_input"
                                            placeholder="District" name="district" value={props.district} required readOnly />
                                        <i className="fas fa-user input_icon" />
                                    </div>
                                    <div className="form-group position-relative col">
                                        {/*    <label for="inputAddress">Address</label>*/}
                                        <input type="text" className="form-control custom_input"
                                            placeholder="Town" name="town" value={props.town} required readOnly />
                                        <i className="fas fa-user input_icon" />
                                    </div>
                                </div>
                                <div className="form-group position-relative">
                                    <textarea className="form-control custom_input"
                                    name="address"
                                     rows={3} placeholder="Address" required defaultValue={""} />
                                    <i className="fas fa-comment input_icon" />
                                </div>
                                <button type="submit" disabled={props.check} className="btn btn-contact col">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default UserFormCmp;
