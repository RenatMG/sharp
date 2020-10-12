import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchUserInfo, logOutUser} from "../../store/actions/userActions";
import {Page} from "../../layouts";
import {getUserError, getUserId} from "../../store/selectors";
import {TransactionCreator, TransactionHistory} from "../../features";
import TransactionContextProvider from "./context/transactionContext";


const Personal = ({history}) => {

    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const error = useSelector(getUserError);

    useEffect(() => {
        if (!userId) {
            dispatch(fetchUserInfo())
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (error) {
            dispatch(logOutUser());
            history.push('/login');
        }
    }, [error, history, dispatch]);

    const title = 'Personal';

    return (
        <TransactionContextProvider>
            <Page title={title}>
                <div className='container-lg'>
                    <div className="row">
                        <div className="col-12 col-sm-6 d-flex flex-column py-3 py-sm-5">
                            <TransactionCreator/>
                        </div>
                        <div className="col-12 col-sm-6 d-flex flex-column py-3 py-sm-5">
                            <TransactionHistory/>
                        </div>
                    </div>
                </div>
            </Page>
        </TransactionContextProvider>
    );
};

export default Personal;

