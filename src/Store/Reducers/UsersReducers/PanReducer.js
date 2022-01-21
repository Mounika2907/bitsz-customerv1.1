import * as actionTypes from '../../Actions/types';

const INITIAL = {
    PanInfo: {},
    PanDetails: {},
    KYCDetails: {},
    AadhaarDetails: [],
    questions: [],
    singleQuestion: [],
    languagesList: [],
    scheduleDetails: {},
    calenderDetails: {},
    panData: {}
}

const PanRdr = (state = INITIAL, action) => {
    switch (action.type) {
        case actionTypes.PANINFO:
            return { ...state, PanInfo: action.payload }

        case actionTypes.PANDETAILS:
            return { ...state, PanDetails: action.payload }

        case actionTypes.AADHAAR:
            return { ...state, AadhaarDetails: action.payload }

        case actionTypes.KYCINFO:
            return { ...state, KYCDetails: action.payload }

        case actionTypes.QUESTIONS:
            return { ...state, questions: action.payload }

        case actionTypes.SINGLEQUESTION:
            const newSate = state.questions?.filter(result => result.sno === action.payload)
            return { ...state, singleQuestion: newSate }

        case actionTypes.LANGAUGESLIST:
            return { ...state, languagesList: action.payload }

        case actionTypes.SCHEDULEDETAILS:
            return { ...state, scheduleDetails: action.payload }

        case actionTypes.CALENDER:
            return { ...state, calenderDetails: action.payload }

        case actionTypes.PANDATA:
            return { ...state, panData: action.payload }

        case actionTypes.RESET:
            return {
                ...state,
                scheduleDetails: {},
                calenderDetails: {},
            }

        default:
            return state;
    }
}

export default PanRdr;