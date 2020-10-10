import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import {fetchUserlist, setTransactionProperty} from "../../store/actions/transactionActions";

const RecipientSelect = () => {

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = useState([]);
    const [filter, setFilter] = useState('');

    const {userList, loading} = useSelector(state => state.transaction);
    const dispatch = useDispatch();

    useEffect(() => {
        if (filter) {
            const delaySearch = setTimeout(() => {
                dispatch(fetchUserlist(filter));
            }, 500);
            return () => {
                clearTimeout(delaySearch)
            }
        }
    }, [filter, dispatch]);

    useEffect(() => {
        if (filter) {
            setOptions(userList);
        }
    }, [userList, filter]);

    const selectHandler = (e, value) => {
        dispatch(setTransactionProperty('recipient', value));
    };

    return (
        <div>
            <Autocomplete
                id="recipient"
                style={{width: 300, height: 400}}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                onChange={selectHandler}
                noOptionsText={'No recipients'}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Recipient"
                        onChange={(e) => setFilter(e.target.value)}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    );
};

export default RecipientSelect;