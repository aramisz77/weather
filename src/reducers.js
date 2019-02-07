import {  ADD_WEATHER } from './actions'
import { combineReducers } from 'redux';



function weather(state = {}, action) {
    switch (action.type) {

        case ADD_WEATHER:
            return { ...state, ...action.weather };
        default:
            return state;
    }
}



const rootReducer = combineReducers(
    {       
        weather
    }
)

export default rootReducer