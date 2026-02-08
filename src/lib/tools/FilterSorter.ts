import { CommentData, ContentData, UserData } from "../types/contenteType";
import {  SorterInput } from "../types/utilitisesType";


const contentSorter = (contentList: ContentData[],sortType: SorterInput) => {
    switch (sortType) {
        case "view":
            return [...contentList].sort((a: ContentData, b: ContentData)=> 
                b.views - a.views
            )
        case "like":
            return [...contentList].sort((a: ContentData, b: ContentData)=> 
                b.likes - a.likes
            )
        case "date":
            return [...contentList].sort((a: ContentData, b: ContentData)=> 
                Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)) 
            )
        default:
            return contentList
    }
}

const userSorter = (contentList: UserData[],sortType: SorterInput) => {
    switch (sortType) {
        case "view":
            return [...contentList].sort((a: UserData, b: UserData)=> 
                b.views - a.views
            )
        case "like":
            return [...contentList].sort((a: UserData, b: UserData)=> 
                b.likes - a.likes
            )
        case "follow":
            return [...contentList].sort((a: UserData, b: UserData)=> 
                b.followers - a.followers
            )
        case "date":
            return [...contentList].sort((a: UserData, b: UserData)=> 
                Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)) 
            )
        default:
            return contentList
    }
}

const commentSorter = (commentList: CommentData[],sortType: SorterInput) => {
    switch (sortType) {
        case "like":
            return [...commentList].sort((a: CommentData, b: CommentData)=> 
                b.likes - a.likes
            )
        case "date":
            return [...commentList].sort((a: CommentData, b: CommentData)=> 
                Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)) 
            )
        default:
            return commentList
    }
}

const filterHandler = (initialList: ContentData[], search: string, tag: string) => {
    const interArray = [...initialList].filter((item)=> item.title.toLowerCase().includes(search.toLowerCase()))
    if (tag.trim() !== ""){
        const tagList = tag.split("_")
        return tagList.reduce(
        (accumulator, currentTag) => [...accumulator].filter((item)=> item.tags.find((item)=>item.name === currentTag)),
        interArray,
        );
    }
    return interArray
}

const filterUserHandler = (initialList: UserData[], search: string) => 
    [...initialList].filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()))

  export {contentSorter, filterHandler, commentSorter, userSorter, filterUserHandler};