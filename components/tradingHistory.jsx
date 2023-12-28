import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

const TradingHistory = ({ responseData }) => {
    const [selectedCoin, setSelectedCoin] = useState('');
    const [tradeHistory, setTradeHistory] = useState(null);
    

    useEffect(() => {
        const fetchSelectedData = async () => {
            console.log("Selected Coin:", selectedCoin);
            console.log("Selected Coin Webiste:", `http://127.0.0.1:8000/livetrading/my-trades/${selectedCoin}USDT/`);
            try {
                if (selectedCoin) {
                    console.log("entered selectedCoin")
                    const selectedResponse = await axios.get(`http://127.0.0.1:8000/livetrading/my-trades/${selectedCoin}USDT/`);
                    // Use the selected data as needed
                    setTradeHistory(selectedResponse)
                    console.log(selectedResponse);
                }
            } catch (error) {
                console.error('Error fetching selected data:', error);
            }
        };

        fetchSelectedData();
    }, [selectedCoin]);

    const handleSelectChange = (event) => {
        setSelectedCoin(event.target.value);
    };

    return (
        <>
            <div class="box-content h-128 w-64 p-4">
                {/* Optional Form */}
                <div className="inline-block relative w-64">
                    <select
                        value={selectedCoin}
                        onChange={handleSelectChange}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a coin...</option>
                        {responseData &&
                            responseData.map((item, index) => (
                                <option key={index} value={item.coin}>
                                    {item.coin}
                                </option>
                            ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>

                {/* Trade History */}
                <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-5xl mx-auto mt-8">
                    {tradeHistory &&
                        tradeHistory.data.map((item, index) => (
                            <li key={index} className={`border-t border-gray-200 ${index > 0 ? 'mt-8' : ''}`}>
                                <div className="px-6 py-8 sm:px-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl leading-6 font-medium text-gray-900 mb-2">{`Trade ${index + 1}`}</h3>
                                        <p className="text-xs text-gray-500">{`Date: ${new Date(item.time).toLocaleString()}`}</p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-500">
                                            Status: <span className={item.isBuyer ? 'text-green-600' : 'text-red-600'}>{item.isBuyer ? 'Bought' : 'Sold'}</span>
                                        </p>
                                        <span className="text-sm font-medium text-gray-500">{`at Price: ${item.price}`}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    )
}

export default TradingHistory