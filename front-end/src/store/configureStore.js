import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducer from '../reducers/userReducer'
import usersDataReducer from '../reducers/usersDataReducer'
import thunk from 'redux-thunk'


const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        usersData: usersDataReducer

    }), applyMiddleware(thunk))

    return store
}

export default configureStore