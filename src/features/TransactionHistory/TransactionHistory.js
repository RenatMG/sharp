import React, {useEffect} from 'react';
import './TransactionHistory.scss'

import {useDispatch, useSelector} from "react-redux";
import List from "@material-ui/core/List";
import {ListItem, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {getTransactionHistory, getUserBalance} from "../../store/selectors";
import {fetchTransactionHistory} from "../../store/actions/transactionActions";


const TransactionHistory = () => {
    const history = useSelector(getTransactionHistory);
    const balance = useSelector(getUserBalance);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactionHistory())
    }, [balance, dispatch]);

  //  console.log(history)

    return (
        <>
            <Typography variant='h5' className='py-3 text-center'>
                History of transactions
            </Typography>
            <Paper className='TransactionHistory py-3'>
                <List>
                    {
                        history.map(item => {
                            return (
                                <ListItem key={item.id}>
                                    {item.username}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Paper>
        </>

    );
};

export default TransactionHistory;