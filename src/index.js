import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchLocalWeather } from './actions';
import { loadState, saveState } from './persistent';

const store = createStore(rootReducer, loadState(), applyMiddleware(thunkMiddleware));

store.subscribe(() => { saveState(store.getState()); });

store.dispatch(fetchLocalWeather());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
