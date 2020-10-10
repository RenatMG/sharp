import React, {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import {fetchTransactionUserList, resetTransactionUserList} from "../store/actions/transactionActions";
import {getTransactionLoading, getTransactionUserList} from "../store/selectors";


const RecipientSelect = ({
    input, name, label, meta: {touched, error},
    ...custom
}) => {

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = useState([]);
    const [filter, setFilter] = useState('');

    const loading = useSelector(getTransactionLoading);
    const userList = useSelector(getTransactionUserList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (filter) {
                dispatch(resetTransactionUserList());
            const delaySearch = setTimeout(() => {
                dispatch(fetchTransactionUserList(filter));
            }, 500);
            return () => {
                clearTimeout(delaySearch)
            }
        }
    }, [filter, dispatch]);

    useEffect(() => {
        setOptions(userList);
    }, [userList]);

    const changeHandler = (evt, value) => {
        if (value) {
            input.onChange(value.name);
        }
    };

    return (
        <div>
            <Autocomplete
                id={name}
                key={!!options.length}
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
                onChange={changeHandler}
                noOptionsText={custom.noOptionsText}
                clearOnEscape={true}
                value={filter}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        error={touched && !!error}
                        onChange={(e) => setFilter(e.target.value)}
                        helperText={custom.helperText}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="primary" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </div>
    );
};

export default RecipientSelect;