import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import UserReducer from './reducers/UserReducer';
import ContactReducer from './reducers/ContactReducer';
import NoteReducer from './reducers/NoteReducer'
const composeEnhancers = compose;

const rootReducer = combineReducers({
    user: UserReducer,
    contact: ContactReducer,
    note: NoteReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


export default store


//*********STOREEEEE****************
