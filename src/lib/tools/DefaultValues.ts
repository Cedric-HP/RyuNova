import { CommentData, UserData } from "../types/contenteType"

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
    url:"url",
    description: "",
    views: 0,
    likes: 0,
    followers: 0
}

export {defaultComment, defaultUser}