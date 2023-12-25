import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

const AllCoins = () => {
    // State to hold the fetched data
    const [responseData, setResponseData] = useState(null);
    const [responseImages, setResponseImages] = useState(null);

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/livetrading/coin/1/');
                // Set the fetched data to the state
                setResponseData(response.data);
                //console.log(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
                // Set the fetched data to the state
                setResponseImages(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []); // Empty dependency array to run the effect only once when the component mounts


    return (
        <div className='my-8'>
            <div className='grid gap-4 p-4'>
                {responseData &&
                    responseData.map((item, index) => (
                        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
                            <div className='p-4 grid md:grid-cols-6 grid-cols-1 gap-4'>
                                <div>
                                    {responseImages.map((imageItem, imageIndex) => (
                                        <div key={imageIndex}>
                                            {imageItem.symbol === item.name.toLowerCase() && (
                                                <img className="w-12 h-auto" src={imageItem.image} alt={item.name} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="card-content">
                                    <h2 className="font-bold text-xl mb-2">{item.name}</h2>
                                    <p>{item.free}</p>
                                </div>
                            </div>

                        </div>
                    ))}
            </div>
        </div>
    );

}

export default AllCoins