import React from 'react';
import BackTestingResults from '../components/bactestingResults.jsx';

const backtesting = () => {
    return (
        <div className='bg-gray-100 min-h-screen'>
            <main className='bg-gray-100 min-h-screen'>
                <div className='flex justify-between px-4 pt-4'>
                    <h1>Back-Testing Results</h1>
                    <h2>Welcome Back, Alper</h2>
                </div>
                <div className='p-10'>
                    <BackTestingResults></BackTestingResults>
                </div>
            </main>
        </div>
    );
};

export default backtesting;
