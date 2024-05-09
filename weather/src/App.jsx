import { useState, useEffect } from 'react';
import './App.css'
import PropTypes from "prop-types";

//import weather icons
import searchIcon from './assets/search-interface-symbol-4.png';
import clearIcon from './assets/sun-2.png';
import cloudIcon from './assets/cloudy-2.png';
import drizzleIcon from './assets/drizzle-2.png';
import rainIcon from './assets/raining-2.png';
import windIcon from './assets/wind-2.png';
import snowIcon from './assets/snow-2.png';
import humidityIcon from './assets/weather-2.png';


const weatherIconMap={
 "01d":clearIcon,
 "01n":clearIcon,
 "02d":cloudIcon,
 "02n":cloudIcon,
 "03d":drizzleIcon,
 "03n":drizzleIcon,
 "04d":drizzleIcon,
 "04n":drizzleIcon,
 "09d":rainIcon,
 "09n":rainIcon,
 "10d":rainIcon,
 "10n":rainIcon,
 "13d":snowIcon,
 "13n":snowIcon,
}
const WeatherDeatils=({icon, temp, city,country,lat,log,humidity,wind})=>{
   
   return(
    <>
    <div className='image'>
     <img src={icon} alt="" />
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>``
    <div className="cord">
      <div>
        <span className="lat">latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className="lat">longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={humidityIcon} alt="humidity" className='icon'/>
        <div className="data">
          <div className="humidity-percent">{humidity}</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windIcon} alt="wind" className='icon'/>
        <div className="data">
          <div className="wind-percent">{wind} km/h </div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
    </>
   )
};

WeatherDeatils.propTypes={
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  humidity:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired,
  lat:PropTypes.number.isRequired,
  log:PropTypes.number.isRequired,
}
function App() {
  let api_key="f2dfb07bed9ddebbfacf5e7d6ce23d3e";
  const [text,settext]=useState("Chennai")
  const [icon, seticon]=useState(cloudIcon)
  const [temp, settemp]=useState(0)
  const [city,setcity]=useState("Chennai")
  const [country,setcountry]=useState("IN")
  const [lat,setlat]=useState(0)
  const [log,setlog]=useState(0)
  const [humidity,sethumidity]=useState(0)
  const [wind,setwind]=useState(0)
  const [error,seterror]=useState(null)

  const[cityNotFound,setCityNotFound]=useState(false)
  const[loading,setloading]=useState(false)

  const search=async()=>{
    setloading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
    let res=await fetch(url)
    let data=await res.json();
    // console.log(data);
    if(data.cod==="404"){
      setCityNotFound(true)
    setloading(false)
    return;
    }

    sethumidity(data.main.humidity);
    setwind(data.wind.speed)
    settemp(Math.floor(data.main.temp));
    setcity(data.name)
    setcountry(data.sys.country)
    setlat(data.coord.lat)
    setlog(data.coord.lon)
    const weatherIconCode=data.weather[0].icon;
    seticon(weatherIconMap[weatherIconCode] || clearIcon)
    setCityNotFound(false)
    }catch(error){
      console.log("An error occured:", error.message)
      seterror("An error occured while fetching weather data.");
    }finally{
      setloading(false)
    }
  }

  const handlecity=(e)=>{
    settext(e.target.value)
  }
  const hadlekeydown=(e)=>{
    if(e.key==="Enter")
    search();
  };
  useEffect (function(){
   search();
  },[]);


  return (
    <>
      <div className="container">
        <div className="input-container">
           <input type="text" className='cityInput' placeholder="Enter The City" onChange={handlecity} value={text} onKeyDown={hadlekeydown}/>
        
        <div className="search-icon">
        <img src={searchIcon} alt='search' onClick={()=>{search()}}/>
        </div>
        
        </div>
        {!loading && !cityNotFound && <WeatherDeatils icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}

{loading && <div className="loading-message">Loading...</div>}
{error && <div className="error-message">{error}</div>}
{cityNotFound && <div className="city-not-found">City not found</div>}
        <p className="copyright">
          Designed By <span>Dhanush</span>
        </p>
     </div>
    </>
  )
}

export default App
