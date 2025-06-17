import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import './Home.css';

// Mock weather data with more detailed information
const mockWeatherData = {
  Kathmandu: {
    temperature: 25,
    feels_like: 27,
    description: 'Partly cloudy',
    humidity: 60,
    windSpeed: 10,
    icon: '03d',
    forecast: [
      { day: 'Mon', temp: 26, icon: '03d' },
      { day: 'Tue', temp: 24, icon: '09d' },
      { day: 'Wed', temp: 25, icon: '01d' }
    ]
  },
  Pokhara: {
    temperature: 28,
    feels_like: 30,
    description: 'Sunny',
    humidity: 55,
    windSpeed: 8,
    icon: '01d',
    forecast: [
      { day: 'Mon', temp: 29, icon: '01d' },
      { day: 'Tue', temp: 27, icon: '02d' },
      { day: 'Wed', temp: 28, icon: '01d' }
    ]
  },
  Lalitpur: {
    temperature: 26,
    feels_like: 28,
    description: 'Rainy',
    humidity: 70,
    windSpeed: 12,
    icon: '09d',
    forecast: [
      { day: 'Mon', temp: 25, icon: '09d' },
      { day: 'Tue', temp: 24, icon: '10d' },
      { day: 'Wed', temp: 26, icon: '09d' }
    ]
  },
  Biratnagar: {
    temperature: 32,
    feels_like: 35,
    description: 'Hot',
    humidity: 40,
    windSpeed: 15,
    icon: '01d',
    forecast: [
      { day: 'Mon', temp: 33, icon: '01d' },
      { day: 'Tue', temp: 34, icon: '01d' },
      { day: 'Wed', temp: 32, icon: '01d' }
    ]
  }
};

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Kathmandu');
  const [unit, setUnit] = useState('metric');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      if (mockWeatherData[location]) {
        setWeather(mockWeatherData[location]);
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  const convertTemp = (temp) => {
    return unit === 'imperial' ? (temp * 9/5 + 32).toFixed(1) : temp;
  };

  const handleLocationChange = (e) => {
    setIsLoading(true);
    setLocation(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="home-container">
      <h1>WeatherNepal</h1>

      <div className="controls">
        <div className="control-group">
          <label>Select Location:</label>
          <select value={location} onChange={handleLocationChange}>
            {Object.keys(mockWeatherData).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Select Unit:</label>
          <select value={unit} onChange={handleUnitChange}>
            <option value="metric">Metric (°C)</option>
            <option value="imperial">Imperial (°F)</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      ) : weather ? (
        <>
          <WeatherCard
            location={location}
            temperature={convertTemp(weather.temperature)}
            feels_like={convertTemp(weather.feels_like)}
            description={weather.description}
            humidity={weather.humidity}
            windSpeed={weather.windSpeed}
            unit={unit}
            icon={weather.icon}
          />
          
          <div className="forecast">
            <h3>3-Day Forecast</h3>
            <div className="forecast-items">
              {weather.forecast.map((day) => (
                <div key={day.day} className="forecast-item">
                  <p>{day.day}</p>
                  <img 
                    src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                    alt={day.day} 
                  />
                  <p>{convertTemp(day.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="error">Weather data not available</p>
      )}
    </div>
  );
};

export default Home;