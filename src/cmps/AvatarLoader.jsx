import avatarLoader from '../assets/gif/avatarLoader.gif'


import React from 'react';

const AvatarLoader = ({ isHome }) => {
    return <div>
         <img src={avatarLoader} alt="loading" className={isHome ? "avatar avatar-loader home" : "avatar avatar-loader"}/>
    </div>;
}

export default AvatarLoader;