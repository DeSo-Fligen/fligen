import i18n from "i18next";
import languagedetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enJson from "./en-us.json";
import cnJson from "./zh-cn.json";

i18n.use(languagedetector)
    .use(initReactI18next)
    .init({
        resources: {
            zh_cn: {
                translation: cnJson,
            },
            en_us: {
                translation: enJson,
            },
        },
        fallbackLng: 'en_us',
        debug: false,
        interpolation: {
            escapeValue: false,
        }
    })

export default i18n;