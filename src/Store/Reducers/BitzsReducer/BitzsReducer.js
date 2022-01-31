import * as actionTypes from '../../Actions/types';

const INITIAL = {
    stage: {},
    statuses: {},
    photo: undefined,
}

const bitszReducer = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.STAGE:
            return { ...state, stage: action.payload }
        case actionTypes.CAPTUREPHOTO:
            return { ...state, photo: action.payload }

        default:
            return state;
    }
}

export default bitszReducer;