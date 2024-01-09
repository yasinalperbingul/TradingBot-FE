import React from 'react';
import Settings from '../components/settings';

const profile = () => {
    return (
        <div className='bg-gray-100 min-h-screen'>
            <main className='bg-gray-100 min-h-screen'>
                <div className='flex justify-between px-4 pt-4'>
                    <h1>User Settings</h1>
                    <h2>Welcome Back, Alper</h2>
                </div>

                <Settings></Settings>
            </main>
        </div>
    );
};

export default profile;
