import React from 'react';
import classes from './Loader.module.scss'
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";


const Loader = () => {

    return (
        <Backdrop open={true} className={classes.loader}>
            <CircularProgress color="primary"/>
        </Backdrop>
    );
};

export default Loader;