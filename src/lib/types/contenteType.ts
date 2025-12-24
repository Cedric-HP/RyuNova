
type ContentData = {
  id: number,
  title: string,
  author: string,
  authorId: number,
  description: string,
  url: string,
  views: number,
  likes: number,
  createdAt: string,
  commentList: number[],
  tags: string[]
}

type UserData = {
  id: number,
  name: string,
  description: string,
  url: string,
  views: number,
  likes: number,
  followers: number,
  createdAt: string,
}

type EventList = {
  title: string,
  date: string,
  url: string
}
type CommentData = {
  id: number,
  userId: number,
  userName: string,
  url: string,
  comment: string,
  likes: number,
  createdAt: string,
  replyList: number[],
  isReply: boolean,
}

type SorterImput = "view" | "like" | "date" | "follower"

type TypeImput = "image" | "article" | "user" | "comment"

export type {ContentData, EventList, SorterImput, TypeImput, UserData, CommentData}