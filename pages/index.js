import React from 'react';

export default function Home() {
  return (
    <div className="w-full p-4">
      <main role="main" className="w-full flex flex-col h-screen content-center justify-center">
        <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-50 rounded-xl m-auto">
          <div className="bg-white rounded shadow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 sm:mx-0 sm:h-10 sm:w-10">
                {/* Replace the color and icon based on your preferences */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Crypto Trading Bot</h3>
                <div className="mt-2">
                  <p className="text-gray-500">
                    Welcome to the Crypto Trading Bot dashboard. This page demonstrates a responsive layout using <a href="https://tailwindcss.com/" className="text-blue-500">Tailwind CSS</a>. You can customize this template for your cryptocurrency trading needs.
                  </p>
                  <p className="text-gray-500 mt-2">
                    Monitor your trades, analyze market data, and configure your trading strategies with ease.
                  </p>
                  <p className="text-gray-500 mt-2">
                    Explore the exciting world of cryptocurrency trading with our powerful trading bot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
