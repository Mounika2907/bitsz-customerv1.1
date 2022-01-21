import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import UserFormCmp from '../../../Component/Forms/UserForm/UserFormCmp';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { PincodeAction } from '../../../Store/Actions/PincodeAction';

class Login extends Component {
    state = {
        email: '',
        name: '',
        phone: '',
        pincode: '500045',
        state: 'Telengana',
        district: 'Hyderabad',
        town: 'Chandanagar',
        address: '',

        // error: {
        //     emailErr: '',
        //     pwdErr: ''
        // }
    }

    componentDidMount() {
        // if (this.state.pincode === '') {
        //     const code = "500045";
        //     this.props.PincodeAction(code);
        // } else {
            this.props.PincodeAction(this.state.pincode)
        // }
    }

    // HANDLE INPUT
    handleChange = (event) => {
        event.preventDefault();
        if (event.target.name === "pincode") {
            // debugger
            let len = event.target.value;
                this.setState({
                    pincode: len
                })
            
            if (len.length === 6) {
                this.props.PincodeAction(len);
                // return
            }
            // return
        } 
        // else {

        // }
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    HandleSubmit = (event) => {
        event.preventDefault();
        if (this.state.email && this.state.name) {
            const body = {
                "orgname": this.state.name,
                "city": this.state.district,
                "state": this.state.state,
                "pincode": this.state.pincode,
                "email": this.state.email,
                "mobile": this.state.phone
            }
            toast.success("Sucess");
            this.props.history.push('/aadharupload');
        } else {
            toast.warning("Please fill all the data");
        }
    }

    render() {        
        return (
            <Aux>
                <UserFormCmp change={this.handleChange}
                    login={this.HandleSubmit}
                    check={!(this.state.email && this.state.name)}
                    pincode={this.state.pincode}
                    state={this.props.pincodeRdr.modal.State}
                    district={this.props.pincodeRdr.modal.District}
                    town={this.props.pincodeRdr.modal.Block}
                />
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
        PincodeAction: (id) => dispatch(PincodeAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
