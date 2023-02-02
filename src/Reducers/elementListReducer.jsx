import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

function ElementListReducer() { (state = [], action) => {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
    }

    const storeInstance = createStore(
        // This function is our first reducer
        // reducer is a function that runs every time an action is dispatched
        combineReducers({
            // FirstReducer,
            // SecondReducer,
            ElementListReducer
        }),
        applyMiddleware( sagaMiddleware, logger )  // put logger last, may influence the info fired off by logger
    );

    sagaMiddleware.run(watcherSaga);

}

export default ElementListReducer;