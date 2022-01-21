import * as actionTypes from '../Actions/types';

const INITIAL = {
    stage: {},
    statuses: {}
}

const pincodeRdr = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.STAGE:
            return { ...state, stage: action.payload }

        case actionTypes.RESET:
            return { ...state, statuses: action.payload }

        case actionTypes.STATUSES:
            return { ...state, statuses: action.payload }

        default:
            return state;
    }
}

export default pincodeRdr;