import { UtilitisesReducerType } from "@/lib/types/utilitisesType"
import { createReducer } from "@reduxjs/toolkit"
import setFullScreenAction from "./actions/setFullScreenAction"
import { defaultContent } from "@/lib/tools/DefaultValues"
import setCurrentImageAction from "./actions/setCurrentImageAction"

const initialState: UtilitisesReducerType = {
    fullScreenDisplayed: "",
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
    }
)


export default utilitisesReducer