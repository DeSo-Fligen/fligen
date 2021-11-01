import Dropdown from "react-bootstrap/esm/Dropdown"
import { useTranslation } from "react-i18next"
import "./setting.scss";

function Setting () {
    const { t, i18n } = useTranslation()
    return (
        <div className="setting-panel pad-1 w100 h100 bbox">
            <div className="line">
                <div className="label">{t('setting.language')}</div>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {t(i18n.language)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            i18n.changeLanguage('zh_cn')
                        }}>{t('zh_cn')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            i18n.changeLanguage('en_us')
                        }}>{t('en_us')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}
export default Setting