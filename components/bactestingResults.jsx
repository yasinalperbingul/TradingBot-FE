import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackTestingResults = () => {
    const [responseData, setResponseData] = useState(null);

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
                            Parameters
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Test Set Results
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Train Set Results
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {responseData &&
                        responseData.map((result, index) => (
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
                                <td className="px-6 py-4">
                                    {result.test_results.parameters.map((param, paramIndex) => (
                                        <div key={paramIndex}>
                                            {`ma_type: ${param.ma_type}, ma_length: ${param.ma_length}, atr_length: ${param.atr_length}, source_type: ${param.source_type}, atr_multiplier: ${param.atr_multiplier}`}
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4">
                                    {result.test_results.test_set_results.map((testResult, testIndex) => (
                                        <div key={testIndex}>
                                            {`pnl: ${(testResult.pnl * 100).toFixed(2)}%, max_drawdown: ${(testResult.max_drawdown * 100).toFixed(
                                                2
                                            )}%`}
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4">
                                    {result.test_results.train_set_results.map((trainResult, trainIndex) => (
                                        <div key={trainIndex}>
                                            {`pnl: ${(trainResult.pnl * 100).toFixed(2)}%, max_drawdown: ${(trainResult.max_drawdown * 100).toFixed(
                                                2
                                            )}%`}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};


export default BackTestingResults