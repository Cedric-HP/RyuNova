import useLocalStorage from "./useLocalStorage";
import setCustomSelectorAction from "../reducers/utilitisesReducer/actions/setCustomSelectorAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reducers/store";
import { LanguageInput } from "../types/utilitisesType";
import setCurrentLanguageAction from "../reducers/utilitisesReducer/actions/setCurrentLanguageAction";

const useHandleLanguage= () => {

    // Reducers
    const dispatch: AppDispatch = useDispatch()

    // Local Language Seter
    const [localLanguage, setLocalLanguage] = useLocalStorage("ryunovaLanguage", "")

    const handleLanguage = (lang: LanguageInput) => {
        dispatch(setCustomSelectorAction("language"))
        setLocalLanguage(lang)
        dispatch(setCurrentLanguageAction(lang))
    }
    return { handleLanguage, localLanguage };
};

export default useHandleLanguage