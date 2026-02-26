import { UtilitisesReducerType } from "@/lib/types/utilitisesType"
import { createReducer } from "@reduxjs/toolkit"
import setFullScreenAction from "./actions/setFullScreenAction"
import setLogRegAction from "./actions/setLogRegAction"
import setCustomSelectorAction from "./actions/setCustomSelectorAction"
import setCurrentLanguageAction from "./actions/setCurrentLanguageAction"
import toggleParticlesAction from "./actions/toggleParticlesAction"

const initialState: UtilitisesReducerType = {
    fullScreenDisplayed: "",
    logReg: "log",
    currentLanguage: "en",
    customSelectorDisplayed: "",
    displayParticles: true
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
            if (action.payload === "closeAll")
                state.customSelectorDisplayed = ""
            else if (action.payload === "show")
                state.customSelectorDisplayed = state.customSelectorDisplayed.replace("hide", "")
            else if (state.customSelectorDisplayed.includes(action.payload) && action.payload !== "hide")
                state.customSelectorDisplayed = state.customSelectorDisplayed.replace(action.payload, "")
            else if ( !(state.customSelectorDisplayed.includes("hide") && action.payload === "hide") )
                state.customSelectorDisplayed += action.payload
        })
        .addCase(setCurrentLanguageAction, (state, action) => {
            state.currentLanguage = action.payload
        })
        .addCase(toggleParticlesAction, (state) => {
            state.displayParticles = !state.displayParticles
        })
    }
)


export default utilitisesReducer