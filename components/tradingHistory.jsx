import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

const TradingHistory = ({ responseData }) => {
    const [selectedCoin, setSelectedCoin] = useState('');
    const [tradeHistory, setTradeHistory] = useState(null);
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };


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
            <div class="box-content p-4">
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


                <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-5xl mx-auto mt-8">
                    {tradeHistory &&
                        tradeHistory.data.map((item, index) => (
                            <li key={index} className={`border-t border-gray-200 ${index > 0 ? 'mt-8' : ''}`}>
                                <div className="px-6 py-8 sm:px-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl leading-6 font-medium text-gray-900 mb-2">{`Trade ${index + 1}`}</h3>
                                        <p className="text-xs text-gray-500">{`Date: ${new Date(item.time).toLocaleString()}`}</p>
                                    </div>
                                    <div className="mt-4">
                                        {/* Status */}
                                        <p className="text-sm font-medium text-gray-500 mb-4">
                                            Status: <span className={item.isBuyer ? 'text-green-600' : 'text-red-600'}>{item.isBuyer ? 'Bought' : 'Sold'}</span>
                                        </p>
                                        {/* Tabs */}
                                        <div className="flex mb-4">
                                            <button
                                                className={`px-4 py-2 rounded-tl-md ${activeTab === 1 ? 'bg-gray-300' : 'bg-gray-100'
                                                    } hover:bg-gray-200 focus:outline-none`}
                                                onClick={() => handleTabClick(1)}
                                            >
                                                Amount
                                            </button>
                                            <button
                                                className={`px-4 py-2 ${activeTab === 2 ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200 focus:outline-none`}
                                                onClick={() => handleTabClick(2)}
                                            >
                                                Total Value
                                            </button>
                                            <button
                                                className={`px-4 py-2 ${activeTab === 3 ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200 focus:outline-none`}
                                                onClick={() => handleTabClick(3)}
                                            >
                                                At Price
                                            </button>
                                            <button
                                                className={`px-4 py-2 rounded-tr-md ${activeTab === 4 ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200 focus:outline-none`}
                                                onClick={() => handleTabClick(4)}
                                            >
                                                Profit/Loss
                                            </button>
                                        </div>
                                        {/* Tab Content */}
                                        {activeTab === 1 && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">{`Amount: ${item.qty} ${item.symbol}`}</p>
                                            </div>
                                        )}
                                        {activeTab === 2 && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">{`Total Value: ${parseFloat(item.qty) * parseFloat(item.price)} USDT`}</p>
                                            </div>
                                        )}
                                        {activeTab === 3 && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">{`At Price: ${item.price}`}</p>
                                            </div>
                                        )}
                                        {activeTab === 4 && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Profit/Loss Ratio: {item.isBuyer ? 'No Profit or Loss' : (((parseFloat(item.price) - parseFloat(item.qty) * parseFloat(item.price)) / parseFloat(item.qty * parseFloat(item.price))) * 100).toFixed(2)} %
                                                </p>
                                            </div>
                                        )}
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