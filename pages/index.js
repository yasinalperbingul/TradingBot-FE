import React from 'react';

export default function Home() {
  return (
    <div className="w-full p-4">
      <main role="main" className="w-full flex flex-col h-screen content-center justify-center">
        <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-50 rounded-xl m-auto">
          <div className="bg-white rounded shadow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Crypto Trading Bot</h3>
                <div className="mt-2">
                  <p className="text-gray-500">
                    Welcome to the Crypto Trading Bot dashboard. You can customize this template for your cryptocurrency trading needs.
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
