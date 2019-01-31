import { ADD_CITY } from './actions'
import { combineReducers } from 'redux';

function cities(state = [], action) {
    switch (action.type) {
        case ADD_CITY:
            return [action.city, ...state];
        default:
            return state;
    }
}

const rootReducer = combineReducers(
    {      
        cities
    }
)

export default rootReducer