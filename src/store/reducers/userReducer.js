import {
    USER_START,
    USER_ERROR,
    USER_INFO_SUCCESS,
    USER_AUTH_SUCCESS,
    USER_LOGOUT,
    USER_SET_PROPERTY, USER_RESET_ERROR,
} from "../actionTypes";

const initialState = {
    userInfo: {},
    isAuthenticated: false,
    loading: false,
    error: null
};

const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case USER_START:
            return {
                ...state,
                loading: true
            };
        case USER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload.error
            };
        case USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo: payload.userInfo,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        case USER_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                userInfo:{},
                loading: false,
                error: null,
            };
        case USER_SET_PROPERTY:
            return {
                ...state,
                [payload.property]: payload.value
            };
        case USER_RESET_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
};

export default userReducer;