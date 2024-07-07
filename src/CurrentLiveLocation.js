import React, { useState, useEffect } from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forcast from "./Forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

const dateBuilder = (d) =>{
    let months=[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let days=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
    color:"white",
    size:55,
    animate:true,
};

function CurrentLiveLocation() {
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [main, setMain] = useState();
  const [temperatureC, setTemperatureC] = useState();
  const [icon, setIcon] = useState("CLEAR_DAY");
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [humidity, setHumidity] = useState();

  
  useEffect(()=>{
    const getPosition = (options)=>{
        return new Promise((resolve, reject) =>{
            navigator.geolocation.getCurrentPosition(resolve,reject,options);
        })
    };
   const getWeather = async(lat, lon)=>{
    try{
      const apiCall = await fetch(`${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`);

      const data = await apiCall.json();
      console.log(data);
      setLat(lat);
      setLon(lon);
      setCity(data.name);
      setTemperatureC(Math.round(data.main.temp));
      setHumidity(data.main.humidity);
      setMain(data.weather[0].main);
      setCountry(data.sys.country);

      switch(data.weather[0].main){
        case "Haze" :
          setIcon("CLEAR_DAY");
          break;
          case "Clouds":
            setIcon("CLOUDY");
            break;
          case "Rain":
            setIcon("RAIN");
            break;
          case "Snow":
            setIcon("SNOW");
            break;
          case "Dust":
            setIcon("WIND");
            break;
          case "Drizzle":
            setIcon("SLEET");
            break;
          case "Fog":
            setIcon("FOG");
            break;
          case "Smoke":
            setIcon("FOG");
            break;
          case "Tornado":
            setIcon("WIND");
            break;
          default:
            setIcon("CLEAR_DAY");
      }
    }catch(error){
      console.log(error);
    }
  };

  if(navigator.geolocation){
    getPosition()
    .then((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
    })
    .catch((error)=>{
      getWeather(28.67, 77.22);
      alert(
        "You have disabled location service. Allow 'THIS APP' to access your location. Your current location will be used for calculating real-time weather."
      )
    });
  }else{
    alert("Geolocation not available");
  }

  const timerID = setInterval(()=>{
    getWeather(lat, lon);
  }, 600000);

  return ()=> clearInterval(timerID);

  },[lat, lon]);
  
 if(temperatureC){
   return (
    <>

      <div className="city">
      <h1>Current weather</h1>
        <div className="title">
          <h2>{city}</h2>
          <h3>{country}</h3>
        </div>
        <div className="mb-icon">
          <ReactAnimatedWeather
          icon={icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
           />
          <p>{main}</p>
        </div>

        <div className="date-time">
          <div className="dmy">
            <div className="txt"></div>
            <div className="current-time">
              <Clock format="HH:mm:ss" interval={1000} ticking={true} />
            </div>
            <div className="current-date">{dateBuilder(new Date())}</div>
          </div>
          <div className="temperature">
            <p>
              {temperatureC}°<span>C</span>
            </p>
          </div>
        </div>
      </div>

      <Forcast icon={icon} weather={main} />
    </>
  );
}else{
  return(
    <>
      <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} alt="Weather loader" />
        <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
          Detecting your location
        </h3>
        <h3 style={{ color: "white", marginTop: "10px" }}>
          Your current location will be displayed on the App <br></br> & used
          for calculating real-time weather.
        </h3>
    </>
  )
}
}

export default CurrentLiveLocation;
