import {combineReducers, createStore} from "redux"
import draftReducer from "./reducers/draftReducer";
import { accountReducer } from "./reducers/accountReducer"

export const RootReducer = combineReducers({
    draft: draftReducer,
    account: accountReducer,
})

const store = createStore(
    RootReducer,
    // @ts-ignore
    window?.__REDUX_DEVTOOLS_EXTENSION__?.() ?? (f => f),
)

export default store;