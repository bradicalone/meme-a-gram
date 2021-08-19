import axios from 'axios'
import { history } from '../components/routes/AppRouter'
import { LOGIN_ERROR, REGISTER } from './types';

export const startLogin = (state) => async (dispatch) => {

        try {
            if([state.name, state.password].includes('')) {
                throw 'All fields need to be filled out.'
            }
            const res = await axios({
                method: 'POST',
                url: `http://localhost:5002/user/login`,
                data: state,
                withCredentials: true
            })
            console.log(res.status)
            if(res.status === 200) {
                history.push('/home')
            }
            if(res.status === 409) {
                history.push('/')
            }
        } catch(err) {
            console.log('err:', err)
            dispatch({
                type: LOGIN_ERROR,
                payload: err
            })
        }
}

export const register = (state) => async (dispatch) => {
    
     console.log('state:', state)
    try {
        if([state.name, state.email, state.password, state.password2 ].includes('')) {
            return dispatch({
                type: LOGIN_ERROR,
                payload: 'All fields need to be filled out.'
            })
        }
        if(state.password !== state.password2) {
            return dispatch({
                type: LOGIN_ERROR,
                payload: 'Passwords don\'t match.'
            })
        }

        const res = await axios({
            method: 'POST',
            url: `http://localhost:5002/user/signup`,
            data: state,
            withCredentials: true
        })
        console.log(res.data)
        if(res.status === 200) {
            return dispatch({
                type: REGISTER,
                payload: res.data
            })
        }
    } catch(err) {
        console.log('err:', err.response.data)
        
        dispatch({
            type: LOGIN_ERROR,
            payload: err.response.data
        })
    }
}