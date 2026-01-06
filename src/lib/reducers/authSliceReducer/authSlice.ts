import { AuthSliceReducerType } from "@/lib/types/utilitisesType"
import { createSlice } from "@reduxjs/toolkit"
import { defaultUserData } from "@/lib/tools/DefaultValues"
import postRegisterAction from "./actions/postRegisterAction"
import setRegisterFetchAction from "./actions/setRegisterFetchAction"

const initialState: AuthSliceReducerType = {
    accessToken: "",
    userData: defaultUserData,
    register: {
        fetchState: "indle",
        message: "",
        error: ""
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
    },

    extraReducers: (builder) => {
        builder

        // Register Case
        .addCase(setRegisterFetchAction, (state)=>{
            state.register.fetchState = "indle"
        })
        .addCase(postRegisterAction.pending, (state) => {
            state.register.fetchState= "feching";
            state.register.error = "";
        })
        .addCase(postRegisterAction.fulfilled, (state, action) => {
            state.register.fetchState = "done";
            console.log("Inscription réussie pour :", action.payload.data.name, " id:", action.payload.data.id);
        })
        .addCase(postRegisterAction.rejected, (state, action) => {
            state.register.fetchState = "error";
            state.register.error = action.error.message || "Échec de l'inscription";
        })

        // Get Profile
    }
})


export default authSlice.reducer