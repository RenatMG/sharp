import React from 'react';

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";


const FormControlGroup = (props) => {
    const {name, placeholder, label, input, meta: {touched, error}, ...custom} = props;
    const inValid = touched && !!error;
    return (
        <FormControl error={inValid} className='mt-2'>
            <InputLabel htmlFor={name}>{placeholder}</InputLabel>
            <Input id={name}
                   {...input}
                   {...custom}
            />
            <FormHelperText>{inValid ? error : label}</FormHelperText>
        </FormControl>
    );
};

export default FormControlGroup;