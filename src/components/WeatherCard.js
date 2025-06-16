import React from 'react';
import PropTypes from 'prop-types';

const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="weather-card">
      <h2>{data.city}</h2>
      <div className="weather-main">
        <img 
          src={getWeatherIcon(data.icon)} 
          alt={data.description}
        />
        <div>
          <p className="temperature">
            {Math.round(data.temp)}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <p className="description">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

WeatherCard.propTypes = {
  data: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired
};

export default WeatherCard;