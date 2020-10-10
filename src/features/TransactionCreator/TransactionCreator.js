import React from 'react';
import './TransactionCreator.scss';
import Typography from "@material-ui/core/Typography";
import FormTransactions from "../../form/FormTransactions";
import {reset} from "redux-form";
import {
    createTransactionPayment, resetTransactionUserList
} from "../../store/actions/transactionActions";
import {useDispatch, useSelector} from "react-redux";
import {getTransactionError, getUserBalance} from "../../store/selectors";

const TransactionCreator = () => {

    const dispatch = useDispatch();
    const balance = useSelector(getUserBalance);
    const error = useSelector(getTransactionError);

    const validateBalance = value => {
        return value && balance < +value ? `Oops! It looks like you don't have enough money for this operation... Your balance is ${balance}` : undefined
    };

    const submitHandler = (values) => {
        dispatch(reset('transactions'));
        dispatch(resetTransactionUserList());
        dispatch(createTransactionPayment(values));
    };

    return (
        <>
            {
                balance &&
                <>
                    <Typography variant='h5' className='py-3 text-center'>
                        Create transaction
                    </Typography>
                    < FormTransactions
                        className='TransactionCreator'
                        onSubmit={submitHandler}
                        balance={balance}
                        error={error}
                        validateBalance={validateBalance}/>
                </>
            }
        </>
    );
};

export default TransactionCreator;