import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
    // State to hold the fetched data
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk',
                headers: {
                    'X-RapidAPI-Key': '4f6f4feb16mshc145d19db724f08p10be07jsn5b5aa1310274',
                    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                // Set the fetched data to the state
                setResponseData(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {responseData && responseData.data.map((news, index) => (
                <div key={index} className="max-w-md rounded overflow-hidden shadow-lg">
                    <img className="w-full" src={news.thumbnail} alt={news.title} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{news.title}</div>
                        <p className="text-gray-700 text-base">{news.description}</p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#category1</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#category2</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#category3</span>
                    </div>
                    <div className="px-6 pb-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => window.open(news.url, '_blank')}>
                            Read More
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}

export default News