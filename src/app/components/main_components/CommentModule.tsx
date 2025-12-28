import "../../../styles/components/main_components/comment_style.scss"
import { useEffect, useState, type FC } from "react";
import Comment from "./Comment";
import { CommentData } from "@/lib/types/contenteType";
import ReplyLike from "./ReplyLike";
import { commentSorter } from "@/lib/tools/FilterSorter";
import { numberReducerFormat } from "@/lib/tools/stringTools";
import { useGlobalContext } from "../Navbar";
import languageList from "@/lib/language";
type Iprops = {
    authorId: number
    commentList: CommentData[],
    size: number,
    userAvatar: string,
}

const CommentModule: FC<Iprops>  = ( {authorId = -1, commentList = [], size= 50, userAvatar="/"} ) => {

    const { language } = useGlobalContext()
    const [currentSort, setCurrentSort] = useState<"like"|"date">("like")
    const [sortedList, setSortedList] = useState<CommentData[]>(commentList)

    // Use Effect to sort the comment list

    useEffect(()=>{
        const newFilteredSortedList = commentSorter(commentList.filter((item)=> item.isReply === false), currentSort)
        if (newFilteredSortedList !== undefined)
            setSortedList(newFilteredSortedList)
    },[commentList, currentSort])

    return (
        <>  
            <section className="comment-section">
                <div className="info-sort-button">
                    <h3><span>{numberReducerFormat(commentList.length)}</span>{commentList.length > 1 ? languageList[language].contentType.comment.plural : languageList[language].contentType.comment.singular}</h3>
                    <div className="comment-sort-button">
                        <p>{languageList[language].button.sortBy} :</p>
                        <button className={`link link-button push-action ${currentSort === "like" ? "sort-selected" : ""}`} onClick={()=>setCurrentSort("like")}>{languageList[language].contentType.like.singular}</button>
                        <button className={`link link-button push-action ${currentSort === "date" ? "sort-selected" : ""}`} onClick={()=>setCurrentSort("date")}>{languageList[language].contentType.date.singular}</button>
                    </div>
                </div>
                <ReplyLike id={authorId} type="image" url={userAvatar} like={0} displayLike={false} allowToggleReplyDisplay={false}/>
                <div className="comment-list">
                    {sortedList.map((item, index)=> 
                            <Comment 
                                id={item.id} 
                                size={size}  
                                commentList={commentList} 
                                userAvatar={userAvatar} 
                                key={`Comment_id:${item.id}_${index}`}
                            />
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default CommentModule