export const SET_SEARCH = 'SET_SEARCH';
export const ADD_CITY = 'ADD_CITY';

export function addCity(city) {
    return {
        type: ADD_CITY,
        city
    }
}

export function setSearch(search) {
    return {
        type: SET_SEARCH,
        search
    }
}

export function fetchValues() {
    return function (dispatch) {
        
        return fetch('https://us-central1-calory-counter-d6e5f.cloudfunctions.net/getAll').then(
            res => { dispatch(addCity(res.data)) },
            err => console.error(err)
        )
    }
}