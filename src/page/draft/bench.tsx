import { forwardRef, useImperativeHandle, useState } from "react";

// markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";

// editor
import { Controlled as CodeMirror } from "react-codemirror2";

// import "./bench.scss";
import { hooks } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { draftActions } from "../../state/actions/draftAction";
import { StorageKey } from "../../utils/constant";
import { utils } from "../../utils/utils";

enum TabKey {
    'editor' = 'editor',
    'md' = 'md',
}

export interface CodeBenchRef {
    markdown: string
}
export interface CodeBenchProps {
    
}
const Bench = forwardRef<CodeBenchRef, CodeBenchProps>((props, ref) => {
    const save_markdown = utils.getStorage(StorageKey.Draft.Markdown, '')
    const [markdown, setMarkdown] = useState(save_markdown)
    const { t: tl } = hooks.useTranslationPrefix('draft')
    const [currentTab, setCurrentTab] = useState(TabKey.editor);

    // Communicate with parent component
    useImperativeHandle(ref, () => ({
        markdown
    }), [markdown])

    const dispath = useDispatch()

    // save markdown every XXX ms during lifetime
    hooks.useInterval(() => {
        // console.log('备份', StorageKey.Draft.Markdown, markdown)
        // save in localStorage
        utils.setStorage(StorageKey.Draft.Markdown, markdown);
        // save in redux
        dispath(draftActions.saveMarkdown(markdown));
    }, 3000, [markdown])

    return (
        <div className="relative flex flex-col md:flex-row h-[calc(100%-50px)] w-full">
            {/* <div className="md:hidden">
                <Nav justify variant="tabs" className="my-2 mb-1 w-[400px] h-[44px] flex-shrink-0" defaultActiveKey={currentTab} onSelect={(key, e) => {
                    key && setCurrentTab(key as TabKey)
                }}>
                    <Nav.Item className="select-none cursor-pointer">
                        <Nav.Link eventKey={TabKey.editor}>{tl('bench_title')}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="select-none cursor-pointer">
                        <Nav.Link eventKey={TabKey.md}>{tl('preview')}</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div> */}
            {/* markdown编辑器 */}
            {/* // TODO 修复高度不一致问题 */}
            {/* // TODO 响应式设计：屏幕过短切换页签 */}
            <div className={`h-[calc(100%-50px)] flex-1 flex-col md:mr-4 ${currentTab === TabKey.editor ? '' :''}`}>
                <div className="text-sm h-5 my-2">{tl('bench_title')}</div>
                <CodeMirror
                    value={markdown}
                    className="h-full"
                    options={{
                        theme: 'material',
                    }}
                    onBeforeChange={(editor, data, value) => {
                        setMarkdown(value)
                    }}
                    onChange={(editor, data, value) => {
                    }}/>
            </div>
            {/* 预览 */}
            <div className={`h-[calc(100%-50px)] flex-1 flex-col md:w-[calc(50%-20px)] md:h-[calc(100%-10px)] mr-5 ${currentTab === TabKey.md ? '' :''}`}>
                <div className="text-sm h-5 my-2">{tl('preview')}</div>
                <div className="bg-slate-200 p-2 box-border break-words whitespace-pre-line h-full overflow-scroll scrollbar-hidden">
                    <ReactMarkdown
                        children={markdown}
                        components={{
                            code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    // TODO fix strange error in typescript
                                    // @ts-ignore
                                    <SyntaxHighlighter
                                      children={String(children).replace(/\n$/, '')}
                                      language={match[1]}
                                      PreTag="div"
                                      {...props}
                                    />
                                  ) : (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  )
                            }
                        }}
                        remarkPlugins={[remarkGfm]}
                    />
                </div>
            </div>
        </div>
    )
})
export default Bench;