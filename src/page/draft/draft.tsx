import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import ArrowRight from "../../assets/img/icon/ico-arrow-right.png";



import './draft.scss';
import CodeBench from "./codeBench";

enum DraftPage {
    Meta = 0,
    CodeBench,
}

function Draft() {
    const { t } = useTranslation()
    const tl = (suffix: string) => t(`draft.${suffix}`);
    const [page, set_page] = useState(DraftPage.Meta)
    useEffect(() => {
        
    }, [page])
    return (
        <div className="draft wh100 flex1 pr ani" style={{
            left: `-${page * 100}%`,
        }}>
            <div className="wh100 pad-1 fs0">
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>{tl('title')}</Form.Label>
                        <Form.Control type="email" placeholder={tl('ph_title')} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>{tl('desc')}</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder={tl('ph_desc')} />
                    </Form.Group>
                </Form>
                <div>
                    <Button variant="primary" onClick={() => set_page(DraftPage.CodeBench)}>
                        <div className="flex1">
                            <span>{tl('next_step')}</span>
                            <img src={ArrowRight} className="arrow-right"></img>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="bench-container wh100 fs0 oh pad-2">
                <div className="flex1 w100">
                    <Button variant="secondary" className="flex1" onClick={() => set_page(DraftPage.Meta)}>
                        <img src={ArrowRight} className="arrow-right" style={{transform:`rotate(180deg)`}}></img>
                        <span>{tl('bench_done')}</span>
                    </Button>
                    <div></div>
                </div>
                <CodeBench></CodeBench>
            </div>
            
        </div>
    )
}
export default Draft;