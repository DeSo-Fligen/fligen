export const ADD_ACCOUNT = "ADD_ACCOUNT";

export interface AddAccount {
    type: typeof ADD_ACCOUNT,
    data: Array<string>
}

export type AccountAction = AddAccount;

export const accountActions = {
    addAccount(data: Array<string>): AccountAction {
        return {
            type: ADD_ACCOUNT,
            data: data,
        }
    }
}