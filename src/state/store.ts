import {combineReducers, createStore} from "redux"
import draftReducer from "./reducers/draft";

const RootReducer = combineReducers({
    draft: draftReducer,
})

const store = createStore(
    RootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : null
)

export default store;