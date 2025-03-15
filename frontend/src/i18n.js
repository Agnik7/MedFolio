import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation, initReactI18next } from "react-i18next";


i18next.use(LanguageDetector).use(initReactI18next).init(
    {
        debug:true,
        lng:"en",
        resources:
    {
        
    }
    }
)