import * as actionTypes from '../../Actions/types';

const INITIAL = {
    stage: {},
    statuses: {}
}

const bitszReducer = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.STAGE:
            return { ...state, stage: action.payload }

        default:
            return state;
    }
}

export default bitszReducer;