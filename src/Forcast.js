import axios from 'axios';
import React, { useState } from 'react'
import ReactAnimatedWeather from "react-animated-weather";
import apiKeys from './apiKeys';

const Forcast = (props) => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  const search = async (city) =>{
    axios
      .get(
        `${apiKeys.base}weather?q=${city != "[object Object]" ? city:query}&units=metric&APPID=${apiKeys.key}`
      )
      .then((res)=>{
        console.log(res.data);
        setWeather(res.data);
        setQuery("");
      })
      .catch(function(err) {
        console.log(err);
        setWeather("");
        setQuery("");
        setError({message:"Not Found", query:query});
      });
  };

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input 
          type="text"
           className='search-bar'
           placeholder='Search any location...'
           onChange={(e) => setQuery(e.target.value)} 
           value={query}
           />
           <div className="img-box">
            {" "}
            <img src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={search}
              alt="" />
           </div>
        </div>
      <ul>
        {typeof weather.main != "undefined" ? (

          <div>
            {""}
            <li className="cityHead">
              <p>
                {weather.name}, {weather.sys.country}
              </p>
              <img 
              className="temp"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
               alt="" />
            </li>
            
            <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>

              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>

              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>

              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>

          </div>
        ):(
          <li>
            {error.query} {error.message}
          </li>
        )}
      </ul>
      </div>
    </div>
  );
}

export default Forcast