import { UtilitisesReducerType } from "@/lib/types/utilitisesType"
import { createReducer } from "@reduxjs/toolkit"
import setFullScreenAction from "./actions/setFullScreenAction"
import { defaultContent } from "@/lib/tools/DefaultValues"
import setCurrentImageAction from "./actions/setCurrentImageAction"
import setLogRegAction from "./actions/setLogRegAction"

const initialState: UtilitisesReducerType = {
    fullScreenDisplayed: "",
    logReg: "log",
    currentImage: defaultContent
}

const utilitisesReducer = createReducer<UtilitisesReducerType>(
    initialState,
    (builder) => {
        builder.addCase(setFullScreenAction, (state, action) => {
            state.fullScreenDisplayed = action.payload
        })
        .addCase(setCurrentImageAction, (state, action) => {
            state.currentImage = action.payload
        })
        .addCase(setLogRegAction, (state, action) => {
            state.logReg = action.payload
        })
    }
)


export default utilitisesReducer