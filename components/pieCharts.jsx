import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const generateColor = (str, index) => {
    const colorHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };

    const intToRGB = (i) => {
        const c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase()
            .padStart(6, '0');
        return `#${c}`;
    };

    return intToRGB(colorHash(str + index));
};

const PieCharts = () => {
    const [responseData, setResponseData] = useState(null);
    const [binanceData, setBinanceData] = useState([]);
    const [calculatedValues, setCalculatedValues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/livetrading/coin/20/');
                setResponseData(response.data);
                console.log("My coins info:", response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const binanceDataArray = [];

            for (const coinInfo of responseData) {
                if (coinInfo.coin !== "USDT") {
                    const options = {
                        method: 'GET',
                        url: 'https://binance43.p.rapidapi.com/ticker/24hr',
                        params: { symbol: coinInfo.coin + 'USDT' },
                        headers: {
                            'X-RapidAPI-Key': '4f6f4feb16mshc145d19db724f08p10be07jsn5b5aa1310274',
                            'X-RapidAPI-Host': 'binance43.p.rapidapi.com',
                        },
                    };

                    try {
                        const response = await axios.request(options);
                        binanceDataArray.push(response.data);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }

            setBinanceData(binanceDataArray);

            const calculatedValuesArray = responseData.map((coinInfo, index) => {
                const binanceDataEntry = binanceDataArray[index];
                if (binanceDataEntry) {
                    const calculatedAmount = parseFloat(coinInfo.free) * parseFloat(binanceDataEntry.lastPrice);
                    return {
                        coin: coinInfo.coin,
                        calculatedAmount: parseFloat(calculatedAmount.toFixed(5)),
                    };
                } else {
                    return {
                        coin: coinInfo.coin,
                        calculatedAmount: parseFloat(coinInfo.free),
                    };
                }
            });

            setCalculatedValues(calculatedValuesArray);
        };

        fetchData();
    }, [responseData]);

    return (
        <div className="flex">
            <div className="bg-white p-4 rounded-lg">
                <div className='grid grid-cols-3 gap-4'>
                    <div className="col-span-2 p-4">
                        <PieChart width={400} height={400}>
                            <Pie data={calculatedValues} dataKey="calculatedAmount" nameKey="coin" cx="50%" cy="50%" outerRadius={160} fill="#8884d8">
                                {calculatedValues.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={generateColor(entry.coin, index)} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div className="p-4">
                        <div className="flex flex-col items-start ml-4">
                            {calculatedValues.map((entry, index) => (
                                <div key={`legend-${index}`} className="flex items-center mb-2">
                                    <div className="w-6 h-6 mr-2" style={{ backgroundColor: generateColor(entry.coin, index) }}></div>
                                    <span>{entry.coin}</span>
                                    <span className="ml-2"> - {entry.calculatedAmount} USDT</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PieCharts;
