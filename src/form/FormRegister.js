import React from 'react';
import {Field, reduxForm} from "redux-form";
import FormControlGroup from "./FormControlGroup";
import Button from "@material-ui/core/Button";
import {validateLogin as validate} from "./validators";


const FormLogin = (props) => {

    const {handleSubmit, submitting} = props

    return (
        <form autoComplete={'on'} onSubmit={handleSubmit}>
            <Field name='email' label='Please enter your email, is required' placeholder='email'
                   component={FormControlGroup}/>
            <Field name='password' label='Please enter your password, is required'
                   placeholder='password' component={FormControlGroup}/>
            <Button type='submit' variant='contained' color='primary'
                disabled={submitting}
                    className="Auth__btn">Sign In</Button>
        </form>
    );
};

export default reduxForm({form: 'login', validate})(FormLogin);