import React, {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import {fetchTransactionUserList} from "../store/actions/transactionActions";
import {getTransactionLoading, getTransactionUserList} from "../store/selectors";

const RecipientSelect = ({

    input, name, label, meta: {touched, error},
    ...custom
}) => {

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = useState([]);
    const [query, setQuery] = useState('');
    const selectWrapperRef = useRef(null);


    const loading = useSelector(getTransactionLoading);
    const userList = useSelector(getTransactionUserList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (query) {
            const delaySearch = setTimeout(() => {
                dispatch(fetchTransactionUserList(query));

            }, 500);
            return () => {
                clearTimeout(delaySearch)
            }
        }
    }, [query, dispatch]);

    useEffect(() => {
        if (userList.length) {
            setOpen(true);
        }
        setOptions(userList);
    }, [userList]);


    useEffect(() => {
        if (!query) {
            input.onChange('')
            setOptions([])
            setOpen(false)
        }
    }, [query, input]);

    useEffect(() => {
        document.addEventListener('mousedown', closeDropDownHandler)
        return () => {
            document.removeEventListener('mousedown', closeDropDownHandler)
        }
    }, []);

    const closeDropDownHandler = event => {
        const {current: wrap} = selectWrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setOpen(false)
        }
    }


    const setSearchResult = result => {
        setQuery(result)
        setOpen(false)
        setOptions([]);
        input.onChange(result);
    };

    // const searchOnChangeHandler = (query) => {
    //     setQuery(query);
    //     setOpen(true);
    // };


    return (
        <div ref={selectWrapperRef}>
            <TextField
                className='w-100'
                value={query}
                label={label}
                placeholder={label}
                error={touched && !!error}
                helperText={touched && error}
                onClick={() => setOpen(!open)}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <>
                            {!loading ? <CircularProgress color="primary" size={20}/> : null}
                        </>
                    ),
                }}
                name={name}
            />


            {
                open &&
                <div>
                    {
                        options.map(option => {
                            return (
                                <div tabIndex={0} onClick={() => setSearchResult(option.name)}
                                     key={option.id}>{option.name}</div>)
                        })
                    }
                </div>
            }

        </div>
    )


};

export default RecipientSelect;

