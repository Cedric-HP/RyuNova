import { articleList, commentList, imageBentoList, userListTest } from "../testContent";
import { TypeInput } from "../types/utilitisesType";
import { CommentData, ContentData, IdElement } from "../types/contenteType";

const useFetch = (id: number, type: TypeInput) => {
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

const fecthFinderComment = (idList: IdElement[]) => {
    const newCommentList: CommentData[] = []
    idList.forEach((item)=> {
        const find = commentList.find((element)=> element.id === item.id )
        if (find !== undefined)
            newCommentList.push(find) 
    })
    return newCommentList
}

export {useFetch, fecthFinderUser, fecthFinderComment}