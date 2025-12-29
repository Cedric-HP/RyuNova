// Content Types

import { RefObject } from "react"

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
  avatarUrl: string,
  bannerUrl: string,
  views: number,
  likes: number,
  images: number,
  articles: number,
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

// Language Types

type LanguageData = {
  titles: LanguageTitles,
  contentType: LanguageContentType,
  button: LanguageButton,
  date: LanguageDate,
  placeHolders: LanguagePlaceHolder,
  alt: LanguageAlt,
  message: LanguageMessage,
  utilities: LanguageUtilities, 
}
type SingulaPlural = {
  singular: string,
  plural: string,
}

type LanguageTitles = {
  homeMainTitle: string,
  homeSecondTitle: string,
  featuredPicturesGallery: string,
  featuredArticles: string,
  upcommingAstronomicalEvents: string,
  home: string,
  gallery: string,
  events: string,
  content: string,
  legalInformation: string,
  termsOfService: string,
  privacyPolicy: string,
  copyrightNotification: string,
  intellectualPropertyRights: string,
}

type LanguageContentType = {
  article: SingulaPlural,
  comment: SingulaPlural,
  date: SingulaPlural,
  follower: SingulaPlural,
  image: SingulaPlural,
  like: SingulaPlural,
  reply: SingulaPlural,
  user: SingulaPlural,
  view: SingulaPlural,
  tag: SingulaPlural,
  result: SingulaPlural, 
}

type LanguageButton = {
  signUp: string,
  logIn: string,
  seeMore: string,
  seeLess: string,
  readMore: string,
  apply: string,
  sortBy: string,
  type: string,
  addComment: string,
  respond: string,
  hide: SingulaPlural,
  cancel: string,
  previous: string,
  follow: string,
  unfollow: string,
}

type LanguageDate = {
  year: SingulaPlural,
  month: SingulaPlural,
  week: SingulaPlural,
  day: SingulaPlural,
  hour: SingulaPlural,
  minute: SingulaPlural,
  second: SingulaPlural,
  prefix: string,
  sufix: string,
  justNow: string,
}

type LanguagePlaceHolder = {
  search: string,
  tagsPlaceholder: string,
}

type LanguageAlt = {
  button: string,
  by: string,
  link: string,
}

type LanguageMessage = {
  notification: LanguageNotificationMessage,
  error: LanguageErrorMessage,
}

type LanguageNotificationMessage = {
  noTag: string,
}

type LanguageErrorMessage = {
  noResultFound: string,
  imageNotFound: string,
}

type LanguageUtilities = {
  languageName: string,
  flagKey: string,
  uniCode: string,
}

type Language = {
  en: LanguageData,
  fr: LanguageData
}

// Uyility Types

type LanguageInput = "en" | "fr"

type SorterImput = "view" | "like" | "date" | "follower"

type TypeImput = "image" | "article" | "user" | "comment"

// Context Type

type GlobalContextType = {
  language: LanguageInput,
  mainElement: RefObject<HTMLElement | null>,
}

// Server Side Table Format

type ImageServerData = {
  id: number,
  title: string,
  authorId: number,
  imageType: string,
  imageName: string,
  imageData: string,
  description: string,
  views: number,
  likes: number,
  commentList: number[],
  tags: string[],
  createdAt: Date,
}

export type {
  ContentData, 
  EventList, 
  SorterImput, 
  TypeImput, 
  UserData, 
  CommentData, 
  Language, 
  LanguageData, 
  LanguageInput,
  GlobalContextType
}