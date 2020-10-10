import {
    TRANSACTION_START,
    TRANSACTION_ERROR,
    TRANSACTION_USER_LIST_SUCCESS,
    TRANSACTION_SET_PROPERTY, TRANSACTION_HISTORY_SUCCESS, TRANSACTION_PAYMENT_SUCCESS
} from "../actionTypes";

const initialState = {
    userList: [],
    payment: {},
    history: [],
    loading: false,
    error: null
}
const transactionReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case TRANSACTION_START:
            return {
                ...state,
                loading: true
            };
        case TRANSACTION_ERROR:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case TRANSACTION_USER_LIST_SUCCESS:
            return {
                ...state,
                userList: payload.userList,
                loading: false,
                error: null
            };
        case TRANSACTION_PAYMENT_SUCCESS:
            return {
                ...state,
                payment: payload.transaction,
                userList: [],
                loading: false,
                error: null
            };
        case TRANSACTION_HISTORY_SUCCESS:
            return {
                ...state,
                history: payload.history,
                loading: false,
                error: null
            };
        case TRANSACTION_SET_PROPERTY:
            return {
                ...state,
                [payload.property]: payload.value
            };
        default:
            return state
    }
}
export default transactionReducer;