import { ADD_CITY } from './actions'
import { combineReducers } from 'redux';

function cities(state = ['capital','2'], action) {
    switch (action.type) {
        case ADD_CITY:
            return [action.value, ...state];
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