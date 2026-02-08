import { AuthSliceReducerType, ImageCategoryInput, RegisterFetchType, SetCommentType } from "@/lib/types/utilitisesType"
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
import getSearchAction from "./actions/content/getSearchAction"
import setGetSearchFetchStateIdleAction from "./actions/content/setGetSearchFetchStateIdleAction"
import postCommentAction from "./actions/content/postCommentAction"
import getCommentAction from "./actions/content/getCommentAction"
import postLikeAction from "./actions/content/postLikeAction"
const initialState: AuthSliceReducerType = {
    accessToken: "",
    authorized: "idle",
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
        isProfil: false,
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
    getComment: {
        type: "image",
        doPush: false,
        respond: {
            page: 0,
            pageSize: 0,
            totalComment: 0
        },
        fetch: {
            error: "",
            fetchState: "idle"
        }
    },
    postComment: {
        type: "image",
        fetch: {
            error: "",
            fetchState: "idle"
        }
    },
    postLike: {
        fetch: {
            error: "",
            fetchState: "idle"
        }
    },
    currentImage: defaultContent,
    currentContentUser: defaultUser,
    currentUser: defaultUser,
    currentArticle: defaultContent
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
        },
        setCommentType: (state, action: PayloadAction<SetCommentType>) => {
            if (action.payload.reducer === "post")
                state.postComment.type = action.payload.type
            else state.getComment.type = action.payload.type
        },
        setDoPushAction: (state, action: PayloadAction<boolean>)=> {
            state.getComment.doPush = action.payload
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
            state.register.registerValid.state = "idle";
            state.register.registerValid.message = "";
            state.register.registerValid.error = "";
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
            state.login.loginValid.state = "idle";
            state.login.loginValid.message = "";
            state.login.loginValid.error = "";
            state.login.fetch.error = "";
        })
        .addCase(setLoginFetchStateIdleAction, (state)=>{
            state.login.fetch.fetchState = "idle"
        })
        .addCase(postLoginAction.pending, (state) => {
            state.login.fetch.fetchState= "fetching";
            state.login.fetch.error = "";
            state.login.loginValid.state = "idle";
            state.login.loginValid.message = "";
            state.login.loginValid.error = "";
        })
        .addCase(postLoginAction.fulfilled, (state, action) => {
            state.login.fetch.fetchState = "done";
            if (action.payload.state) {
                state.login.loginValid.state = "valid"
                state.accessToken = action.payload.data.token
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
                state.authorized = true
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
                if (action.payload.isProfil){
                    state.currentUser = action.payload.data
                }
                else{
                    state.currentContentUser = action.payload.data
                }
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
                if (action.payload.data.method === "add") {
                    state.userData.following.push(action.payload.data.targetUserId)
                }
                else{
                    const newFollowList = state.userData.following.filter((item)=> item !== action.payload.data.targetUserId)
                    state.userData.following = newFollowList
                }
            }
            else {
                if (action.payload.authorized === false) {
                    state.authorized = false
                    state.accessToken = ""
                }
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
            state.imageUpload.imageUploadValid.state = "idle"
            state.imageUpload.imageUploadValid.message = ""
            state.imageUpload.imageUploadValid.error = ""
            state.imageUpload.fetch.error = ""
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
                        state.userData.images.push(action.payload.data.id) 
                }
            }
            else {
                state.imageUpload.imageUploadValid.state = "invalid"
                if (action.payload.authorized === false) {
                    state.authorized = false
                    state.accessToken = ""
                }
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
        // .addCase(getAddContentViewAction.pending, (state) => {
        // })
        // .addCase(getAddContentViewAction.fulfilled, (state, action) => {
        // })
        // .addCase(getAddContentViewAction.rejected, (state, action) => {
        // })

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
            }
            else {
                state.getSearch.fetch.fetchState = "error";
                state.getSearch.respond.page = 0
                state.getSearch.respond.pageSize = 0
                state.getSearch.respond.totalPages = 0
                state.getSearch.respond.totalResults = 0
                state.getSearch.respond.results = {image:[],user:[],article:[]}
                state.getSearch.fetch.error = action.payload.error
            }
        })
        .addCase(getSearchAction.rejected, (state, action) => {
            state.getSearch.fetch.fetchState = "error";
            state.getSearch.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Post Comment Case
        .addCase(postCommentAction.pending, (state) => {
            state.postComment.fetch.fetchState= "fetching";
        })
        .addCase(postCommentAction.fulfilled, (state, action) => {
            if (action.payload.state) {
                state.postComment.fetch.fetchState = "done";
                switch(state.postComment.type) {
                    // case "article":
                    //     if (action.payload.data.isReply) {
                    //         const targetComment = state.currentArticle.commentList.find((item)=> item.id === action.payload.data.targetCommentId)
                    //         if (targetComment) {
                    //             if (targetComment.totalReply !== 0)
                    //                 targetComment.totalReply += 1
                    //         }
                    //     }
                    //     state.currentArticle.commentList.push(action.payload.data)
                    //     state.currentArticle.totalComment += 1
                    //     break
                    case "image":
                        if (action.payload.data.isReply) {
                            const targetComment = state.currentImage.commentList.find((item)=> item.id === action.payload.data.targetCommentId)
                            if (targetComment) {
                                targetComment.totalReply += 1
                                targetComment.parentReply += 1
                            }
                        }
                        state.postComment.fetch.fetchState= "idle"
                        state.currentImage.commentList.push(action.payload.data)
                        state.currentImage.totalComment += 1
                        break
                }
            }
            else {
                state.postComment.fetch.fetchState = "error"
                if (action.payload.authorized === false) {
                    state.authorized = false
                    state.accessToken = ""
                }
                if (action.payload.error)
                    state.postComment.fetch.error = action.payload.error
            }
        })
        .addCase(postCommentAction.rejected, (state, action) => {
            state.postComment.fetch.fetchState = "error";
            state.postComment.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Get Comment Case
        .addCase(getCommentAction.pending, (state) => {
            state.getComment.fetch.fetchState= "fetching";
        })
        .addCase(getCommentAction.fulfilled, (state, action) => {
            if (action.payload.state) {
                state.getComment.fetch.fetchState = "done";
                switch(state.getComment.type){
                    case "image":
                        if (state.getComment.doPush){
                             action.payload.results.forEach((item)=> state.currentImage.commentList.push(item)) 
                        }
                        else {
                            state.currentImage.commentList = action.payload.results
                        } 
                        break
                    case "article":
                        if (state.getComment.doPush){
                             action.payload.results.forEach((item)=> state.currentArticle.commentList.push(item)) 
                        }
                        else {
                            state.currentArticle.commentList = action.payload.results
                        }   
                        break
                }
            }
            else {
                state.getComment.fetch.fetchState = "error";
                if (state.getComment.type === "image")
                    state.currentImage.commentList = []
                else state.currentArticle.commentList = []
            }
        })
        .addCase(getCommentAction.rejected, (state, action) => {
            state.getComment.fetch.fetchState = "error";
            state.getComment.fetch.error = action.error.message || "Fail to Fetch";
        })

        // Posr Like Case
        .addCase(postLikeAction.pending, (state) => {
            state.postLike.fetch.fetchState= "fetching";
        })
        .addCase(postLikeAction.fulfilled, (state, action) => {
            state.postLike.fetch.fetchState = "done";
            if (action.payload.state) {
                let listKey: "imageLiked" | "articleLiked" | "commentLiked" = "imageLiked"
                let currentContent: "currentImage" | "currentArticle" = "currentImage"
                let addRemove = 1
                if (action.payload.type === "comment")
                    listKey = "commentLiked"
                if (action.payload.type === "article") {
                    listKey = "articleLiked"
                    currentContent = "currentArticle"
                }
                if (action.payload.method === "add") {
                    state.userData[listKey].push(action.payload.targetContentId)
                }
                else if (action.payload.method === "remove"){
                    const newLikeList = state.userData[listKey].filter((item)=>item !== action.payload.targetContentId)
                    state.userData[listKey] = newLikeList
                    addRemove = -1
                }
                if (action.payload.type !== "comment"){
                    state[currentContent].likes += addRemove
                }
                else {
                    const commentTargetedImage = state.currentImage.commentList.find((item)=> item.id === action.payload.targetContentId)
                    if (commentTargetedImage)
                        commentTargetedImage.likes += addRemove
                    const commentTargetedarticle = state.currentArticle.commentList.find((item)=> item.id === action.payload.targetContentId)
                    if (commentTargetedarticle)
                        commentTargetedarticle.likes += addRemove
                }
            }
            else{
                if (action.payload.authorized === false) {
                    state.authorized = false
                    state.accessToken = ""
                }
            }
        })
        .addCase(postLikeAction.rejected, (state, action) => {
            state.postLike.fetch.fetchState = "error";
            state.postLike.fetch.error = action.error.message || "Fail to Fetch";
        })

    }
})

export const { 
    setRegisterFetchTypeAction, 
    setTokenAction, 
    setImageUploadCategoryAction,
    setFollowTargetUserId,
    setCommentType,
    setDoPushAction 
} = authSlice.actions;
export default authSlice.reducer

