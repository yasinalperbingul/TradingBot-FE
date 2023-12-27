import React from 'react';
import News from '../components/news.jsx'

const news = () => {
    return (
        <div className='bg-gray-100 min-h-screen'>
            <main className='bg-gray-100 min-h-screen'>
                <div className='flex justify-between px-4 pt-4'>
                    <h1>News</h1>
                    <h2>Welcome Back, Alper</h2>
                </div>

                <News/>
            </main>
        </div>
    );
};

export default news;
