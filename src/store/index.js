import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import UserReducer from './reducers/UserReducer';
import ContactReducer from './reducers/ContactReducer';

const composeEnhancers = compose;

const rootReducer = combineReducers({
    user: UserReducer,
    contact: ContactReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


export default store


//*********STOREEEEE****************
