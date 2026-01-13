import { AppDispatch, RootState } from "@/lib/reducers/store";
import { useEffect, useState, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/components/custom_selectors_components/custom-selectors-display.scss"
import languageList from "@/lib/language";
import { LanguageInput } from "@/lib/types/utilitisesType";
import useLocalStorage from "@/lib/tools/useLocalStorage";
import setCurrentLanguageAction from "@/lib/reducers/utilitisesReducer/actions/setCurrentLanguageAction";
import setCustomSelectorAction from "@/lib/reducers/utilitisesReducer/actions/setCustomSelectorAction";
import { CircleFlag } from "react-circle-flags";

const CustomSelectorLanguageComponent: FC  = () => {

    // Reducers
    const { customSelectorDisplayed, currentLanguage } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Local Language Seter
    const [localLanguage, setLocalLanguage] = useLocalStorage("ryunovaLanguage", "")

    const handleLanguage = (lang: LanguageInput) => {
        dispatch(setCustomSelectorAction(""))
        setLocalLanguage(lang)
        dispatch(setCurrentLanguageAction(lang))
    }

    // isMounted
        const [isMounted, setIsMounted] = useState(false);
        

    // Use Effect to Handle Local Language
    useEffect(()=>{
        if (isMounted && (localLanguage === "en" || localLanguage === "fr"))
            if (localLanguage !== currentLanguage)
                dispatch(setCurrentLanguageAction(localLanguage))
    },[currentLanguage, dispatch, isMounted, localLanguage])

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <div className={`select-container select-language ${customSelectorDisplayed === "language" ? "custom-select-appear" : "custom-select-disappear"}`}>
                <ul>
                    <li 
                        className={currentLanguage === "en" ? "option-selected" : ""}
                        onClick={()=>handleLanguage("en")}
                        onKeyDown={()=>handleLanguage("en")}
                    >
                        <CircleFlag countryCode={languageList.en.utilities.flagKey} height={20}/>
                        <p>{languageList.en.utilities.languageName}</p>
                    </li>
                    <li 
                        className={currentLanguage === "fr" ? "option-selected" : ""}
                        onClick={()=>handleLanguage("fr")}
                        onKeyDown={()=>handleLanguage("fr")}
                    >
                    <CircleFlag countryCode={languageList.fr.utilities.flagKey} height={20}/>
                    <p>{languageList.fr.utilities.languageName}</p>
                </li>
            </ul>
        </div>
    )
}

export default CustomSelectorLanguageComponent