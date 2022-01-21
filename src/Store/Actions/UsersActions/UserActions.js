import * as actionTypes from '../types';
// import Axios from '../../../hoc/axios';
// import { toast } from 'react-toastify';
// import base64 from 'react-native-base64';

// RESET ALL REDUCERES
export const ResetRdrAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESET,
            payload: undefined
        })
    }
}


// RESET END CALL REDUCERES
export const ResetEndRdrAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESETEND,
            payload: ''
        })
    }
}

