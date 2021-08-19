import { IS_CLIENT_ERROR, GET_MEMES, GET_MEME, UPDATE_UPLOAD, UPLOAD} from '../actions/types';

const initState = {
    upload: {
        title: '',
        src: '',
        file: null,
        isUploaded: false,
    },
    memes: [],
    meme: {
        title: null,
        src: ''
    },
    error: null
};

const memeData = (state = initState, action) => {
    switch (action.type) {
        case GET_MEMES: {
            console.log(action.payload)
            return {
                ...state,
                memes: [...action.payload.sort((a, b) => b.meme_id - a.meme_id )]
            }
        }
        case UPLOAD: {
            return {
                ...state,
                upload: {...state.upload, ...action.payload, isUploaded: true, file: null}
            }
        }
        case GET_MEME: 
            return {
                ...state,
                meme: {...state.meme, ...action.payload}
            }
        case UPDATE_UPLOAD: 
            return {
                ...state,
                upload: {...state.upload, ...action.payload}
            }
            case IS_CLIENT_ERROR: 
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};

export default memeData;
