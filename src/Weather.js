import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = '5547dd5aab46608722fe1d8b508d64a4';
    const latitude = '8.2263'; 
    const longitude = '122.0942'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl)
      .then(response => {
        console.log('Weather API Response:', response.data);
        setWeather(response.data);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }

  const { main, weather: weatherDetails, dt } = weather;
  const temperature = Math.round(main.temp);
  const timestamp = dt * 1000; 
  const date = new Date(timestamp);
  const description = weatherDetails[0].description;

 
  let WeatherIcon;
  if (description.includes('clear')) {
    WeatherIcon = './icons/clear.png';
  } else if (description.includes('rain')) {
    WeatherIcon = './icons/rainy.png';
  } else if (description.includes('cloud')) {
    WeatherIcon = './icons/cloudy.png';
  } else {
    WeatherIcon = './icons/sunny.png';
  }


  const localTime = new Date(date.getTime() + date.getTimezoneOffset() * 60000 + 8 * 3600000);

  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(localTime);

  return (
    <>
        <div className='header'>
            <img src='./logoW.svg' alt='Logo'/>
            <h2>Weather Forecast</h2>
            <h1>Iligan City, Lanao del Norte</h1>
        </div>
        <div className='content'>
            
            <p>{formattedDate}</p>
            <p className='temp'>{temperature}°C</p>
            <p className='desc'>{description} </p>
            <img className="icon" src={WeatherIcon} alt={description} />
                
        

            
        </div>    
    </>
  );
};

export default Weather;
