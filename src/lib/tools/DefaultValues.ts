import { CommentData, GlobalContextType, UserData } from "../types/contenteType"

const defaultComment: CommentData = {
    id: -1,
    userId: -1,
    comment: "",
    createdAt: "",
    likes: 0,
    replyList: [],
    url: "",
    userName: "",
    isReply: false
}

const defaultUser: UserData = {
    id: -1,
    name: "deleted_user",
    avatarUrl:"",
    bannerUrl: "",
    article: 0,
    images: 0,
    createdAt: "",
    description: "",
    views: 0,
    likes: 0,
    followers: 0
}

const globalContextDefaultValue: GlobalContextType = {
    language: "en"
}

export {defaultComment, defaultUser, globalContextDefaultValue}