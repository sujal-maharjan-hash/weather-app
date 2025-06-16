import React from 'react';

const About = () => {
  return (
    <div className="about">
      <h1>About Our Weather App</h1>
      <p>
        Welcome to our Weather App! This application provides up-to-date weather information 
        for locations around the world, including Nepal. Our goal is to deliver accurate and 
        timely weather data to help you plan your day.
      </p>
      <p>
        The app uses reliable weather data sources and stores your preferences locally 
        for a personalized experience.
      </p>
      <h2>Features:</h2>
      <ul>
        <li>Current weather conditions</li>
        <li>Multiple location support including Nepali cities</li>
        <li>User preference storage</li>
        <li>Responsive design</li>
      </ul>
    </div>
  );
};

export default About;