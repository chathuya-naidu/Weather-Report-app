import React, { useEffect, useRef, useState } from 'react';
import './EventWeather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/search.png';
import snow_icon from '../assets/search.png';
import wind_icon from '../assets/wind.png';

const EventWeather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);
    const [city, setCity] = useState(''); // State for the input city name

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":cloud_icon,
        "09n":cloud_icon,
        "010d":rain_icon,
        "010n":rain_icon,
        "013d":snow_icon,
        "013n":snow_icon

    };

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=05be986765a2d2d0b1e9e4a241b919c6`;
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

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
                icon: icon
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        search(city);
    }, []);

    return (
        <div className='eventweather'>
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
            {/* {weatherData && ( */}
                <>
                    <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>

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

export default EventWeather;
