import axios from 'axios';

export default axios.create({
    baseURL: 'http://193.124.114.46:3001',
    headers:{
        'Content-type':"application/json; charset=utf-8"
    }
});
