import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import UserReducer from './reducers/UserReducer';
import ContactReducer from './reducers/ContactReducer';
import RoomReducer from './reducers/RoomReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    contact: ContactReducer,
    room: RoomReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));



export default store


//*********STOREEEEE****************
