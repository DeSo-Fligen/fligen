import { useTranslation } from "react-i18next"

function Setting () {
    const { t, i18n } = useTranslation()
    const languages = ['zh_cn', 'en_us']
    return (
        <div className="p-4 w-full h-full box-border">
            <div className="flex items-center">
                <div className="text-base mr-5">{t('setting.language')}</div>
                <div className="relative inline-flex">
                <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299"/></svg>
                <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                    defaultValue={i18n.language}
                    onChange={(e) => {
                        const index = e.target.selectedIndex
                        const lang = languages[index];
                        i18n.changeLanguage(lang)
                    }}>
                    {languages.map(lang => (
                        <option key={lang} value={lang}>{t(lang)}</option>
                    ))}
                </select>
                </div>
                {/* <Dropdown>
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
                </Dropdown> */}
            </div>
        </div>
    )
}
export default Setting