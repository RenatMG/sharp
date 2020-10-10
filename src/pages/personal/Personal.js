import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchUserInfo, logOutUser} from "../../store/actions/userActions";
import {Page} from "../../layouts";
import {fetchTransactionHistory} from "../../store/actions/transactionActions";
import {getUserError, getUserId} from "../../store/selectors";
import {TransactionCreator, TransactionHistory} from "../../features";


const Personal = ({history}) => {

    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const error = useSelector(getUserError);

    useEffect(() => {
        if (!userId) {
            dispatch(fetchUserInfo())
        } else {
            dispatch(fetchTransactionHistory())
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
        <Page title={title}>
            <div className='container-lg'>
                <div className="row">
                    <div className="col-12 col-sm-6 d-flex flex-column py-5">
                        <TransactionCreator/>
                    </div>
                    <div className="col-12 col-sm-6 d-flex flex-column py-5">
                        <TransactionHistory/>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default Personal;

