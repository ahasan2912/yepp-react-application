import React from 'react';
import { images } from '../assets/image';

const LoadingSpiner = () => {
    return (
        <div className="h-screen flex justify-center items-center w-full">
            <img className='w-full' src={images.slapLoader} alt="slapLoader" />
        </div>
    );
};

export default LoadingSpiner;