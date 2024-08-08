import React, { useEffect, useRef, useState } from 'react';
import './FarmerWeather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/search.png';
import snow_icon from '../assets/search.png';
import wind_icon from '../assets/wind.png';
import sunrise from '../assets/sunrise.png';
import sunset from '../assets/sunset.png';
import maxtemp from '../assets/maxtemp.png';
import mintemp from '../assets/mintemp.png';
import { DateTime } from 'luxon';

const FarmerWeather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [hourlyData, setHourlyData] = useState([]); // State for hourly forecast
  const [city, setCity] = useState(''); // State for the input city name
  const [coords, setCoords] = useState({ lat: null, lon: null });

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": cloud_icon,
    "09n": cloud_icon,
    "010d": rain_icon,
    "010n": rain_icon,
    "013d": snow_icon,
    "013n": snow_icon

  };

  const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' || local time: 'hh:mm a") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=05be986765a2d2d0b1e9e4a241b919c6`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      if (data.cod !== 200) { // Check for errors returned by the API
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        country: data.sys.country,
        sunrise: formatToLocalTime(data.sys.sunrise, data.timezone, "hh:mm a"),
        sunset: formatToLocalTime(data.sys.sunset, data.timezone, "hh:mm a"),
        tempmax: data.main.temp_max,
        tempmin: data.main.temp_min,
        // weather: data[0].main
      });
      //   setCoords({ lat: data.coord.lat, lon: data.coord.lon });

      //   fetchHourlyForecast(data.coord.lat, data.coord.lon);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    search(city);
  }, []);

  const renderAlertMessage = () => {
    if (weatherData) {
      const { tempmin, tempmax } = weatherData;

      // Define temperature thresholds for alerts
      const minTempThreshold = 22.50; // Minimum temperature threshold for rainy alert
      const maxTempThreshold = 18.50; // Maximum temperature threshold for sunny alert

      // Check if the temperature is within the specified thresholds
      if (tempmin < minTempThreshold) {
        return <p className='alert-message'>⚠️ Rainy weather - Do not harvest the crops.</p>;
      }
      if (tempmax > maxTempThreshold) {
        return <p className='alert-message'>☀️ Sunny weather - It's a good time to harvest the crops!</p>;
      }
    }
    return null;
  };

  return (
    <div className='farmerweather'>
      <div className='heading'>Weather Report {city}</div>
      <div className='search-bar'>
        <input
          ref={inputRef}
          size="30"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state on input change
        />
        <br /><br />
        <img
          src={search_icon}
          alt="Search"
          onClick={() => search(inputRef.current.value)} // Call search with the current city state
          style={{ cursor: 'pointer' }} // Add cursor style to indicate clickability
        />
      </div>
      <>
        {renderAlertMessage()}
        <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location},{weatherData.country}</p>

     <div className='weather-data'>
          <div className='col'>
            <img src={sunset} alt="sunrise" />
            <div>
              <p>  {weatherData.sunset}</p>
              {/* <span>Humidity</span> */}
            </div>
          </div>
          <div className='col'>
            <img src={sunrise} alt="sunrise" />
            <div>
              <p>{weatherData.sunrise}</p>
            </div>
          </div>
        </div>

        <div className='weather-data'>
          <div className='col'>
            <img src={mintemp} alt="mintemp" />
            <div>
            {weatherData.tempmin}°C
            </div>
          </div>
          <div className='col'>
            <img src={maxtemp} alt="maxtemp" />
            <div>
            {weatherData.tempmax}°C
            </div>
          </div>
        </div>

        <div className='weather-data'>
          <div className='col'>
            <img src={humidity_icon} alt="Humidity" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className='col'>
            <img src={wind_icon} alt="Wind Speed" />
            <div>
              <p>{weatherData.windSpeed} m/s</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
      </div>

  );
};

export default FarmerWeather;
