import React from 'react';
import './Auth.scss';

import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import FormLogin from "../../form/FormLogin";
import FormRegister from "../../form/FormRegister";
import {Page} from "../../layouts";
import {Loader} from "../../components";
import {loginUser, registerUser} from "../../store/actions/userActions";
import {getUserAuthenticated, getUserError, getUserLoading} from "../../store/selectors";


const Auth = (props) => {

const loading= useSelector(getUserLoading);
const error= useSelector(getUserError);
const isAuthenticated= useSelector(getUserAuthenticated);


    const dispatch = useDispatch();
    const isLogin = props.match.path === '/login';
    const title = isLogin ? 'Sign In' : 'Sign Up';

    const submitHandler = values => {
        isLogin ? dispatch(loginUser(values)) : dispatch(registerUser(values))
    };

    if (isAuthenticated ) {
        return <Redirect to={'/personal'}/>
    }

    return (
        <Page className='Auth' title={title}>
            {loading && <Loader/>}
            <div className="container-lg">
                <div className="row px-2 px-sm-3 py-2 py-sm-5">
                    <Paper className='Auth__form col-12 col-sm-8 col-md-6 d-flex flex-column p-4 p-sm-5 my-2 my-sm-5 mx-auto'>
                        {error &&
                        <Typography variant='subtitle1' color='secondary' className='text-center'>{error}</Typography>}
                        <Typography variant='h2'>{title}</Typography>
                        {
                            isLogin
                                ?
                                <>
                                    <Link to='/register' className="Auth__link">Need an account?</Link>
                                    <FormLogin buttonText={title} onSubmit={submitHandler}/>
                                </>
                                :
                                <>
                                    <Link to='/login' className="Auth__link">Have an account?</Link>
                                    <FormRegister buttonText={title} onSubmit={submitHandler}/>
                                </>
                        }
                    </Paper>
                </div>
            </div>
        </Page>
    );
};

export default Auth;
