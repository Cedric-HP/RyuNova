import { CommentData, ContentData,UserData } from "../types/contenteType"
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
    mainElement: null,
    windowSize:  {
        height: 0,
        width: 0
    }
}

export {
    defaultComment, 
    defaultUser, 
    globalContextDefaultValue,
    defaultContent
}