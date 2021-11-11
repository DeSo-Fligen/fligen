import { StorageKey } from "../../utils/constant";
import { utils } from "../../utils/utils";
import * as Action from "../actions/draftAction";

const init_state = {
    title: utils.getStorage(StorageKey.Draft.Title, ''),
    desc: utils.getStorage(StorageKey.Draft.Title, ''),
    markdown: utils.getStorage(StorageKey.Draft.Markdown, ''),
}

function draft(state = init_state, action: Action.DraftAction) {
    switch(action.type) {
        case Action.Constant.SAVE_MD: {
            return {...state, markdown: action.markdown }
        }
        default: {
            return state
        }
    }
}
export default draft