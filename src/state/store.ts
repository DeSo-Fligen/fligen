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
<<<<<<< HEAD
    window?.devToolsExtension?.() ?? (f => f),
=======
    window?.__REDUX_DEVTOOLS_EXTENSION__?.() ?? (f => f),
>>>>>>> dev
)

export default store;