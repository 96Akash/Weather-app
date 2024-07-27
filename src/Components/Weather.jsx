import React, { useState } from 'react'
import './Weather.css'
import search from '../assests/search.png'
import clearsky from '../assests/clear.png'
import cloud from '../assests/cloud.png'
import drizzle from '../assests/drizzle.png'
import rain from '../assests/rain.png'
import snow from '../assests/snow.png'
import wind from '../assests/wind.png'
import humidity from '../assests/humidity.png'
import axios from 'axios'
import haze from '../assests/haze.png'






const Weather = () => {
  const [data,setData]=useState({})
  const[location,setLocation]=useState("")
const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5147a26664ed238c257e15296741b3cb`





const searching=(event)=>{
  if(event.key==='Enter'){
  axios.get(url).then((response)=>{setData(response.data)
    console.log(response.data)
  })
  .catch((error) => {
    if (error.response && error.response.status === 404) {
      alert('City not found. Please enter a valid city.');
    } else {
      alert('An error occurred. Please try again.');
    }
  })
  
setLocation("")
}
}

const getWeatherIcon = (main) => {
  switch(main) {
    case 'Clear':
      return clearsky;
    case 'Clouds':
      return cloud;
    case 'Drizzle':
      return drizzle;
    case 'Rain':
      return rain;
    case 'Snow':
      return snow;
    case 'Haze':
      return haze;
    default:
      return 'ing';
  }
};
  


  return (
    <div className='weather'>
      <div className='search-bar'>



        <input type='text' value={location} onChange={event=>setLocation(event.target.value)}
         onKeyPress={searching} placeholder='Enter your city' />





        <img src={search} alt="Search icon" />
      </div>



      {data.weather &&(<>
      <img src={getWeatherIcon(data.weather[0].main)} alt={data.weather[0].main} className='weather-icon'/>
      <p className='temperature'>{data.main? <h1>{data.main.temp.toFixed()}°C</h1>:null}</p>
      <p className='location'>{data.name}</p>
      <div className='weather-data'>

        <div className='col'>
          <img src={humidity} alt="humidity icon" />
          <div>
            {data.main?<p>{data.main.humidity}</p>:null}
            <span>Humidity</span>
          </div>
        </div>

        <div className='col'>
          <img src={wind} alt="wind icon" />
          <div>
            {data.wind? <p>{data.wind.speed}</p>:null}
            <span>wind speed </span>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  )
}

export default Weather;
