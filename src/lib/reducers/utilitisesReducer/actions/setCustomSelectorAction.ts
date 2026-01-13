import { CustomSelectorsInput } from "@/lib/types/utilitisesType";
import { createAction } from "@reduxjs/toolkit";

const setCustomSelectorAction= createAction<CustomSelectorsInput>("UTILITISES-REDUCER/setCustomSelector");

export default setCustomSelectorAction;