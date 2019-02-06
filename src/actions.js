import axios from 'axios';
import { getcapital, getcapitalTZ } from './captials'
import * as moment from 'moment-timezone';

export const ADD_CITY = 'ADD_CITY';
export const ADD_WEATHER = 'ADD_WEATHER';

export function addCity(city) {
    return {
        type: ADD_WEATHER,
        weather: {
            [city]: {}
        }
    }
}

export function addWeather(weather) {
    return {
        type: ADD_WEATHER,
        weather,

    }
}


function getWeather(data) {
    const capitalTZ = getcapitalTZ(data.name);
    return {
        [data.name]: {
            condition: data.weather[0].id,
            description: data.weather[0].description,
            temperature: Number(data.main.temp - 273.15).toFixed(0),
            sunrise: moment(data.sys.sunrise * 1000).tz(capitalTZ).format('HH:mm'),
            sunset: moment(data.sys.sunset * 1000).tz(capitalTZ).format('HH:mm')
        }
    }
}

export function fetchWeather(city) {
    return function (dispatch, getState) {
        const prevWeather = getState().weather[city];

        if (!prevWeather || prevWeather.dt < (Date.now() - 2 * 60 * 60 * 1000) / 1000) {
            return axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&&APPID=ab0fca70638faafd99f126803413d206`).then(
                res => { dispatch(addWeather(getWeather(res.data))) },
                err => console.error(err)
            )
        }

    }
}

function shouldAddCity(state, city) {
    
    return city ? !state.cities.includes(city) : false
}

export function fetchMyCapital() {
    return function (dispatch, getState) {

        return axios(`https://api.ipdata.co/?api-key=test`).then(
            res => {
                const capital = getcapital(res.data.country_code);
                if (shouldAddCity(getState(), capital)) {
                    dispatch(addCity(capital));
                    dispatch(fetchWeather(capital));
                }
            },
            err => console.error(err)
        )


    }
}
