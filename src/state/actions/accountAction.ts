export const ADD_ACCOUNT = 'add_account';
export const SET_CURRENT_ACCOUNT = 'set_current_account'
export const DEL_ACCOUNT = 'del_account'

export interface Identity {
    address: string
    publicKey: string
    privateKey: string
}

export interface AddAccountAction {
    type: typeof ADD_ACCOUNT,
    data: Identity
}

export interface SetCurrentAccountAction {
    type: typeof SET_CURRENT_ACCOUNT,
    key: string
}

export interface DelAccountAction {
    type: typeof DEL_ACCOUNT,
    key: string
}

export type AccountAction = AddAccountAction | SetCurrentAccountAction | DelAccountAction;

export function addAccount(Identity: Identity): AddAccountAction {
    return {
        type: ADD_ACCOUNT,
        data: Identity,
    }
}

export function setCurrent(key: string): SetCurrentAccountAction {
    return {
        type: SET_CURRENT_ACCOUNT,
        key,
    }
}

export function DelAccount(key: string): DelAccountAction {
    return {
        type: DEL_ACCOUNT,
        key,
    }
}