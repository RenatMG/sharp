import React from 'react';
import List from "@material-ui/core/List";
import {useSelector} from "react-redux";
import {ListItem, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const TransactionHistory = () => {
    const {historyTransactions} = useSelector(state => state.transaction);
    return (
       <>
            <Typography variant='h4' className='py-3 text-center'>
                History of transactions
            </Typography>
        <Paper>
            <List>
                {
                    historyTransactions.map(item => {
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