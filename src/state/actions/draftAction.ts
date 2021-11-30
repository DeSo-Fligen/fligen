export const Constant = {
    SAVE_MD: 'save_md',
}

export interface SaveMdAction {
    type: typeof Constant.SAVE_MD
    markdown: string
}

export type DraftAction = SaveMdAction;

export const draftActions = {
    saveMarkdown(data: string): SaveMdAction {
        return {
            type: Constant.SAVE_MD,
            markdown: data,
        }
    }
}