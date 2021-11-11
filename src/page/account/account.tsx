import { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { hooks } from "../../utils/hooks";
import { utils } from "../../utils/utils";
import CreateAccount from "./createAccount/createAccount";
import EmptyImg from "../../assets/img/icon/ico-empty.png";
import "./account.scss";
import { useDispatch } from "react-redux";
import { DelAccount, setCurrent } from "../../state/actions/accountAction";
import Modal from "react-bootstrap/Modal";

function Account() {
    const { t } = hooks.useTranslationPrefix('account');
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const saveAccount = hooks.useSelector(state => state.account.save);
    const current = hooks.useSelector(state => state.account.current);
    const [select, setSelect] = useState(current)
    const [secretVisible, setSecretVisible] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const dispath = useDispatch()

    useEffect(() => {
        setSelect(current)
    }, [current, saveAccount])

    const saveAccountArray = useMemo(() => {
        return utils.objectToArray(saveAccount)
    }, [saveAccount])

    useEffect(() => {
        if (!saveAccount[select]) {
            const keys = Object.keys(saveAccount)
            if (keys.length !== 0) {
                setSelect(keys[0])
            }
        }
    }, [saveAccount])

    const onUseThis = (key: string) => {
        current !== key && dispath(setCurrent(key))
    }

    const onDelAccount = (key: string) => {
        if (key) {
            dispath(DelAccount(key))
            setShowConfirmDelete(false)
        }
    };

    return (
        <div className="flex flex-column p-3 h100">
            <div className="flex1">
                <Button variant="primary" onClick={() => setShowCreateAccount(true)}>{t('create')}</Button>
                <div className="ms-3">
                    <div className="form-check form-switch">
                        <input className="form-check-input cp" type="checkbox" onChange={e => setSecretVisible(e.target.checked)}/>
                        <label className="form-check-label ms-1">{ secretVisible ? t('secret_visible_on') : t('secret_visible_off') }</label>
                    </div>
                </div>
            </div>
            <CreateAccount show={showCreateAccount} onClose={() => setShowCreateAccount(false)}></CreateAccount>
            {saveAccountArray.length !== 0 ? (
                <div className="account-panel flex mt-3 fg1">
                    <div className="account-list me-4">
                        <ListGroup>
                            {saveAccountArray.map((item) => (
                                <ListGroup.Item
                                    action
                                    className={`address text-ellipsis ani ${select === item._id ? 'selected' : ''}`}
                                    variant={current === item._id ? 'info' : ''}
                                    key={item._id}
                                    onClick={() => setSelect(item._id)}
                                >
                                    {item.address}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                    <div className="current fg1 bg-white">
                        {!saveAccount[select] ? null : (function(){
                            const identity = saveAccount[select]
                            return (
                                <div className="flex-column p-3 h100">
                                    <div className="wrap mb-2">
                                        <div className="label_box address">{t('address')}</div>
                                        <div className="text">{identity.address}</div>
                                    </div>
                                    <div className="wrap mb-2">
                                        <div className="label_box public">{t('publicKey')}</div>
                                        <div className="text">{identity.publicKey}</div>
                                    </div>
                                    <div className="wrap mb-auto">
                                        <div className="label_box private">{t('privateKey')}</div>
                                        <div className="text">{secretVisible ? identity.privateKey : '*'.repeat(identity.privateKey.length) }</div>
                                    </div>
                                    <div className="flex1 w100">
                                        <Button variant="primary mt-sm-auto" onClick={() => onUseThis(identity.address)}>{t('use_this')}</Button>
                                        <Button variant="danger ms-auto" onClick={() => setShowConfirmDelete(true)}>{t('del_this')}</Button>
                                    </div>
                                </div>
                            )
                        })()}
                    </div>
                </div>
            ) : (
                <div className="flex4 fg1">
                    <img className="empty" src={EmptyImg} alt="empty"/>
                    <div className="c6">{t('no_account')}</div>
                </div>
            )}
            <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)} centered size="sm">
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">{t('del_account')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t('del_account_confirm')}
                    <div className="wrap mb-2 fs-6 fw-light">{saveAccount[select]?.address}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => onDelAccount(saveAccount[select]?.address)}>{t('del_sure')}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Account;