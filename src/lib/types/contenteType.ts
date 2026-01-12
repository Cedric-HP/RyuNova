// Content Types

type IdElement = {
  id: number
}

type TagElement = {
  name: string,
}

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
  commentList: IdElement[],
  tags: TagElement[]
}

type UserData = {
  id: number,
  name: string,
  description: string,
  avatarUrl: string,
  bannerUrl: string,
  views: number,
  likes: number,
  images: number,
  articles: number,
  followers: number,
  createdAt: string,
}

type ProfileData = {
  id: number,
  name: string,
  description: string,
  avatarUrl: string,
  bannerUrl: string,
  views: number,
  likes: number,
  images: IdElement[],
  imageLiked: IdElement[],
  articles: IdElement[],
  articleLiked: IdElement[],
  followers: number,
  followed: IdElement[],
  commentPosted: IdElement[],
  commentLiked: IdElement[],
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
  replyList: IdElement[],
  isReply: boolean,
}

export type {
  ContentData, 
  EventList,
  UserData, 
  CommentData,
  ProfileData,
  TagElement,
  IdElement
}