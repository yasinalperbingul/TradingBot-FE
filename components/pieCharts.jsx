import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PieCharts = ({ responseData }) => {
    const [binanceData, setBinanceData] = useState([]);
    const [calculatedValues, setCalculatedValues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const binanceDataArray = [];
            //console.log("pieCharts responseData:");
            //console.log(responseData);
            for (const coinInfo of responseData) {
                if (coinInfo.coin != "USDT") {
                    //console.log("Entered pieCharts:");
                    //console.log(coinInfo.coin + 'USDT');
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

            console.log("BinanceDataArray:");
            console.log(binanceDataArray)

            // Set the binanceData array with the fetched data
            setBinanceData(binanceDataArray);


            console.log("responseData in pieCaharts:");
            console.log(responseData)
            // Calculate values by multiplying free with lastPrice
            const calculatedValuesArray = responseData.map((coinInfo, index) => {
                const binanceDataEntry = binanceDataArray[index];
                if (binanceDataEntry) {
                    const calculatedAmount = parseFloat(coinInfo.free) * parseFloat(binanceDataEntry.lastPrice);
                    return {
                        coin: coinInfo.coin,
                        calculatedAmount: calculatedAmount.toFixed(5), // Adjust precision as needed
                    };
                } else {
                    return {
                        coin: coinInfo.coin,
                        calculatedAmount: coinInfo.free, // or any other fallback value
                    };
                }
            });

            // Set the calculated values in state
            setCalculatedValues(calculatedValuesArray);
        };

        fetchData();
    }, [responseData]);

    const data = [
        {
            name: "Twitter",
            value: 200400,
        },
        {
            name: "Facebook",
            value: 205000,
        },
        {
            name: "Instagram",
            value: 23400,
        },
        {
            name: "Snapchat",
            value: 20000,
        },
        {
            name: "LinkedIn",
            value: 29078,
        },
        {
            name: "YouTube",
            value: 18900,
        },
    ];

    const colors = [
        "#8884d8",
        "#FA8072",
        "#AF69EE",
        "#3DED97",
        "#3AC7EB",
        "#F9A603",
    ];
    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <PieChart width={400} height={250}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>

                {/* Display the calculated values */}
                <h2>Calculated Values</h2>
                <ul>
                    {calculatedValues.map((value) => (
                        <li key={value.coin}>
                            {value.coin} : {value.calculatedAmount} {value.coin}USDT
                        </li>
                    ))}
                </ul>

            </div>
        </>
    );
};

export default PieCharts;