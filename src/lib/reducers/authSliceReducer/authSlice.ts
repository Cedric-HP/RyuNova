import { AuthSliceReducerType, ImageCategoryInput, RegisterFetchType } from "@/lib/types/utilitisesType"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { defaultContent, defaultUser, defaultUserData } from "@/lib/tools/DefaultValues"
import postRegisterAction from "./actions/logReg/postRegisterAction"
import setRegisterFetchStateIdleAction from "./actions/logReg/setRegisterFetchStateIdleAction"
import checkDuplicateAction from "./actions/logReg/checkDuplicateAction"
import resetRegisterStateAction from "./actions/logReg/resetRegisterStateAction"
import resetLoginStateAction from "./actions/logReg/resetLoginAction"
import setLoginFetchStateIdleAction from "./actions/logReg/setLoginFetchStateIdleAction"
import postLoginAction from "./actions/logReg/postLoginAction"
import getProfileAction from "./actions/user/getProfileAction"
import postImageAction from "./actions/image/postImageAction"
import resetPostImageStateAction from "./actions/image/resetPostImageStateAction"
import getLogoutAction from "./actions/logReg/getLogoutAction"
import getImageAction from "./actions/image/getImageAction"
import getUserAction from "./actions/user/getUserAction"
import setGetUserFetchStateIdleActionAction from "./actions/user/setGetUserFetchStateIdleAction"
import setGetImageFetchStateIdleAction from "./actions/image/setGetImageFetchStateIdleAction"
import getFollowAction from "./actions/user/getFollowAction"
import getAddContentViewAction from "./actions/content/getAddContentView"
import getSearchAction from "./actions/content/getSearchAction"
import setGetSearchFetchStateIdleAction from "./actions/content/setGetSearchFetchStateIdleAction"

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
    logout: {
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
        imageId: -1,
        imageUploadValid: {
          state: "idle",
          message: "",
          error: ""
        }
    },
    getImage: {
        exist: false,
        fetch: {
            error: "",
            fetchState: "idle"
        },
    },
    getUser: {
        exist: false,
        fetch: {
            error: "",
            fetchState: "idle"
        },
    },
    getFollow:{
        fetch: {
            error: "",
            fetchState: "idle"
        },
        targetedUserId: -1
    },
    getSearch: {
        respond: {
            page: 0,
            pageSize: 0,
            totalResults: 0,
            totalPages: 0,
            results: {
                image: [],
                article: [],
                user: []
            }
        },
        fetch: {
            error: "",
            fetchState: "idle"
        },
    },
    currentImage: defaultContent,
    currentUser: defaultUser,
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
        },
        setImageUploadCategoryAction: (state, action: PayloadAction<ImageCategoryInput >) =>{
            state.imageUpload.imageCategory = action.payload;
        },
        setFollowTargetUserId: (state, action: PayloadAction<number>) =>{
            state.getFollow.targetedUserId = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder

        // Log Reg Section
        //-----------------------------------------------------
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
            state.register.fetch.fetchState= "fetching";
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
            state.login.fetch.fetchState= "fetching";
            state.login.fetch.error = "";
        })
        .addCase(postLoginAction.fulfilled, (state, action) => {
            state.login.fetch.fetchState = "done";
            if (action.payload.state) {
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

        // LogOut Case
        .addCase(getLogoutAction.pending, (state) => {
            state.logout.fetch.fetchState= "fetching";
        })
        .addCase(getLogoutAction.fulfilled, (state) => {
            state.logout.fetch.fetchState = "done";
            state.authorized = false
            state.accessToken = ""
            state.userData = defaultUserData
        })
        .addCase(getLogoutAction.rejected, (state, action) => {
            state.logout.fetch.fetchState = "error";
            state.logout.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Name and Email checkDuplicate Case
        .addCase(checkDuplicateAction.pending, (state) => {
            state.register.fetch.fetchState= "fetching";
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

        // User Section
        //-----------------------------------------------------
        // Get Profile Case
        .addCase(getProfileAction.pending, (state) => {
            state.profile.fetch.fetchState= "fetching";
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

        // Get User Case
        .addCase(setGetUserFetchStateIdleActionAction, (state)=>{
            state.getUser.fetch.fetchState = "idle"
        })
        .addCase(getUserAction.pending, (state) => {
            state.getUser.fetch.fetchState= "fetching";
            state.getUser.exist = false;
        })
        .addCase(getUserAction.fulfilled, (state, action) => {
            state.getUser.fetch.fetchState = "done";
            if (action.payload.state) {
                state.getUser.exist = true;
                state.currentUser = action.payload.data
            }
            else {
                state.getUser.exist = false;
            }
        })
        .addCase(getUserAction.rejected, (state, action) => {
            state.getUser.fetch.fetchState = "error";
            state.getUser.exist = false;
            state.getUser.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Get Follow Case
        .addCase(getFollowAction.pending, (state) => {
            state.getFollow.fetch.fetchState= "fetching";
        })
        .addCase(getFollowAction.fulfilled, (state, action) => {
            state.getFollow.fetch.fetchState = "done";
            if (action.payload.state) {
                state.userData.following = action.payload.data.following
            }
        })
        .addCase(getFollowAction.rejected, (state, action) => {
            state.getFollow.fetch.fetchState = "error";
            state.getFollow.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Image Section
        //-----------------------------------------------------
        // Post Image Case
        .addCase(resetPostImageStateAction, (state)=>{
            state.imageUpload.imageUploadValid.state = "idle"
            state.imageUpload.imageUploadValid.message = ""
            state.imageUpload.imageUploadValid.error = ""
            state.imageUpload.fetch.error = ""
        })
        .addCase(postImageAction.pending, (state) => {
            state.imageUpload.fetch.fetchState= "fetching";
        })
        .addCase(postImageAction.fulfilled, (state, action) => {
            state.imageUpload.fetch.fetchState = "done";
            if (action.payload.state) {
                state.imageUpload.imageUploadValid.state = "valid"
                switch(action.payload.data.imageCategory) {
                    case "avatar":
                        state.userData.avatarUrl = action.payload.data.url
                        break
                    case "banner":
                        state.userData.bannerUrl = action.payload.data.url
                        break
                    case "image":
                        state.imageUpload.imageId = action.payload.data.id
                        state.userData.images.push({id: action.payload.data.id}) 
                }
            }
            else {
                state.imageUpload.imageUploadValid.state = "invalid"
                if(action.payload.message)
                    state.imageUpload.imageUploadValid.message = action.payload.message
                if (action.payload.error)
                    state.imageUpload.imageUploadValid.error = action.payload.error
            }
        })
        .addCase(postImageAction.rejected, (state, action) => {
            state.imageUpload.fetch.fetchState = "error";
            state.imageUpload.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Get Image Case
        .addCase(setGetImageFetchStateIdleAction, (state)=>{
            state.getImage.fetch.fetchState = "idle"
        })
        .addCase(getImageAction.pending, (state) => {
            state.getImage.fetch.fetchState= "fetching";
            state.getImage.exist = false;
        })
        .addCase(getImageAction.fulfilled, (state, action) => {
            state.getImage.fetch.fetchState = "done";
            if (action.payload.state) {
                state.currentImage = action.payload.data
                state.getImage.exist = true;
            }
            else {
                state.getImage.exist = false;
                state.currentImage = defaultContent
            }
        })
        .addCase(getImageAction.rejected, (state, action) => {
            state.getImage.fetch.fetchState = "error";
            state.getImage.exist = false;
            state.getImage.fetch.error = action.error.message || "Fail to Fetch";
        })

         // Content Section
        //-----------------------------------------------------
        // Add View Case
        .addCase(getAddContentViewAction.pending, (state) => {
            console.log("pendding")
        })
        .addCase(getAddContentViewAction.fulfilled, (state, action) => {
            console.log(action.payload)
        })
        .addCase(getAddContentViewAction.rejected, (state, action) => {
            console.log(action.payload)
        })

        // // Get Search Case
        .addCase(setGetSearchFetchStateIdleAction, (state)=>{
            state.getSearch.fetch.fetchState = "idle"
        })
        .addCase(getSearchAction.pending, (state) => {
            state.getSearch.fetch.fetchState= "fetching";
        })
        .addCase(getSearchAction.fulfilled, (state, action) => {
            if (action.payload.state) {
                state.getSearch.fetch.fetchState = "done";
                state.getSearch.respond.page = action.payload.page
                state.getSearch.respond.pageSize = action.payload.pageSize
                state.getSearch.respond.totalPages = action.payload.totalPages
                state.getSearch.respond.totalResults = action.payload.totalResults
                state.getSearch.respond.results = action.payload.results
                console.log(action.payload)
            }
            else {
                state.getSearch.fetch.fetchState = "error";
                state.getSearch.respond.page = 0
                state.getSearch.respond.pageSize = 0
                state.getSearch.respond.totalPages = 0
                state.getSearch.respond.totalResults = 0
                state.getSearch.respond.results = {image:[],user:[],article:[]}
                state.getSearch.fetch.error = action.payload.error
                console.log(action.payload)
            }
        })
        .addCase(getSearchAction.rejected, (state, action) => {
            state.getSearch.fetch.fetchState = "error";
            state.getSearch.fetch.error = action.error.message || "Fail to Fetch";
        })

    }
})

export const { 
    setRegisterFetchTypeAction, 
    setTokenAction, 
    setImageUploadCategoryAction,
    setFollowTargetUserId 
} = authSlice.actions;
export default authSlice.reducer