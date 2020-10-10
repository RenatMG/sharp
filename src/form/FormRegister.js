import React from 'react';
import {Field, reduxForm} from "redux-form";
import FormControlGroup from "./FormControlGroup";
import Button from "@material-ui/core/Button";
import {validateRegister as validate} from "./validators";


const FormRegister = (props) => {

    const {handleSubmit, submitting, buttonText} = props;

    return (
        <form autoComplete={'on'} onSubmit={handleSubmit}>
            <Field name='username' label='Please enter your name (e.g. John Smith), is required' placeholder='name'
                   component={FormControlGroup}/>
            <Field name='email' label='Please enter your email (e.g. jsmith@gmail.com), is required' placeholder='email'
                   component={FormControlGroup}/>
            <Field type='password' name='password' label='Please enter your password, is required'
                   placeholder='password' component={FormControlGroup}/>
            <Field type='password' name='confirmPassword' label='Please confirm your password, is required'
                   placeholder='confirm password' component={FormControlGroup}/>
            <Button type='submit' variant='contained' color='primary'
                    disabled={submitting}
                    className="Auth__btn">{buttonText}</Button>
        </form>
    );
};

export default reduxForm({form: 'register', validate})(FormRegister);