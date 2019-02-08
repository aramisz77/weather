import { getCapitalByCountry, getCapitalTimezone } from './captials'
import * as moment from 'moment-timezone';
import axios from 'axios';

export function createEmptyWeather(city, isFetching = true) {
    const timezone = getCapitalTimezone(city);
    return {
        [city]: {
            timezone,
            isFetching
        }
    }
}

function createWeatherFromApiResponse(data) {
    const timezone = getCapitalTimezone(data.name);
    return {
        [data.name]: {
            timezone,
            code: data.weather[0].id,
            description: data.weather[0].description,
            temperature: Number(data.main.temp - 273.15).toFixed(0),
            sunrise: moment(data.sys.sunrise * 1000).tz(timezone).format('HH:mm'),
            sunset: moment(data.sys.sunset * 1000).tz(timezone).format('HH:mm'),
            timestamp: data.dt,
            isFetching: false
        }
    }
}

function isObsolete(weather, cacheTimeMinutes) {
    return (!weather.timestamp || weather.timestamp < (Date.now() - cacheTimeMinutes * 60 * 1000) / 1000);
}

export function shouldFetchWeather(weather, cacheTimeMinutes = 120) {
    return (!weather || (!weather.isFetching && isObsolete(weather, cacheTimeMinutes)))
}

export async function fetchWeatherApi(city) {
    const res = await axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&&APPID=ab0fca70638faafd99f126803413d206`);       
    return createWeatherFromApiResponse(res.data);
}

export async function fetchLocationApi() {
    const res = await axios(`https://api.ipdata.co/?api-key=test`);       
    return getCapitalByCountry(res.data.country_code);
}
