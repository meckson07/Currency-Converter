import React from 'react';
import './WeatherApp.css';
import Search from './images/search.webp';
import sun from './images/sun.PNG';
import cloudy from './images/clear.PNG';
import rain from './images/rain2.PNG';
import snow from './images/snow.PNG';
import slightsunny from './images/slightlysun.PNG';
import Humidity from './images/weather.png';
import WindSpeed from './images/windy.png';

const WeatherApp = () => {
    const [text, setText] = React.useState("chennai");
    const [cityData, setCityData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [cityNotFound, setCityNotFound] = React.useState(false);
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const [humidity, setHumidity] = React.useState(0);
    const [windSpeed, setWindSpeed] = React.useState(0);
    const [city, setCity] = React.useState("");
    const [temp, setTemp] = React.useState(0);
    const [country, setCountry] = React.useState("");
    const [weatherType, setWeatherType] = React.useState("01d");

    const weatherArray = {
        "01d": { img: sun, color: "red" },
        "01n": { img: sun, color: "red" },
        "02d": { img: slightsunny, color: "gray" },
        "02n": { img: slightsunny, color: "gray" },
        "03d": { img: cloudy, color: "lightgreen" },
        "03n": { img: cloudy, color: "lightgreen" },
        "04d": { img: cloudy, color: "lightgreen" },
        "04n": { img: cloudy, color: "lightgreen" },
        "09d": { img: rain, color: "blue" },
        "09n": { img: rain, color: "blue" },
        "10d": { img: rain, color: "blue" },
        "10n": { img: rain, color: "blue" },
        "11d": { img: rain, color: "blue" },
        "11n": { img: rain, color: "blue" },
        "13d": { img: snow, color: "lightblue" },
        "13n": { img: snow, color: "lightblue" },
        "50d": { img: cloudy, color: "gray" },
        "50n": { img: cloudy, color: "gray" }
    };

    const HandleOnChange = (e) => {
        setText(e.target.value);
    };

    const searchCity = async () => {
        let apiKey = "";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
        try {
            setLoading(true);
            setCityNotFound(false)
            const response = await fetch(url);
            const data = await response.json();
            setLoading(false);
            if (response.ok) {
                setCityData(data);
                setLatitude(data.coord.lat);
                setLongitude(data.coord.lon);
                setHumidity(data.main.humidity);
                setWindSpeed(data.wind.speed);
                setCity(data.name);
                setCountry(data.sys.country);
                setTemp(data.main.temp);
                setWeatherType(data.weather[0].icon);
                console.log(data)
                
            } else {
                setCityNotFound("City Not Found");
                setCityData({});
            }
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        searchCity();
    }, []);

    const HandleSearch = async (e) => {
        if (e.key === "Enter") {
            await searchCity();
        }
    };

    const currentWeather = weatherArray[weatherType] || { img: '', color: 'black' };
    let color = { color: currentWeather.color };
    let image = currentWeather.img;

    return (
        <div className='weatherapp'>
            <div className='input'>
                <input
                    type="text"
                    placeholder='Search City...'
                    onChange={HandleOnChange}
                    value={text}
                    onKeyDown={HandleSearch}
                />
                <button onClick={searchCity}><img src={Search} alt="search icon"/></button>
            </div>
            {loading && <div ><h2 className='errorloadingmessages'>Loading...</h2></div>}
            {error && <div ><h2 className='errorloadingmessages'>{error}</h2></div>}
            {cityNotFound && <div ><h2 className='errorloadingmessages'>{cityNotFound}</h2></div>}
            {!loading && !error&& !cityNotFound &&<div className='weatherstatus'>
                <img src={image} className='imagestats' alt="weather icon"/>
                <h2 className='tempstats'>{temp} ° C</h2>
                <h1 className='citystats' style={color}>{city}</h1>
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
            </div>}
            {!loading && !error&& !cityNotFound && <div className='humidityspeed'>
                <div>
                    <img src={Humidity} alt="humidity icon"/>
                    <h3>{humidity}%</h3>
                    <h5>Humidity</h5>
                </div>
                <div>
                    <img src={WindSpeed} alt="wind speed icon"/>
                    <h3>{windSpeed} m/s</h3>
                    <h5>Wind Speed</h5>
                </div>
            </div>}
        </div>
    );
};

export default WeatherApp;
