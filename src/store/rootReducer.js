import {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form'
import userReducer from "./reducers/userReducer";
import transactionReducer from "./reducers/transactionReducer";

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    transaction: transactionReducer
});

export default rootReducer