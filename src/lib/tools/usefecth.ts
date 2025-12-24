import { articleList, commentList, imageBentoList, userListTest } from "../testContent";
import { CommentData, ContentData, TypeImput } from "../types/contenteType";

const useFetch = (id: number, type: TypeImput) => {
    switch(type){
        case "image":
            return fecthFinder(imageBentoList, id)
        case "article":
            return fecthFinder(articleList, id)
    }
}

const fecthFinder = (contentList: ContentData[], id: number) => {
    return contentList.find((item)=> item.id === id)
}

const fecthFinderUser = (id: number) => {
    return userListTest.find((item)=> item.id === id)
}

const fecthFinderComment = (idList: number[]) => {
    const newCommentList: CommentData[] = []
    idList.forEach((item)=> {
        const find = commentList.find((element)=> element.id === item )
        if (find !== undefined)
            newCommentList.push(find) 
    })
    return newCommentList
}

export {useFetch, fecthFinderUser, fecthFinderComment}