import { RootState } from "@/lib/reducers/store";
import { type FC } from "react";
import { useSelector } from "react-redux";
import "../../../styles/components/custom_selectors_components/custom-selectors-display.scss"
import languageList from "@/lib/language";
import { CircleFlag } from "react-circle-flags";
import useHandleLanguage from "@/lib/tools/useHandleLanguage";

const CustomSelectorLanguageComponent: FC  = () => {

    // Reducers
    const { customSelectorDisplayed, currentLanguage } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )

    const {handleLanguage} = useHandleLanguage()
    

    return (
        <div className={`select-container select-language ${customSelectorDisplayed.includes("language") && !customSelectorDisplayed.includes("hide") ? "custom-select-appear" : "custom-select-disappear"}`}>
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