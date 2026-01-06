import { CommentData, ContentData,ProfileData,UserData } from "../types/contenteType"
import { GlobalContextType } from "../types/utilitisesType"

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
    articles: 0,
    images: 0,
    createdAt: "",
    description: "",
    views: 0,
    likes: 0,
    followers: 0
}

const defaultContent: ContentData = {
    author: "",
    authorId: -1,
    commentList: [],
    createdAt: "",
    description: "",
    id: -1,
    likes: 0,
    tags: [],
    title: "",
    url: "",
    views: 0
}

const globalContextDefaultValue: GlobalContextType = {
    language: "en",
    windowSize:  {
        height: 0,
        width: 0
    }
}

const defaultUserData: ProfileData = {
    id: -1,
    name: "deleted_user",
    avatarUrl:"",
    bannerUrl: "",
    description: "",
    views: 0,
    likes: 0,
    images: [],
    imageLiked: [],
    followers: 0,
    followed: [],
    commentLiked: [],
    commentPosted: [],
    articles: [],
    articleLiked: [],
    createdAt: "", 
}

export {
    defaultComment, 
    defaultUser, 
    globalContextDefaultValue,
    defaultContent,
    defaultUserData
}