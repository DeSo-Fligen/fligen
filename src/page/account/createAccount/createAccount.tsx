import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { hooks } from "../../../utils/hooks";
import { useEffect, useState } from "react";
import WarnImg from "../../../assets/img/icon/ico-warn.png";

import "./createAccount.scss";
import { useDispatch } from "react-redux";
import { addAccount } from "../../../state/actions/accountAction";

export interface CreateAccountProps {
    show: boolean
    onClose: () => void
}

const initIdentity = {
    address: '',
    publicKey: '',
    privateKey: '',
}

function CreateAccount(props: CreateAccountProps) {
    const { t } = hooks.useTranslationPrefix('account');
    const [identity, setIdentity] = useState(initIdentity)
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        setShowModal(props.show)
    }, [props.show])

    const handleClose = () => {
        setShowModal(false)
        props.onClose();
    }

    const handleConfirm = () => {
        if (identity.address) {
            dispatch(addAccount(identity))
            setTimeout(() => setIdentity(initIdentity), 500)
            handleClose()
        }
    }

    const onGenerate = () => {
        const identity = window.EthCrypto.createIdentity()
        setIdentity(identity)
    }

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('add_account')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex1">
                    {/* TODO ADD User Generate Random Seed Buffer */}
                    <Button variant="primary" onClick={onGenerate}>{t('generate')}</Button>
                </div>

                <div className="mt-2">
                    <ListGroup className="mt-2">
                        <ListGroup.Item className="wrap" variant="info">{t('address')}: {identity.address}</ListGroup.Item>
                        <ListGroup.Item className="wrap" variant="primary">{t('publicKey')}: {identity.publicKey}</ListGroup.Item>
                        <ListGroup.Item className="wrap" variant="warning">{t('privateKey')}: {identity.privateKey}</ListGroup.Item>
                    </ListGroup>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex1 w100">
                    <img src={WarnImg} className="icon"></img>
                    <div className="text-warning mx-2 fg1">{t('warn_text')}</div>
                    <Button variant="primary" className="fs0" disabled={!identity.address} onClick={handleConfirm}>
                        {t('dialog_save')}
                    </Button>
                    {/* <Dropdown as={ButtonGroup}>
                        <Button variant="primary" disabled={!identity.address} onClick={handleConfirm}>{t('dialog_save')}</Button>

                        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

                        <Dropdown.Menu>
                            <Dropdown.Item>{t('dialog_save_completely')}</Dropdown.Item>
                            <Dropdown.Item>{t('dialog_save_private')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateAccount;