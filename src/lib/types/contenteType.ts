// Content Types

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
  commentList: CommentData[],
  tags: TagElement[],
  totalComment: number,
  parentComment: number
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
  images: number[],
  imageLiked: number[],
  articles: number[],
  articleLiked: number[],
  followers: number,
  following: number[],
  commentPosted: number[],
  commentLiked: number[],
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
  targetCommentId: number,
  likes: number,
  createdAt: string,
  isReply: boolean,
  totalReply: number,
  parentReply: number
}

export type {
  ContentData, 
  EventList,
  UserData, 
  CommentData,
  ProfileData,
  TagElement
}