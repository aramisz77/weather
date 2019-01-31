import { SET_SEARCH, ADD_CITY } from './actions'
import { combineReducers } from 'redux';

function cities(state = [], action) {
    switch (action.type) {
        case ADD_CITY:
            return [action.city, ...state];
        default:
            return state;
    }
}

function search(state = '', action) {
    switch (action.type) {
        case SET_SEARCH:
            return action.search;
        default:
            return state;
    }
}


const rootReducer = combineReducers(
    {
        search,
        cities
    }
)

export default rootReducer