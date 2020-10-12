import React from 'react';
import './Header.scss'

import {Link, NavLink, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import ParrotLogo from "../../assets/svg/ParrotLogo";
import CoinsIcon from "../../assets/svg/CoinsIcon";
import LogOutIcon from "../../assets/svg/LogOutIcon";
import UserIcon from "../../assets/svg/UserIcon";
import {logOutUser} from "../../store/actions/userActions";
import {getUserBalance, getUserLoading, getUserName} from "../../store/selectors";

const Header = ({history}) => {

    const dispatch = useDispatch();
    const loading = useSelector(getUserLoading);
    const balance = useSelector(getUserBalance) || 0;
    const name = useSelector(getUserName);

    const userLogOut = () => {
        dispatch(logOutUser());
        history.push('/login');
    };

    return (
        <AppBar position='static'>
            <div className='container-fluid'>
                {
                    <Toolbar className='d-flex justify-content-between p-0'>
                        <Link to={'/'} className='header__logo header__link'>
                            <ParrotLogo width='40px' height='40px' fill='#fff'/>
                            <Typography variant="h5" className='ml-2 d-none d-sm-block'>Parrot Wings</Typography>
                        </Link>
                        {
                            !loading &&
                            <>
                                {
                                    !name
                                        ?
                                        <div className='d-flex'>
                                            <NavLink to={'/login'} className="header__link mr-1 mr-sm-2">
                                                <Typography variant="button" className='header__text'>Sign In</Typography>
                                            </NavLink>
                                            <NavLink to={'/register'} className='header__link'>
                                                <Typography variant="button" className='header__text'>Sign Up</Typography>
                                            </NavLink>
                                        </div>
                                        :
                                        <div className='d-flex align-items-center'>
                                            <div className='d-flex align-items-center mr-1 mr-sm-4'>
                                                <UserIcon width='30px' height='30px' fill='#fff'/>
                                                <Typography variant="button"
                                                            className='header__text ml-2'>{name}</Typography>
                                            </div>
                                            <div className='d-flex align-items-center mr-1 mr-sm-4'>
                                                <CoinsIcon width='30px' height='30px' fill='#fff'/>
                                                <Typography variant="button"
                                                            className='header__text ml-2'>balance: {balance} PWM</Typography>
                                            </div>
                                            <div className='header__link d-flex align-items-center'>
                                                <LogOutIcon width='20px' height='30px' fill='#fff'/>
                                                <Typography variant="button" className='header__text ml-2'
                                                            onClick={userLogOut}>Logout</Typography>

                                            </div>
                                        </div>
                                }
                            </>
                        }
                    </Toolbar>
                }
            </div>
        </AppBar>
    );
};

export default withRouter(Header);