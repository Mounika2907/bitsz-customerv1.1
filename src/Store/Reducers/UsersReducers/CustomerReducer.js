import * as actionTypes from '../../Actions/types';

const INITIAL = {
    waitingList: {},
    error: '',
    newId: '',
    endVideoCall: '',
    location: '',
}

const VideoReducer = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.RESETEND:
            return { ...state, endVideoCall: action.payload }
            
        case actionTypes.QUEUE:
            return { ...state, waitingList: action.payload }

        case actionTypes.QUEUEERROR:
            return { ...state, error: action.payload }

        case actionTypes.NEWID:
            return { ...state, newId: action.payload }

        case actionTypes.ENDVIDEOCALL:
            return { ...state, endVideoCall: action.payload }

        case actionTypes.LOCATION:
            return { ...state, location: action.payload }

        default:
            return state;
    }
}

export default VideoReducer;