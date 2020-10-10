import React, {useEffect} from 'react';
import './Home.scss';
import Fab from "@material-ui/core/Fab";
import {Page} from "../../layouts";
import ParrotLogo from "../../assets/svg/ParrotLogo";
import {useDispatch} from "react-redux";
import {resetUserError} from "../../store/actions/userActions";


const Home = ({history}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetUserError());
    }, [dispatch]);

    const title = 'Parrot Wings';

    return (
        <Page className='home' title={'Home'}>

           <ParrotLogo className='home__logo'/>

            <Fab
                variant="extended"
                size="large"
                color="primary"
                aria-label={title}
                className='home__btn'
                onClick={() => history.push('/login')}
            >
                {title} - start smart transactions!
            </Fab>
        </Page>
    );
};

export default Home;