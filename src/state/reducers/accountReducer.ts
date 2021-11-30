import { AccountAction, ADD_ACCOUNT } from "../actions/accountAction";

interface AccountInitialState {
    accounts: Array<string>,
}


const initial_state: AccountInitialState = {
    accounts: []
}

export function accountReducer(state = initial_state, action: AccountAction) {
    switch(action.type) {
        case ADD_ACCOUNT: {
            state.accounts = [...state.accounts, ...action.data]
            return { ...state };
        }
        default: {
            return state
        }
    }
    
}