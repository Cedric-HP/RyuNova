
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
  url: string,
  views: number,
  likes: number,
  followers: number,
  description: string,
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
  replyList: number[]
}

type SorterImput = "view" | "like" | "date"

type TypeImput = "image" | "article" | "user" | "comment"

export type {ContentData, EventList, SorterImput, TypeImput, UserData, CommentData}