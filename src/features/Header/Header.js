import React from 'react';
import './Header.scss'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link, NavLink} from "react-router-dom";
import ParrotLogo from "../../assets/svg/ParrotLogo";

const Header = () => {
    return (
        <AppBar position='static'>
            <Toolbar className='Header__links d-flex justify-content-between'>
                <Link to={'/'}>
                   <ParrotLogo width='50px' height='50px' fill='#fff'/>
                </Link>
                <div className='d-flex'>
                    <NavLink to={'/login'} className="mr-3"> <Typography variant="h5">Sign In</Typography></NavLink>
                    <NavLink to={'/register'}> <Typography variant="h5">Sign Un</Typography></NavLink>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;