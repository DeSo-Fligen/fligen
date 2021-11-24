import {combineReducers, createStore} from "redux"
import draftReducer from "./reducers/draftReducer";
import accountReducer from "./reducers/accountReducer"

export const RootReducer = combineReducers({
    draft: draftReducer,
    account: accountReducer,
})

const store = createStore(
    RootReducer,
    // @ts-ignore
    window?.devToolsExtension?.() ?? (f => f),
)

export default store;