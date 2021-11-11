import Dropdown from "react-bootstrap/esm/Dropdown"
import { useTranslation } from "react-i18next"
import "./setting.scss";

function Setting () {
    const { t, i18n } = useTranslation()
    const languages = ['zh_cn', 'en_us']
    return (
        <div className="setting-panel p-4 w100 h100 bbox">
            <div className="line">
                <div className="label">{t('setting.language')}</div>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {t(i18n.language)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {languages.map(lang => (
                            <Dropdown.Item key={lang} active={i18n.language===lang} onClick={() => {
                                i18n.changeLanguage(lang)
                            }}>{t(lang)}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}
export default Setting