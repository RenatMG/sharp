import React from 'react';
import {Field, reduxForm} from "redux-form";

import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import FormControlGroup from "./FormControlGroup";
import {validateTransaction as validate} from "./validators";
import RecipientSelect from "./RecipientSelect";


const FormTransactions = (props) => {

        const {handleSubmit, submitting, validateBalance, error, className} = props;

        return (
            <Paper className={`${className} p-3 p-sm-5`}>
                {error &&
                <Typography variant='subtitle1' color='secondary' className='text-center'>{error}</Typography>}
                <form autoComplete={'on'} onSubmit={handleSubmit}>
                    <div className='d-flex flex-column'>
                        <Field name='name'
                               label="recipient"
                               placeholder='name'
                               helperText="Please start enter recipient's name"
                               noOptionsText='No recipients'
                               component={RecipientSelect}/>
                        <Field name='amount'
                               label='Please enter amount'
                               placeholder='amount'
                               validate={validateBalance}
                               component={FormControlGroup}/>

                        <Button type='submit' variant='contained' color='primary'
                                disabled={submitting}
                                className="Auth__btn">Create</Button>
                    </div>
                </form>
            </Paper>
        );
    }
;

export default reduxForm({form: 'transactions', validate})(FormTransactions);