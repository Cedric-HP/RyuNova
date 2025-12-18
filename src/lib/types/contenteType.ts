
type ContentData = {
  id: number,
  title: string,
  author: string,
  description: string,
  url: string,
  views: number,
  likes: number,
  createdAt: string,
  tags: string[]
}

type EventList = {
  title: string,
  date: string,
  url: string
}

type SorterImput = "view" | "like" | "date"

type TypeImput = "image" | "article" | "user"

export type {ContentData, EventList, SorterImput, TypeImput}