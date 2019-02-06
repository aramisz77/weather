import axios from 'axios';

export const ADD_CITY = 'ADD_CITY';
export const ADD_WEATHER = 'ADD_WEATHER';

export function addCity(city) {
    return {
        type: ADD_CITY,
        city
    }
}

export function addWeather(weather) {
    return {
        type: ADD_WEATHER,
        weather,

    }
}


export function fetchWeather(city) {
    return function (dispatch, getState) {
        const prevWeather = getState().weather[city];        
        if (!prevWeather || prevWeather.dt < (Date.now() - 2 * 60 * 60 * 1000) / 1000) {
            return axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&&APPID=ab0fca70638faafd99f126803413d206`).then(
                res => { dispatch(addWeather(res.data)) },
                err => console.error(err)
            )
        }

    }
}

export function fetchLocale() {
    return function (dispatch) {

        return axios(`https://api.ipdata.co/?api-key=test`).then(
            res => {  },
            err => console.error(err)
        )


    }
}
