import React, {useEffect, useState} from 'react';
import './TransactionCreator.scss';
import Typography from "@material-ui/core/Typography";
import FormTransactions from "../../form/FormTransactions";
import {reset} from "redux-form";
import {
    createTransactionPayment, resetTransactionPayment
} from "../../store/actions/transactionActions";
import {useDispatch, useSelector} from "react-redux";
import {getTransactionError, getTransactionPayment, getUserBalance} from "../../store/selectors";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useTransaction} from "../../pages/personal/context/transactionContext";

const TransactionCreator = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const balance = useSelector(getUserBalance);
    const error = useSelector(getTransactionError);
    const payment = useSelector(getTransactionPayment);
    const {setResetForm} = useTransaction();

    useEffect(() => {
        if (payment.id) {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                dispatch(resetTransactionPayment())
            }, 4000)
        }
    }, [payment, dispatch]);

    const validateBalance = value => {
        return value && balance < +value ? `Oops! It looks like you don't have enough money for this operation... Your balance is ${balance}` : undefined
    };

    const resetHandler = () => {
        dispatch(reset('transactions'));
        setResetForm(true);
    };

    const submitHandler = (values) => {
        dispatch(createTransactionPayment(values));
        resetHandler();
    };

    const handleClose = () => {
        setOpen(false);
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
                    <Dialog
                        maxWidth='xs'
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle id="alert-dialog-title">Result info</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Transaction to {payment.username} was successful!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </>
    );
};

export default TransactionCreator;