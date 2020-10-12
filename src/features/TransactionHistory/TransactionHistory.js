import React, {useEffect, useRef, useState} from 'react';
import './TransactionHistory.scss'

import {useDispatch, useSelector} from "react-redux";
import List from "@material-ui/core/List";
import {ListItem, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {change} from 'redux-form';

import {getTransactionHistory, getUserBalance} from "../../store/selectors";
import {fetchTransactionHistory} from "../../store/actions/transactionActions";
import {useTransaction} from "../../pages/personal/context/transactionContext";
import Button from "@material-ui/core/Button";


const TransactionHistory = () => {
    const [historyList, setHistoryList] = useState([]);
    const [sort, setSort] = useState('byDateIncrease');
    const history = useSelector(getTransactionHistory);
    const balance = useSelector(getUserBalance);
    const dispatch = useDispatch();

    const listRef = useRef(null);
    const {setResetForm} = useTransaction();

    useEffect(() => {

        let historyList = [...history];
        if (sort === 'byDateIncrease') {
            historyList = [...history].reverse()
        } else if (sort === 'byDateDecrease') {
            historyList = [...history].sort(function (a, b) {
                const timeA = new Date(a.date);
                const timeB = new Date(b.date);
                return timeA.getTime() - timeB.getTime();
            });
        } else if (sort === 'byNameAZ') {
            let collator = new Intl.Collator();
            historyList = [...history].sort(function (a, b) {
                return collator.compare(a.username, b.username);
            });
        } else if (sort === 'byNameZA') {
            let collator = new Intl.Collator();
            historyList = [...history].sort(function (a, b) {
                return collator.compare(a.username, b.username);
            }).reverse();
        } else if (sort === 'byAmountDecrease') {
            historyList = [...history].sort(function (a, b) {
                return a.amount - b.amount;
            });
        } else if (sort === 'byAmountIncrease') {
            historyList = [...history].sort(function (a, b) {
                return b.amount - a.amount;
            });
        }

        setHistoryList(historyList);

    }, [history, sort]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }, [balance]);


    useEffect(() => {
        if (!!balance) {
            dispatch(fetchTransactionHistory())
        }
    }, [balance, dispatch]);

    const setRecipientValues = ({username, amount}) => {
        setResetForm(false);
        dispatch(change('transactions', 'name', username))
        dispatch(change('transactions', 'amount', Math.abs(amount)))
    };

    return (
        <>
            {
                !!historyList.length
                &&
                <>
                    <Typography variant='h5' className='py-3 text-center'>
                        History of transactions
                    </Typography>
                    <Paper className='TransactionHistory py-3'>
                        <List ref={listRef} className='TransactionHistory__list'>
                            {
                                historyList.map(recipient => {
                                    return (
                                        <ListItem key={recipient.id} onClick={() => setRecipientValues(recipient)}>
                                            <small>{recipient.date}</small>
                                            <span className='TransactionHistory__text-main'> {recipient.username}</span>
                                            <div className='d-flex justify-content-between w-100'>
                                        <span>Amount:  <span
                                            className='TransactionHistory__text-main'>{Math.abs(recipient.amount)}</span></span>
                                                <span>Balance: <span
                                                    className='TransactionHistory__text-main'>{recipient.balance} PW</span></span>
                                            </div>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>

                        <div className='mt-4 d-flex justify-content-between'>
                            <Button onClick={() => setSort(sort === 'byNameAZ' ? 'byNameZA' : 'byNameAZ')}>
                                <Typography variant='overline'>
                                    by name&nbsp;
                                    {sort === 'byNameAZ' ? 'Z - A' : 'A - Z'}
                                </Typography>
                            </Button>
                            <Button
                                onClick={() => setSort(sort === 'byDateDecrease' ? 'byDateIncrease' : 'byDateDecrease')}>
                                <Typography variant='overline'>
                                    by date&nbsp;
                                    {sort === 'byDateDecrease' ? 'increase' : 'decrease'}
                                </Typography>
                            </Button>
                            <Button
                                onClick={() => setSort(sort === 'byAmountIncrease' ? 'byAmountDecrease' : 'byAmountIncrease')}>
                                <Typography variant='overline'>
                                    by amount&nbsp;
                                    {sort === 'byAmountIncrease' ? 'decrease' : 'increase'}
                                </Typography>
                            </Button>
                        </div>


                    </Paper>
                </>
            }

        </>

    );
};

export default TransactionHistory;