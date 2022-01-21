import React, { createContext, useState, useContext, useEffect } from "react";
import { languageOptions, dictionaryList } from "../../Languages";


export const LanguageContext = createContext({
    language: languageOptions[0],
    dictionary: dictionaryList[languageOptions[0].id]
});

export const LanguageProvider = (props) => {
    const languageContext = useContext(LanguageContext);
    const [language, setLanguage] = useState(languageContext.language);
    const [dictionary, setDictionary] = useState(languageContext.dictionary);

    const provider = {
        language,
        dictionary,
        setLanguage: (selectedLanguage) => {
            setLanguage(selectedLanguage);
            setDictionary(dictionaryList[selectedLanguage.id]);
        }
    }
    useEffect(() => {        
        const lang = sessionStorage.getItem('lang');
        if (lang) {
            setLanguage(lang);
            setDictionary(dictionaryList[lang]);
        }
    }, []);

    return (
        <LanguageContext.Provider value={provider}>
            {props.children}
        </LanguageContext.Provider>
    )
};


export const Text = (props) => {
    const languageContext = useContext(LanguageContext);
    return languageContext.dictionary[props.tid];
};