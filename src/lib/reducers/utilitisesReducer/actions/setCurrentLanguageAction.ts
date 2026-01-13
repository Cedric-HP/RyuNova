import { LanguageInput } from "@/lib/types/utilitisesType";
import { createAction } from "@reduxjs/toolkit";

const setCurrentLanguageAction= createAction<LanguageInput>("UTILITISES-REDUCER/setCurrentLanguage");

export default setCurrentLanguageAction;