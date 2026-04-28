import React from 'react';

const Title = ({ children }) => {
    return (
        <h1 className='mb-3 text-3xl font-bold leading-tight text-[#111827] sm:text-4xl'>
            {children}
        </h1>
    );
};

export default Title;
