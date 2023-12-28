import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import TradingHistory from './tradingHistory';

const AllCoins = () => {
    // State to hold the fetched data
    const [responseData, setResponseData] = useState(null);
    const [responseImages, setResponseImages] = useState(null);


    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/livetrading/coin/20/');
                // Set the fetched data to the state
                setResponseData(response.data);
                console.log("My coins info:", response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    // Effect to fetch data when the component mounts
    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://coinranking1.p.rapidapi.com/coins',
                    params: {
                        referenceCurrencyUuid: 'yhjMzLPhuIDl',
                        timePeriod: '24h',
                        'tiers[0]': '1',
                        orderBy: 'marketCap',
                        orderDirection: 'desc',
                        limit: '50',
                        offset: '0'
                    },
                    headers: {
                        'X-RapidAPI-Key': '4f6f4feb16mshc145d19db724f08p10be07jsn5b5aa1310274',
                        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
                    }
                };

                const response = await axios.request(options);
                //console.log(response.data.data.coins)
                // Assuming you want to use a specific property from the response data, replace 'data' with the actual property name
                setResponseImages(response.data.data);

                // console.log(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    return (
        <div className='my-8'>
            <div className='grid gap-4 p-4'>
                {/* Wallet Coin Information */}
                <h1 className='text-xl hover:subpixel-antialiased font-bold'>Wallet</h1>
                {responseData &&
                    responseData.map((item, index) => (
                        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                            <div className='p-4 grid md:grid-cols-6 grid-cols-1 gap-4'>
                                <div>
                                    {responseImages.coins.map((imageItem, imageIndex) => (
                                        <div key={imageIndex}>
                                            {imageItem.symbol === item.coin.toUpperCase() && (
                                                <img className="w-12 h-auto" src={imageItem.iconUrl} alt={item.name} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="card-content">
                                    <h2 className="font-bold text-xl mb-2">{item.coin}</h2>
                                    <p>{item.free}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                {/* Optional Form and Trade History */}
                <TradingHistory responseData={responseData} />
            </div>
        </div>
    );


}

export default AllCoins