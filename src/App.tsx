import "./App.css";

import React, { useEffect, useState } from "react";
import "./index.css";
import Mousefollower from "./components/mousefollower";
import Infobox from "./components/infobox";
import Weather from "./components/Weather";
import banff from "./assets/images/banff.jpg"

function App() {
  const api_key = "" // ENTER YOUR API KEY HERE FROM openweathermap.org
  const cursorRef = React.useRef(null);
  const [dates, setDates] = useState<string[]>([]);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [forecast, setForecast] = useState<number[]>([]);

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=toronto&appid=${api_key}`)
      .then(response => response.json())
      .then(data => {console.log(data); setTemperature(data.main.temp - 273.15)})
      .catch(error => console.error(error));
  }, []);

  
  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=toronto&appid=${api_key}`)
      .then(response => response.json())
      .then(data => {setDescription(data.weather[0].description)})
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=43.39&lon=79.23&exclude=current,minutely,hourly,alerts&appid=${api_key}`)
      .then(response => response.json())
      .then(data => {
        const dailyTemperatures = data.daily.map((day: any) => day.temp.day - 273.15);
        setForecast(dailyTemperatures);
      })
      .catch(error => console.error(error));
  }, []);
  
  useEffect(() => {
    console.log(forecast);
  }, [forecast]);

  useEffect(() => {
    const today = new Date();
    const nextDates = Array.from({ length: 7 }).map((_, i) => {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i + 1);

      const year = nextDate.getFullYear();
      const month = nextDate.toLocaleString('default', { month: 'long' });
      const date = nextDate.getDate();
    
      return `${month} ${date}, ${year}`;
    });
    setDates(nextDates);
  }, []);

  return (
    <>
      <div className="cursor App" ref={cursorRef}></div>
      <Mousefollower cursorRef={cursorRef}></Mousefollower>
      <div className="weatherImage weathercontainer weatherImageContainer">
    <Weather>
      <div className='weatherContent'>
        <img src={banff} className='weatherimg'/>
        <div className='weatherText'>
          <div className='additionalText'>Toronto</div>
          <div className='overlayText'>{temperature !== null && <p>Today's temperature: {temperature.toFixed(2)}°C</p>}</div>
          <div className='conditionText'>outlook - {description}</div>
        </div>
      </div>
    </Weather>
</div>

<div className="infoContainer">
  {dates.map((date, i) => (
    <Infobox key={i}>
      <div>{forecast.length > i ? <>{date}<br />${forecast[i].toFixed(2)}°C</>  : <>{date}<br />Loading...</>}</div>
    </Infobox>
  ))}
</div>
    </> 
  );
}

export default App;
