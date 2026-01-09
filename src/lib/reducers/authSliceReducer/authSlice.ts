import { AuthSliceReducerType, RegisterFetchType } from "@/lib/types/utilitisesType"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { defaultUserData } from "@/lib/tools/DefaultValues"
import postRegisterAction from "./actions/logReg/postRegisterAction"
import setRegisterFetchStateIdleAction from "./actions/logReg/setRegisterFetchStateIdleAction"
import checkDuplicateAction from "./actions/logReg/checkDuplicateAction"
import resetRegisterStateAction from "./actions/logReg/resetRegisterStateAction"
import resetLoginStateAction from "./actions/logReg/resetLoginAction"
import setLoginFetchStateIdleAction from "./actions/logReg/setLoginFetchStateIdleAction"
import postLoginAction from "./actions/logReg/postLoginAction"
import getProfileAction from "./actions/user/getProfileAction"
import postImageAction from "./actions/image/postImageAction"

const initialState: AuthSliceReducerType = {
    accessToken: "",
    authorized: true,
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
            error: ""
        },
        fetchType: ""
    },
    login: {
        loginValid: {
          state: "idle",
          message: "",
          error: ""
        },
        fetch: {
            fetchState: "idle",
            error: ""
        }
    },
    profile: {
        fetch: {
            error: "",
            fetchState: "idle"
        }
    },
    imageUpload: {
        fetch: {
            error: "",
            fetchState: "idle"
        },
        imageCategory: "image",
        imageUploadValid: {
          state: "idle",
          message: "",
          error: ""
        }
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        // Name and Email checkDuplicate
        setRegisterFetchTypeAction: (state, action: PayloadAction<RegisterFetchType>) =>{
            state.register.fetchType = action.payload;
        },
        setTokenAction: (state, action:  PayloadAction<string>)=>{
            state.accessToken = action.payload
        }
    },

    extraReducers: (builder) => {
        builder

        // Register Case
        .addCase(resetRegisterStateAction, (state)=>{
            state.register.nameValid.valid = "idle"
            state.register.emailValid.valid = "idle"
            state.register.nameValid.value = ""
            state.register.emailValid.value = ""
            state.register.fetchType = ""
            state.register.registerValid.state = "idle"
            state.register.registerValid.message = ""
            state.register.registerValid.error = ""
            state.register.fetch.error = ""
        })
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

        // Login Case
        .addCase(resetLoginStateAction, (state)=>{
            state.login.loginValid.state = "idle"
            state.login.loginValid.message = ""
            state.login.loginValid.error = ""
            state.login.fetch.error = ""
        })
        .addCase(setLoginFetchStateIdleAction, (state)=>{
            state.login.fetch.fetchState = "idle"
        })
        .addCase(postLoginAction.pending, (state) => {
            state.login.fetch.fetchState= "feching";
            state.login.fetch.error = "";
        })
        .addCase(postLoginAction.fulfilled, (state, action) => {
            state.login.fetch.fetchState = "done";
            if (action.payload.state) {
                console.log(action.payload)
                state.login.loginValid.state = "valid"
                state.accessToken = action.payload.data.token
                state.authorized = true
            }
            else {
                state.login.loginValid.state = "invalid"
                if (action.payload.message)
                    state.login.loginValid.message = action.payload.message
                if (action.payload.error)
                    state.login.loginValid.message = action.payload.error
            }
        })
        .addCase(postLoginAction.rejected, (state, action) => {
            state.login.fetch.fetchState = "error";
            state.login.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Name and Email checkDuplicate
        .addCase(checkDuplicateAction.pending, (state) => {
            state.register.fetch.fetchState= "feching";
        })
        .addCase(checkDuplicateAction.fulfilled, (state, action) => {
            state.register.fetch.fetchState = "done";
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
        .addCase(getProfileAction.pending, (state) => {
            state.profile.fetch.fetchState= "feching";
        })
        .addCase(getProfileAction.fulfilled, (state, action) => {
            state.profile.fetch.fetchState = "done";
            if (action.payload.state) {
                state.userData = action.payload.data
            }
            else {
                if (action.payload.authorized === false) {
                    state.authorized = false
                    state.accessToken = ""
                }
            }
        })
        .addCase(getProfileAction.rejected, (state, action) => {
            state.profile.fetch.fetchState = "error";
            state.profile.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Post Image
        .addCase(postImageAction.pending, (state) => {
            state.imageUpload.fetch.fetchState= "feching";
        })
        .addCase(postImageAction.fulfilled, (state, action) => {
            state.imageUpload.fetch.fetchState = "done";
            if (action.payload.state) {
                switch(action.payload.data.imageCategory) {
                    case "avatar":
                        state.userData.avatarUrl = action.payload.data.url
                        break
                    case "banner":
                        state.userData.bannerUrl = action.payload.data.url
                        break
                    case "image":
                        state.userData.images.push({id: action.payload.data.id}) 
                }
            }
        })
        .addCase(postImageAction.rejected, (state, action) => {
            state.imageUpload.fetch.fetchState = "error";
            state.imageUpload.fetch.error = action.error.message || "Fail to Fetch";
        })
    }
})

export const { setRegisterFetchTypeAction, setTokenAction } = authSlice.actions;
export default authSlice.reducer