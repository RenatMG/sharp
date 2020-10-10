import React from 'react';
import './HomePage.scss';
import Fab from "@material-ui/core/Fab";


const HomePage = ({history}) => {
    return (
        <div className='HomePage'>
            <Fab
                variant="extended"
                size="large"
                color="primary"
                aria-label="PW App - Start!"
                className='HomePage__btn'
                onClick={()=>history.push('/login')}
            >
                PW App - Start!
            </Fab>
        </div>
    );
};

export default HomePage;