import {createSelector} from "reselect";

// states
export function getUserState(state) {
    return state.user
}

export function getTransactionState(state) {
    return state.transaction
}

// from user state
export function getUserId(state) {
    return getUserState(state).userInfo.id
}

export function getUserError(state) {
    return getUserState(state).error
}

export function getUserLoading(state) {
    return getUserState(state).loading
}

export function getUserAuthenticated(state) {
    return getUserState(state).isAuthenticated
}

export function getUserInfoBalance(state) {
    return getUserState(state).userInfo.balance
}

export function getUserName(state) {
    return getUserState(state).userInfo.name
}

// from transaction
export function getTransactionError(state) {
    return getTransactionState(state).error
}

export function getTransactionLoading(state) {
    return getTransactionState(state).loading
}

export function getTransactionUserList(state) {
    return getTransactionState(state).userList
}

export function getTransactionPayment(state) {
    return getTransactionState(state).payment
}

export function getTransactionBalance(state) {
    return getTransactionPayment(state).balance
}

export function getTransactionHistory(state) {
       return getTransactionState(state).history
}

// re-selectors
export const getUserBalance = createSelector([getTransactionBalance, getUserInfoBalance], (tBalance, uBalance) => {
    return tBalance || uBalance
});



