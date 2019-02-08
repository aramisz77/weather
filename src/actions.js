import { createEmptyWeather, shouldFetchWeather, fetchWeatherApi, fetchLocationApi } from './api'

export const UPDATE_WEATHER = 'UPDATE_WEATHER';

export function updateWeather(weather) {
    return {
        type: UPDATE_WEATHER,
        weather,
    }
}

export function fetchWeather(city) {
    return function (dispatch, getState) {
        const weather = getState().weather[city];
        if (shouldFetchWeather(weather)) {
            dispatch(updateWeather(createEmptyWeather(city)))
            return fetchWeatherApi(city).then(
                weather => dispatch(updateWeather(weather)),
                err => {
                    console.error(err)
                    dispatch(updateWeather(createEmptyWeather(city, false)))
                }
            )
        }
    }
}

export function fetchLocalWeather() {
    return function (dispatch) {
        return fetchLocationApi().then(
            city => dispatch(fetchWeather(city)),
            err => console.error(err)
        )
    }
}
