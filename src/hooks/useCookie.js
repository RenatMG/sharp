import {useState, useEffect} from 'react';
import Cookies from "js-cookie";

export default (key, initialValue = '') => {
    const [value, setValue] = useState(() => {
        return Cookies.get(key) || initialValue
    });

    useEffect(() => {
        Cookies.set(key, value)
    }, [value])

    return [value, setValue]
}