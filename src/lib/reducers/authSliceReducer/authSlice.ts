import { AuthSliceReducerType, RegisterFetchType } from "@/lib/types/utilitisesType"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { defaultUserData } from "@/lib/tools/DefaultValues"
import postRegisterAction from "./actions/postRegisterAction"
import setRegisterFetchStateIdleAction from "./actions/setRegisterFetchStateIdleAction"
import checkDuplicateAction from "./actions/checkDuplicateAction"

const initialState: AuthSliceReducerType = {
    accessToken: "",
    userData: defaultUserData,
    register: {
        nameValid: {
            value: "",
            valid:"idle"
        },
        emailValid: {
            value: "",
            valid:"idle"
        },
        registerValid: {
            state: "idle",
            message: "",
            error: ""
        },
        fetch: {
            fetchState: "idle",
            message: "",
            error: ""
        },
        fetchType: ""
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        // Name and Email checkDuplicate
        setRegisterFetchTypeAction: (state, action: PayloadAction<RegisterFetchType>) =>{
            state.register.fetchType = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder

        // Register Case
        .addCase(setRegisterFetchStateIdleAction, (state)=>{
            state.register.fetch.fetchState = "idle"
        })
        .addCase(postRegisterAction.pending, (state) => {
            state.register.fetch.fetchState= "feching";
            state.register.fetch.error = "";
        })
        .addCase(postRegisterAction.fulfilled, (state, action) => {
            state.register.fetch.fetchState = "done";
            if (action.payload.state) {
                state.register.nameValid.valid = "idle"
                state.register.emailValid.valid = "idle"
                state.register.nameValid.value = ""
                state.register.emailValid.value = ""
                state.register.registerValid.state = "valid"
            }
            else {
                state.register.registerValid.state = "invalid"
                if (action.payload.message)
                    state.register.registerValid.message = action.payload.message
                if (action.payload.error)
                    state.register.registerValid.message = action.payload.error
            }
        })
        .addCase(postRegisterAction.rejected, (state, action) => {
            state.register.fetch.fetchState = "error";
            state.register.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Name and Email checkDuplicate
        .addCase(checkDuplicateAction.pending, (state) => {
            state.register.fetch.fetchState= "feching";
        })
        .addCase(checkDuplicateAction.fulfilled, (state, action) => {
            state.register.fetch.fetchState = "done";
            console.log(action.payload)
            switch (action.payload.type) {
                case "name": {
                    state.register.nameValid.value = action.payload.value
                    if (action.payload.state) 
                        state.register.nameValid.valid = "valid"; 
                    else state.register.nameValid.valid = "invalid"; 
                    break;
                }
                case "email": {
                    state.register.emailValid.value = action.payload.value
                    if (action.payload.state)
                        state.register.emailValid.valid = "valid";
                    else state.register.emailValid.valid = "invalid"; 
                    break;
                } 
            }
        })
        .addCase(checkDuplicateAction.rejected, (state, action) => {
            state.register.fetch.fetchState = "error";
            state.register.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Get Profile
    }
})

export const { setRegisterFetchTypeAction } = authSlice.actions;
export default authSlice.reducer