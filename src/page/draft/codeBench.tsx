import { useState } from "react";

// markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";

// editor
import { Controlled as CodeMirror } from "react-codemirror2";

import { useTranslation } from "react-i18next";
import "./codeBlock.scss";

function CodeBench() {
    const [md_input, set_md_input] = useState('')
    const { t } = useTranslation()
    const tl = (suffix: string) => t(`draft.${suffix}`);
    return (
        <div className="bench_main wh100">
            <div className="bench_block">
                <div className="label">{tl('bench_title')}</div>
                <CodeMirror
                    value={md_input}
                    className="self_mirror"
                    options={{
                        theme: 'material',
                    }}
                    onBeforeChange={(editor, data, value) => {
                        set_md_input(value)
                    }}
                    onChange={(editor, data, value) => {
                    }}/>
            </div>
            <div className="bench_block">
                <div className="label">{tl('preview')}</div>
                <div className="md-view">
                    <ReactMarkdown
                        children={md_input}
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
}
export default CodeBench;