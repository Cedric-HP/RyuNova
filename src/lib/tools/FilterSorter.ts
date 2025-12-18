import { ContentData, SorterImput } from "../types/contenteType";


const contentSorter = (contentList: ContentData[],sortType: SorterImput) => {
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
        }
  }

  const filterHandler = (initialList: ContentData[], search: string, tag: string) => {
    const interArray = [...initialList].filter((item)=> item.title.toLowerCase().includes(search.toLowerCase()))
    if (tag.trim() !== ""){
        const tagList = tag.split("_")
        return tagList.reduce(
        (accumulator, currentTag) => [...accumulator].filter((item)=> item.tags.includes(currentTag)),
        interArray,
        );
    }
    return interArray
}

  export {contentSorter, filterHandler};