import { FormEvent, FormEventHandler, Ref, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

import ArrowRightImg from "../../assets/img/icon/ico-arrow-right.png";
import SendImg from "../../assets/img/icon/ico-send.png";

import './draft.scss';
import Bench, { CodeBenchRef } from "./bench";
import { hooks } from "../../utils/hooks";
import { StorageKey } from "../../utils/constant";
import store from "../../state/store";

enum DraftPage {
    Meta = 0,
    Bench,
}

function Draft() {
    const { t } = useTranslation()
    const tl = (suffix: string) => t(`draft.${suffix}`);
    const [page, set_page] = useState(DraftPage.Meta)
    const [title, set_title] = hooks.useLocalStorage(StorageKey.Draft.Title, '');
    const [desc, set_desc] = hooks.useLocalStorage(StorageKey.Draft.Desc, '');
    const codeBenchRef = useRef<CodeBenchRef>({ markdown: '' })
    
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(store.getState().draft)
    }
    return (
        <div className="draft wh100 flex1 pr ani" style={{
            left: `-${page * 100}%`,
        }}>
            <div className="wh100 p-3 fs0">
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>{tl('title')}</Form.Label>
                        <Form.Control placeholder={tl('ph_title')} value={title} onChange={e => set_title(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{tl('desc')}</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder={tl('ph_desc')} value={desc} onChange={e => set_desc(e.target.value)}/>
                    </Form.Group>
                    <Button variant="secondary" onClick={() => set_page(DraftPage.Bench)}>
                        <div className="flex1 white">
                            <span>{tl('next_step')}</span>
                            <img src={ArrowRightImg} className="icon ms-1"></img>
                        </div>
                    </Button>
                    <Button variant="primary" className="ms-3" type="submit">
                        <span>{tl('publish')}</span>
                        <img src={SendImg} className="icon ms-1"></img>
                    </Button>
                </Form>
            </div>
            <div className="bench-container wh100 fs0 oh p-2">
                <div className="bench-header flex1 w100">
                    <Button variant="secondary" onClick={() => {
                        set_page(DraftPage.Meta)
                    }}>
                        <div className="flex1">
                            <img src={ArrowRightImg} className="icon me-1" style={{
                                transform:`rotate(180deg)`,
                            }}></img>
                            <span>{tl('bench_done')}</span>
                        </div>
                    </Button>
                    <div className="title">{title}</div>
                </div>
                { page === DraftPage.Bench ? <Bench ref={codeBenchRef}></Bench> : null}
            </div>
            
        </div>
    )
}
export default Draft;