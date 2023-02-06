import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from'redux-saga/effects'; // different kind of put, putting data from saga to the redux (?)
import axios from 'axios';
import firstReducer from './Reducers/firstReducer.js';
import secondReducer from './Reducers/secondReducer.jsx';
import elementListReducer from './Reducers/elementListReducer.jsx';

const sagaMiddleware = createSagaMiddleware();

function* watcherSaga(){
    yield takeEvery('FETCH_ELEMENTS', fetchElements); // takes 2 parameters: (when this is fired off, send them here)
    yield takeEvery('POST_ELEMENT', postElement);
}

function* postElement(action) { // without the action here, errors happen (action not defined)
    // console.log('action', action.payload);
    // wrap in try/catch
    // yield post request
    // yield 'put' to reducer
    try{
        yield axios.post('/api/element', {newElement: action.payload});
        yield put({type: 'FETCH_ELEMENTS'})
    } catch (error) {
        console.log('error posting elements', error);
    }
}

function* fetchElements(){
    try {
        const elementsResponse = yield axios.get('/api/element');
        yield put({type: 'SET_ELEMENTS', payload: elementsResponse.data})   // put takes an object {}
    } catch (error) {
        console.log('error fetching elements', error);
    }   // try wraps this to say 'on success' do this, otherwise 'on error' console the error
}

// move reducers: firstReducer, secondReducer,
//  and elementListReducer to 
// their own file and then import here:


// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        firstReducer,
        secondReducer,
        elementListReducer,
    }),
    applyMiddleware( sagaMiddleware, logger ),  // put logger last, may influence the info fired off by logger
);

sagaMiddleware.run(watcherSaga);    // starts watching for actions


ReactDOM.render(<Provider store={storeInstance}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
