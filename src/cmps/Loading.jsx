import loading from "../assets/svg/loading.svg";


import React from 'react';

const Loading = () => {
    return <div className='loading-container'>
         <img src={loading} alt="loading" className="loading"/>
    </div>;
}

export default Loading;