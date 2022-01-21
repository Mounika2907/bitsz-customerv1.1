import React, { Component } from 'react';
import { ResetRdrAction } from '../../Store/Actions/ProcessAction';
import { connect } from 'react-redux';
const $ = window.$;

export class Clear extends Component {
    componentDidMount(){
        this.end();
    }

    end = () => {
        // $('#end').modal('hide');
        sessionStorage.clear();
        this.props.ResetRdrAction();
        this.props.history.replace("/");
        // window.location.reload(true);
    }
    render() {
        return (
            <div>
                <h1>ALL Clear</h1>
            </div>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clear);
