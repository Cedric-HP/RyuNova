import { UtilitisesReducerType } from "@/lib/types/utilitisesType"
import { createReducer } from "@reduxjs/toolkit"
import setFullScreenAction from "./actions/setFullScreenAction"
import { defaultContent } from "@/lib/tools/DefaultValues"
import setCurrentImageAction from "./actions/setCurrentImageAction"
import setLogRegAction from "./actions/setLogRegAction"
import setCustomSelectorAction from "./actions/setCustomSelectorAction"
import setCurrentLanguageAction from "./actions/setCurrentLanguageAction"

const initialState: UtilitisesReducerType = {
    fullScreenDisplayed: "",
    logReg: "log",
    currentLanguage: "en",
    customSelectorDisplayed: ""
}

const utilitisesReducer = createReducer<UtilitisesReducerType>(
    initialState,
    (builder) => {
        builder.addCase(setFullScreenAction, (state, action) => {
            state.fullScreenDisplayed = action.payload
        })
        .addCase(setLogRegAction, (state, action) => {
            state.logReg = action.payload
        })
        .addCase(setCustomSelectorAction, (state, action) => {
            if (state.customSelectorDisplayed === action.payload)
                state.customSelectorDisplayed = ""
            else
                state.customSelectorDisplayed = action.payload
        })
        .addCase(setCurrentLanguageAction, (state, action) => {
            state.currentLanguage = action.payload
        })
    }
)


export default utilitisesReducer