import { StorageKey } from "../../utils/constant";
import { utils } from "../../utils/utils";
import { AccountAction, ADD_ACCOUNT, DEL_ACCOUNT, Identity, SET_CURRENT_ACCOUNT } from "../actions/accountAction";

interface AccountSaveData {
    [address: string]: Identity
}

interface AccountState {
    save: AccountSaveData
    current: string
}
const init_save = utils.getStorage(StorageKey.Account.Save, {});
const initialState: AccountState = {
    save: init_save,
    current: (function() {
        let result = utils.getStorage(StorageKey.Account.Current, '')
        const keys = Object.keys(init_save);
        if (result) {
            if (!(result in init_save)) {
                result = keys.length === 0 ? '' : keys[0]
                utils.setStorage(StorageKey.Account.Current, result);
            }
        } else {
            if (keys.length) {
                result = keys[0]
                utils.setStorage(StorageKey.Account.Current, result);
            }
        }
        return result
    })(),
};

export default function account(state = initialState, action: AccountAction) {
    switch(action.type) {
        case ADD_ACCOUNT: {
            const { address } = action.data

            // save to redux
            state.save[address] = action.data

            // save to localstorage
            utils.setStorage(StorageKey.Account.Save, state.save)

            if (!state.current) {
                setCurrent(state, address)
            }

            // generage a new object reference
            state.save = { ...state.save }

            return { ...state }
        }
        case SET_CURRENT_ACCOUNT: {
            setCurrent(state, action.key)
            return {...state }
        }
        case DEL_ACCOUNT: {
            const key = action.key;
            delete state.save[key];
            if (state.current === key) {
                const keys = Object.keys(state.save);
                state.current = keys.length !== 0 ? keys[0] : ''
                // sync storage current data
                utils.setStorage(StorageKey.Account.Current, state.current);
            }
            // sync storage save data
            utils.setStorage(StorageKey.Account.Save, state.save)

            // generage a new object reference
            state.save = { ...state.save }

            return { ...state }
        }
        default: {
            return state
        }
    }
}


function setCurrent(state = initialState, current: string) {
    utils.setStorage(StorageKey.Account.Current, current)
    state.current = current
}