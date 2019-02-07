import axios from 'axios';
import { getcapital, getcapitalTZ } from './captials'
import * as moment from 'moment-timezone';

export const ADD_WEATHER = 'ADD_WEATHER';

export function addWeather(weather) {
    return {
        type: ADD_WEATHER,
        weather,
    }
}


function getClearWeather(city, isFetching=true) {
    const timezone = getcapitalTZ(city);
    return {
        [city]: {
            timezone,
            isFetching
        }
    }
}

function getWeather(data) {
    const timezone = getcapitalTZ(data.name);
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

export function fetchWeather(city) {
    return function (dispatch, getState) {

        if (shouldFetchWeather(city, getState())) {
            dispatch(addWeather(getClearWeather(city)))
            return axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&&APPID=ab0fca70638faafd99f126803413d206`).then(
                res => {
                    dispatch(addWeather(getWeather(res.data))) 
                },
                err => {
                    console.error(err)
                    dispatch(addWeather(getClearWeather(city,false)))
                }
            )
        }

    }
}

function isObsolete(weather, cacheTimeMinutes=120) {
    return (!weather.timestamp || weather.timestamp < (Date.now() - cacheTimeMinutes * 60 * 1000) / 1000);
}

function shouldFetchWeather(city, state) {
    const weather = state.weather[city];
    return (!weather || (!weather.isFetching && isObsolete(weather)))
}


export function fetchMyCapital() {
    return function (dispatch) {

        return axios(`https://api.ipdata.co/?api-key=test`).then(
            res => {
                const capital = getcapital(res.data.country_code);
                dispatch(fetchWeather(capital));
            },
            err => console.error(err)
        )


    }
}
