import pw from "../../api/pw";
import {
    TRANSACTION_START,
    TRANSACTION_ERROR,
    TRANSACTION_USER_LIST_SUCCESS,
    TRANSACTION_SET_PROPERTY,
    TRANSACTION_HISTORY_SUCCESS, TRANSACTION_PAYMENT_SUCCESS,
} from "../actionTypes";

export function fetchTransactionUserList(username) {
    return async dispatch => {
        try {
            dispatch({type: TRANSACTION_START});
            const token = localStorage.getItem('id_token');
            if (token) {
                const response = await pw.post('/api/protected/users/list',
                    {
                        filter: username
                    },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                );
                dispatch({type: TRANSACTION_USER_LIST_SUCCESS, payload: {userList: response.data}});
            } else {
                dispatch({type: TRANSACTION_ERROR, payload: {error: null}})
            }
        } catch (e) {
            dispatch({
                type: TRANSACTION_ERROR,
                payload: {error: !!e.response && e.response.data ? e.response.data : e.message}
            })
        }
    }
}

export function setTransactionProperty(property, value) {
    return {
        type: TRANSACTION_SET_PROPERTY,
        payload: {
            property,
            value
        }
    }
}

export function createTransactionPayment({name, amount}) {
    return async dispatch => {
        try {
            dispatch({type: TRANSACTION_START});
            const token = localStorage.getItem('id_token');
            if (token) {
                const response = await pw.post('/api/protected/transactions',
                    {name, amount},
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }
                );
                let {trans_token} = response.data;
                if (trans_token) {
                    dispatch({type: TRANSACTION_PAYMENT_SUCCESS, payload: {transaction: trans_token}});
                } else {
                    dispatch({type: TRANSACTION_ERROR, payload: {error: response.statusText}})
                }
            } else {
                dispatch({type: TRANSACTION_ERROR, payload: {error: null}})
            }
        } catch (e) {
            dispatch({
                type: TRANSACTION_ERROR,
                payload: {error: !!e.response && e.response.data ? e.response.data : e.message}
            })
        }
    }
}

export function fetchTransactionHistory() {
    return async dispatch => {
        try {
            dispatch({type: TRANSACTION_START});
            const token = localStorage.getItem('id_token');
            if (token) {
                const response = await pw.get('/api/protected/transactions', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                let {trans_token} = response.data;
                dispatch({type: TRANSACTION_HISTORY_SUCCESS, payload: {history: trans_token}});
            } else {
                dispatch({type: TRANSACTION_ERROR, payload: {error: null}})
            }
        } catch (e) {
            dispatch({
                type: TRANSACTION_ERROR,
                payload: {error: !!e.response && e.response.data ? e.response.data : e.message}
            })
        }
    }
}

export function resetTransactionUserList() {
    return dispatch => {
        dispatch(setTransactionProperty('userList', []))
    }
}