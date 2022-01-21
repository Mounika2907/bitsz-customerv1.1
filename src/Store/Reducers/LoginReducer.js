const INITIAL = {
    info: {}
}

const LoginReducer = (state = INITIAL, action) => {
    switch (action) {
        case "value":
            return { ...state, info: action.payload }

        default:
            return state;
    }
}

export default LoginReducer;