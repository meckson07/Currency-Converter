import React from 'react'
import './WeatherApp.css'
import Search from './images/search.webp'
import Sun from './images/sun.webp'

const WeatherApp=()=>{
    return(
        <div className='weatherapp'>
            <div className='input'>
                <input type="text" placeholder='Search City...'></input>
                <button ><img src={Search}></img></button>
            </div>
            <div className='weatherstatus'>
                <img src={Sun} className='imagestats'></img>
                <h2 className='tempstats'>32 deg</h2>
                <h1 className='citystats'>Coimbatore</h1>
                <h5 className='countrystats'>IN</h5>
                <div className='stats'>
                    <div>
                        <h5>latitude</h5>
                        <h5>9.9755</h5>
                    </div>
                    <div>
                        <h5>longitude</h5>
                        <h5>9.9755</h5>
                    </div>
                </div>
            </div>
            <div className='humidityspeed'>
                <div>
                    <img></img>
                    <h3>55%</h3>
                    <h5>Humidity</h5>
                </div>
                <div>
                    <img></img>
                    <h3>55%</h3>
                    <h5>Humidity</h5>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp