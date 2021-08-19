import { GET_MEMES, GET_MEME, IS_CLIENT_ERROR, UPDATE_UPLOAD, UPLOAD } from './types';
import axios from 'axios'

export const getMemes = () => async (dispatch) => {
    try {
        let res = await axios.get(`http://localhost:5002/api`, {
            withCredentials: true
        })
        const memes = res.data

        dispatch({
            type: GET_MEMES,
            payload: memes
        })

    } catch (e) {
        if(e.response?.status === 409) {
            return window.location = '/'
        }
        console.log('e:', e)
       
        return dispatch({
            type: IS_CLIENT_ERROR,
            payload: 'Something went wrong' 
        })
    }
}

export const viewMeme = (id) => async (dispatch) => {
    console.log('id:', id)
    try {
        let res = await axios.get(`http://localhost:5002/api/${id}`,{
            withCredentials: true
        })
        console.log('res:', res)
        const meme = res.data

        dispatch({
            type: GET_MEME,
            payload: meme
        })

    } catch (e) {
        console.log('e:', e)
        return dispatch({
            type: IS_CLIENT_ERROR,
            payload: 'Something went wrong' 
        })
    }
}

export const submitMeme = (state) => async (dispatch) => {
    console.log('state:', state)
try {
    const formData = new FormData()
    formData.append('file', state.file)
    formData.append('title', state.title)

    const res = await axios({
        method: 'POST',
        url: `http://localhost:5002/api`,
        data: formData,
        withCredentials: true
    })
    console.log(res)
    if(res.status === 200) {
        return dispatch({
            type: UPLOAD,
            payload: res.data
        })
    }
} catch(e) {
    if(e.response.status === 409) {
        return window.location = '/'
    }
    dispatch({
        type: IS_CLIENT_ERROR,
        payload: { error: 'Something went wrong' }
    })
}
    
    
}

export const updateUpload = (state) => {
    console.log('state:', state)
    return {
        type: UPDATE_UPLOAD,
        payload: state
    }
}