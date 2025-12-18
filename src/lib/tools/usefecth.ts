import { articleList, imageBentoList, userList } from "../testContent";
import { ContentData, TypeImput } from "../types/contenteType";

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
    return userList.find((item)=> item.id === id)
}

export {useFetch, fecthFinderUser}