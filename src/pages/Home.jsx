import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import './Home.css';

// ✅ Mock weather data moved OUTSIDE component to avoid re-creation
const mockWeatherData = {
  Kathmandu: {
    temperature: 25,
    description: 'Partly cloudy',
    humidity: 60,
    windSpeed: 10,
  },
  Pokhara: {
    temperature: 28,
    description: 'Sunny',
    humidity: 55,
    windSpeed: 8,
  },
  Lalitpur: {
    temperature: 26,
    description: 'Rainy',
    humidity: 70,
    windSpeed: 12,
  },
  Biratnagar: {
    temperature: 32,
    description: 'Hot',
    humidity: 40,
    windSpeed: 15,
  },
};

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Kathmandu');
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    // Simulate fetching weather data from mock data
    if (mockWeatherData[location]) {
      setWeather(mockWeatherData[location]);
    }
  }, [location]); // ✅ Depend only on `location`, not `mockWeatherData`

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="home-container">
      <h1>Weather App</h1>

      <div className="controls">
        <label>
          Select Location:
          <select value={location} onChange={handleLocationChange}>
            {Object.keys(mockWeatherData).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Unit:
          <select value={unit} onChange={handleUnitChange}>
            <option value="metric">Metric (°C)</option>
            <option value="imperial">Imperial (°F)</option>
          </select>
        </label>
      </div>

      {weather ? (
        <WeatherCard
          temperature={unit === 'imperial' ? (weather.temperature * 9) / 5 + 32 : weather.temperature}
          description={weather.description}
          humidity={weather.humidity}
          windSpeed={weather.windSpeed}
          unit={unit}
        />
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Home;
