// import router from '@/router'
// import store from '@/store'

import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

const BASE_URL = process.env.NODE_ENV !== 'development'
    ? '/api/'
    : '//localhost:3030/api/'


export const HttpService =  {
    get(endpoint, data){
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data){
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data){
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data){
        return ajax(endpoint, 'DELETE', data)
    }
}


async function ajax(endpoint, method='get', data=null) {
    try {
        const res = await axios({
            method,
            url: `${BASE_URL}${endpoint}`,
            data
        })
        return res.data;
    } catch (err) {
        if (err.response.status === 401) {
            return 'err'
            // throw new Error('error:  http.service page')
            // router.push('/');
        }
    }
}

