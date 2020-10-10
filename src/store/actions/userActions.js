import {
    USER_AUTH_SUCCESS,
    USER_ERROR, USER_INFO_SUCCESS, USER_LOGOUT, USER_RESET_ERROR, USER_SET_PROPERTY,
    USER_START,
} from "../actionTypes";
import pw from "../../api/pw";

export function fetchUserInfo() {
    return async dispatch => {
        try {
            dispatch({type: USER_START});
            const token = localStorage.getItem('id_token');
            if (token) {
                const response = await pw.get('/api/protected/user-info', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                let {user_info_token} = response.data;
                dispatch({type: USER_INFO_SUCCESS, payload: {userInfo: user_info_token}});
            } else {
                dispatch({type: USER_ERROR, payload: {error: null}})
            }
        } catch (e) {
            dispatch({
                type: USER_ERROR,
                payload: {error: !!e.response && e.response.data ? e.response.data : e.message}
            })
        }
    }
}

export function registerUser({username, email, password}) {
    return async dispatch => {
        try {
            dispatch({type: USER_START});
            const response = await pw.post('/users', {username, email, password});
            let {id_token} = response.data;
            if (id_token) {
                await localStorage.setItem('id_token', id_token);
                dispatch({type: USER_AUTH_SUCCESS});
            } else {
                dispatch({type: USER_ERROR, payload: {error: response.statusText}})
            }
        } catch (e) {
            dispatch({
                type: USER_ERROR,
                payload: {error: !!e.response && e.response.data ? e.response.data : e.message}
            })
        }
    }
}

export function loginUser({email, password}) {
    return async dispatch => {
        try {
            dispatch({type: USER_START});
            const response = await pw.post('/sessions/create', {email, password});
            let {id_token} = response.data;
            if (id_token) {
                await localStorage.setItem('id_token', id_token);
                dispatch({type: USER_AUTH_SUCCESS});
            } else {
                dispatch({type: USER_ERROR, payload: {error: response.statusText}})
            }
        } catch (e) {
            dispatch({
                type: USER_ERROR,
                payload: {error: !!e.response && e.response.data ? e.response.data : e.message}
            })
        }
    }
}

export function logOutUser() {
    localStorage.removeItem('id_token');
    return {
        type: USER_LOGOUT
    }
}

export function setUserProperty(property, value) {
    return {
        type: USER_SET_PROPERTY,
        payload: {
            property,
            value
        }
    }
}

export function resetUserError() {
    return {type: USER_RESET_ERROR}
}




