import { LOGIN, LOGIN_ERROR, REGISTER} from '../actions/types';


const initState = {
    error: null,
    isAuthed: false,
    isRegistered: false
}

export const auth = (state = initState, action) => {
    switch (action.type) {
        case REGISTER: {
            return {
                ...initState,
                isRegistered: true
            }
        }
        case LOGIN_ERROR: {
            console.log(action.payload)
            return {
                ...state,
                error: action.payload
            }
        }
        default:
            return state
    }

};