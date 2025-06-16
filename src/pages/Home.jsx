import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import './Home.css';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Kathmandu');
  const [unit, setUnit] = useState('metric');

  // Mock weather data for Nepali cities
  const mockWeatherData = {
    'Kathmandu': {
      temp: 22,
      feels_like: 24,
      humidity: 65,
      wind: 5,
      description: 'Partly Cloudy',
      icon: '03d'
    },
    'Pokhara': {
      temp: 25,
      feels_like: 27,
      humidity: 70,
      wind: 3,
      description: 'Sunny',
      icon: '01d'
    },
    'Biratnagar': {
      temp: 28,
      feels_like: 30,
      humidity: 75,
      wind: 4,
      description: 'Hot',
      icon: '01d'
    },
    'Bharatpur': {
      temp: 26,
      feels_like: 28,
      humidity: 68,
      wind: 2,
      description: 'Clear Sky',
      icon: '01d'
    },
    'Birgunj': {
      temp: 27,
      feels_like: 29,
      humidity: 72,
      wind: 3,
      description: 'Sunny',
      icon: '01d'
    }
  };

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setWeather({
        city: location,
        ...mockWeatherData[location]
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  if (!weather) {
    return <div className="loading">Loading weather data...</div>;
  }

  return (
    <div className="home-page">
      <div className="controls">
        <select value={location} onChange={handleLocationChange}>
          {Object.keys(mockWeatherData).map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        
        <button onClick={toggleUnit}>
          Switch to {unit === 'metric' ? '°F' : '°C'}
        </button>
      </div>

      <WeatherCard data={weather} unit={unit} />
      
      <div className="weather-details">
        <p>Feels like: {weather.feels_like}°{unit === 'metric' ? 'C' : 'F'}</p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Wind: {weather.wind} {unit === 'metric' ? 'm/s' : 'mph'}</p>
      </div>
    </div>
  );
};

export default Home;