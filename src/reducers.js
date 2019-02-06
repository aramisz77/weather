import { ADD_CITY, ADD_WEATHER } from './actions'
import { combineReducers } from 'redux';

function cities(state = [], action) {
    switch (action.type) {
        case ADD_CITY:
            return [action.city, ...state].sort();
        default:
            return state;
    }
}

function weather(state = {}, action) {
    switch (action.type) {
        case ADD_WEATHER:
            return { ...state, ...{ [action.weather.name]: action.weather } };
        default:
            return state;
    }
}



const rootReducer = combineReducers(
    {
        cities,
        weather
    }
)

export default rootReducer