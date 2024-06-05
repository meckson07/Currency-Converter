import React from 'react'
import './WeatherApp.css'
import Search from './images/search.webp'
import Sun from './images/sun.webp'
import Humidity from './images/weather.png'
import WindSpeed from './images/windy.png'

const WeatherApp=()=>{
    const [text,setText]=React.useState("chennai")
    const [cityData,setCityData]=React.useState([])
    const [loading,setLoading]=React.useState(false)
    const [error,setError]=React.useState(false)
    const [cityNotFound,setCityNotFound]=React.useState(false)
    const [latitude,setLatitude]=React.useState(0)
    const [longitude,setLongitude]=React.useState(0)
    const [humidity,setHumidity]=React.useState(0)
    const [windSpeed,setWindSpeed]=React.useState(0)
    const [city,setCity]=React.useState("")
    const [temp,setTemp]=React.useState(0)
    const [country,setCountry]=React.useState(0)

    const HandleOnChange=(e)=>{
        setText(e.target.value)
    }

    const HandleSearch=async(e)=>{
        if(e.key=="Enter"){
        let apiKey=""
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`
        try{
            setLoading(true)
            await fetch(url).then(res=> res.json()).then(data=>setCityData(data))
            console.log(cityData)
        }catch(error){
            setError(error)
        }
        setLoading(false)
        setLatitude(cityData.coord.lat)
        setLongitude(cityData.coord.lon)
        setHumidity(cityData.main.humidity)
        setWindSpeed(cityData.wind.speed)
        setCity(cityData.name)
        setCountry(cityData.sys.country)
        setTemp(cityData.main.temp)
    }
        }
       
    return(
        <div className='weatherapp'>
            <div className='input'>
                <input type="text" placeholder='Search City...' onChange={HandleOnChange} value={text}></input>
                <button onKeyDown={HandleSearch}><img src={Search}></img></button>
            </div>
            <div className='weatherstatus'>
                <img src={Sun} className='imagestats'></img>
                <h2 className='tempstats'>{temp} deg</h2>
                <h1 className='citystats'>{city}</h1>
                <h5 className='countrystats'>{country}</h5>
                <div className='stats'>
                    <div>
                        <h5>latitude</h5>
                        <h5>{latitude}</h5>
                    </div>
                    <div>
                        <h5>longitude</h5>
                        <h5>{longitude}</h5>
                    </div>
                </div>
            </div>
            <div className='humidityspeed'>
                <div>
                    <img src={Humidity}></img>
                    <h3>{humidity}%</h3>
                    <h5>Humidity</h5>
                </div>
                <div>
                    <img src={WindSpeed}></img>
                    <h3>{windSpeed}%</h3>
                    <h5>Wind Speed</h5>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp