import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

function SecondReducer() { (state = 100, action) => {
    if (action.type === 'BUTTON_TWO') {
        console.log('secondReducer state', state);
        console.log('Button 2 was clicked!');
        return state - 1;
    }
    return state;
}

const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        // FirstReducer,
        SecondReducer
        // ElementListReducer,
    }),
    applyMiddleware( sagaMiddleware, logger )  // put logger last, may influence the info fired off by logger
);

sagaMiddleware.run(watcherSaga);

}

export default SecondReducer;