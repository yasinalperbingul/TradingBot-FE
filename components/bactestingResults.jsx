import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackTestingResults = () => {
    const [responseData, setResponseData] = useState(null);
    const [selectedSymbol, setSelectedSymbol] = useState('');

    const uniqueSymbols = responseData
        ? Array.from(new Set(responseData.map(result => result.symbol)))
        : [];

    const handleSymbolChange = (event) => {
        setSelectedSymbol(event.target.value);
    };


    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/backtesting/api/backtests/');
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

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="symbolFilter" className="mr-2">Select Coin:</label>
                <select
                    id="symbolFilter"
                    onChange={handleSymbolChange}
                    value={selectedSymbol}
                >
                    <option value="">All Coins</option>
                    {uniqueSymbols.map(symbol => (
                        <option key={symbol} value={symbol}>{symbol}</option>
                    ))}
                </select>
            </div>


            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Symbol
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time Interval
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Population Size
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Generation Size
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ma_type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ma_length
                            </th>
                            <th scope="col" className="px-6 py-3">
                                atr_length
                            </th>
                            <th scope="col" className="px-6 py-3">
                                source_type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                atr_multiplier
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Train Set Results
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Test Set Results
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {responseData &&
                            responseData
                                .filter(result => !selectedSymbol || result.symbol === selectedSymbol)
                                .map((result, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-white dark:bg-gray-800'
                                            } border-b dark:border-gray-700`}
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {result.symbol}
                                        </td>
                                        <td className="px-6 py-4">{result.time_interval}</td>
                                        <td className="px-6 py-4">{result.population_size}</td>
                                        <td className="px-6 py-4">{result.generation_size}</td>
                                        <td>
                                            {result.test_results.parameters.map((param, paramIndex) => (
                                                <div key={paramIndex} className="p-10">
                                                    <div className="px-6 py-4">{param.ma_type}</div>
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            {result.test_results.parameters.map((param, paramIndex) => (
                                                <div key={paramIndex} className="p-10">
                                                    <div className="px-6 py-4">{param.ma_length}</div>
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            {result.test_results.parameters.map((param, paramIndex) => (
                                                <div key={paramIndex} className="p-10">
                                                    <div className="px-6 py-4">{param.atr_length}</div>
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            {result.test_results.parameters.map((param, paramIndex) => (
                                                <div key={paramIndex} className="p-10">
                                                    <div className="px-6 py-4">{param.source_type}</div>
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            {result.test_results.parameters.map((param, paramIndex) => (
                                                <div key={paramIndex} className="p-10">
                                                    <div className="px-6 py-4">{param.atr_multiplier}</div>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4">
                                            {result.test_results.train_set_results.map((trainResult, trainIndex) => (
                                                <div key={trainIndex} className='text-left'>
                                                    <div className='p-4'>
                                                        <strong>PnL</strong>
                                                        <div>{`${(trainResult.pnl * 100).toFixed(2)}%`}</div>
                                                        <br></br>
                                                        <strong>Max Drawdown:</strong>
                                                        <div>{`${(trainResult.max_drawdown).toFixed(2)}%`}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </td>

                                        <td className="px-6 py-4">
                                            {result.test_results.test_set_results.map((testResult, testIndex) => (
                                                <div key={testIndex} className='text-left'>
                                                    <div
                                                        key={testIndex}
                                                        className={`p-4 ${testResult.pnl >= 0 ? 'bg-green-200' : 'bg-red-200'}`}
                                                    >
                                                        <strong>PnL</strong>
                                                        <div>{`${(testResult.pnl * 100).toFixed(2)}%`}</div>
                                                        <br></br>
                                                        <strong>Max Drawdown:</strong>
                                                        <div>{`${(testResult.max_drawdown).toFixed(2)}%`}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default BackTestingResults