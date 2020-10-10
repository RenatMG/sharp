import React from "react";
import TextField from "@material-ui/core/TextField";

export const FormTextField = ({
    label,
    input,
    meta: { touched,  error },
    ...custom
}) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && !!error}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);
export default FormTextField;