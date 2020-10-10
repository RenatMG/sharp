import React from 'react';
import './Login.scss';

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Page} from "../../layouts";
import {NavLink} from "react-router-dom";


import FormLogin from "../../form/FormLogin";
import {useDispatch} from "react-redux";
import {login} from "../../store/actions/authActions";

const Login = () => {

    const dispatch= useDispatch();

    const submitHandler = values => {
       dispatch(login(values))
    };

    const title = 'Sign In';

    return (
        <Page className='Auth' title={title}>
            <div className="container">
                <div className="row px-2 px-sm-3 py-5">
                    <Paper className='Auth__form col-12 col-md-6 d-flex flex-column p-4 p-sm-5 my-5 mx-auto'>
                        <Typography variant='h2'>{title}</Typography>
                        <NavLink to='/register'>Need an account?</NavLink>
                        <FormLogin buttonText={title} onSubmit={submitHandler}/>
                    </Paper>
                </div>
            </div>
        </Page>
    );
};

export default Login;
