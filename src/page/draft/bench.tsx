import { FC, forwardRef, FunctionComponent, useEffect, useImperativeHandle, useState } from "react";
import Nav from "react-bootstrap/Nav";

// markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";

// editor
import { Controlled as CodeMirror } from "react-codemirror2";

import { useTranslation } from "react-i18next";
import "./bench.scss";
import { hooks } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { draftAction } from "../../state/actions/draftAction";
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
        dispath(draftAction.saveMarkdown(markdown));
    }, 3000, [markdown])

    return (
        <div className="bench_main w100">
            <Nav justify variant="tabs" className="tabs fs0" defaultActiveKey={currentTab} onSelect={(key, e) => {
                key && setCurrentTab(key as TabKey)
            }}>
                <Nav.Item className="usn cp">
                    <Nav.Link eventKey={TabKey.editor}>{tl('bench_title')}</Nav.Link>
                </Nav.Item>
                <Nav.Item className="usn cp">
                    <Nav.Link eventKey={TabKey.md}>{tl('preview')}</Nav.Link>
                </Nav.Item>
            </Nav>
            <div className={`bench_block ${currentTab == TabKey.editor ? 'active' :''}`}>
                <div className="label">{tl('bench_title')}</div>
                <CodeMirror
                    value={markdown}
                    className="self_mirror"
                    options={{
                        theme: 'material',
                    }}
                    onBeforeChange={(editor, data, value) => {
                        setMarkdown(value)
                    }}
                    onChange={(editor, data, value) => {
                    }}/>
            </div>
            <div className={`bench_block ${currentTab == TabKey.md ? 'active' :''}`}>
                <div className="label">{tl('preview')}</div>
                <div className="md-view">
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