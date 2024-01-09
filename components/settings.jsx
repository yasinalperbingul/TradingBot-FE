import React, { useState } from 'react';

const Settings = () => {
  const [name, setName] = useState('Alper Bingül');
  const [email, setEmail] = useState('alperbingul@example.com');
  const [theme, setTheme] = useState('light');
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [defaultTradingPair, setDefaultTradingPair] = useState('BTC/USD');
  const [enableNotifications, setEnableNotifications] = useState(true);

  const handleSave = () => {
    // Perform save operation (e.g., update user preferences in the database)
    console.log('Settings saved:', {
      name,
      email,
      theme,
      apiKey,
      secretKey,
      defaultTradingPair,
      enableNotifications,
    });
    // You can redirect the user or show a success message after saving
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>

      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 border rounded-md w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border rounded-md w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="theme" className="block text-sm font-medium text-gray-600">
            Theme
          </label>
          <select
            id="theme"
            className="mt-1 p-2 border rounded-md w-full"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-600">
            API Key
          </label>
          <input
            type="text"
            id="apiKey"
            className="mt-1 p-2 border rounded-md w-full"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="secretKey" className="block text-sm font-medium text-gray-600">
            Secret Key
          </label>
          <input
            type="password"
            id="secretKey"
            className="mt-1 p-2 border rounded-md w-full"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="defaultTradingPair" className="block text-sm font-medium text-gray-600">
            Default Trading Pair
          </label>
          <input
            type="text"
            id="defaultTradingPair"
            className="mt-1 p-2 border rounded-md w-full"
            value={defaultTradingPair}
            onChange={(e) => setDefaultTradingPair(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Enable Notifications
          </label>
          <input
            type="checkbox"
            id="enableNotifications"
            className="mt-1"
            checked={enableNotifications}
            onChange={() => setEnableNotifications(!enableNotifications)}
          />
        </div>

        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
