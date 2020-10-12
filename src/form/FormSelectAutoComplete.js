import React, {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import {fetchTransactionUserList} from "../store/actions/transactionActions";
import {getTransactionLoading, getTransactionUserList} from "../store/selectors";
import {useTransaction} from "../pages/personal/context/transactionContext";

const FormSelectAutoComplete = (props) => {
    const {input, name, label, meta: {touched, error}, className} = props;
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = useState([]);
    const [query, setQuery] = useState('');
    const [startSearch, setStartSearch] = useState(false);
    const selectWrapperRef = useRef(null);

    const {setResetForm, resetForm} = useTransaction();

    const loading = useSelector(getTransactionLoading);
    const userList = useSelector(getTransactionUserList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (query && startSearch) {
            const delaySearch = setTimeout(() => {
                dispatch(fetchTransactionUserList(query));

            }, 500);
            return () => {
                clearTimeout(delaySearch)
            }
        }
    }, [query, startSearch, dispatch]);

    useEffect(() => {
        if (userList.length) {
            setOpen(true);
        }
        setOptions(userList);
    }, [userList]);


    useEffect(() => {
        if (!query && selectWrapperRef.current.querySelector('input') === document.activeElement) {
            console.log('clear')
            input.onChange('');
            setOptions([]);
            setOpen(false);
        }
    }, [query, input]);

    useEffect(() => {
        document.addEventListener('mousedown', closeDropDownHandler);
        return () => {
            document.removeEventListener('mousedown', closeDropDownHandler)
        }
    }, []);

    const closeDropDownHandler = event => {
        const {current: wrap} = selectWrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setOpen(false)
        }
    };

    const setSearchResult = result => {
        setQuery(result);
        setOpen(false);
        setStartSearch(false);
        input.onChange(result);
    };

    const setQueryHandler = (value) => {
        setResetForm(false);
        setQuery(value);
        setStartSearch(true)
    };

    return (
        <div ref={selectWrapperRef} className={className}>
            <TextField
                className='w-100'
                value={resetForm ? '' : query || input.value}
                label={label}
                placeholder={label}
                error={touched && !!error}
                helperText={touched && error}
                onClick={() => setOpen(!!options.length)}
                onChange={(e) => setQueryHandler(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <>
                            {loading ? <CircularProgress color="primary" size={20}/> : null}
                        </>
                    ),
                }}
                name={name}
            />


            {
                open &&
                <div className={`${className}__list`}>
                    {
                        options.map(option => {
                            return (
                                <div tabIndex="0" onClick={() => setSearchResult(option.name)}
                                     key={option.id}>{option.name}</div>)
                        })
                    }
                </div>
            }

        </div>
    )


};

export default FormSelectAutoComplete;

