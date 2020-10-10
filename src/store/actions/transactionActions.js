import {FETCH_USER_LIST_ERROR, FETCH_USER_LIST_START, FETCH_USER_LIST_SUCCESS} from "../actionTypes";
import pw from "../../api/pw";


export function fetchUserlist(username) {
    return async dispatch => {
        try {
            dispatch({type: FETCH_USER_LIST_START});
            const token = localStorage.getItem('id_token');
            if (token) {
                const response = await pw.post('/api/protected/user-info',
                    {
                        filter: username
                    },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                );
                console.log(response.data)
                // let {user_info_token} = response.data;
                // dispatch({type: FETCH_USER_LIST_SUCCESS, payload: {user: user_info_token}});
            } else {
                dispatch({type: FETCH_USER_LIST_ERROR, payload: {error: 'Wrong token'}})
            }
        } catch (e) {
            dispatch({
                type: FETCH_USER_LIST_ERROR,
                payload: {error: !!e.response && e.response.data ? e.response.data : e.message}
            })
        }
    }
}