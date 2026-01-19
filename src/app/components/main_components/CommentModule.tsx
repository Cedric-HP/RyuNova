import "../../../styles/components/main_components/comment_style.scss"
import { useEffect, useState, type FC } from "react";
import Comment from "./Comment";
import { CommentData } from "@/lib/types/contenteType";
import ReplyLike from "./ReplyLike";
import { commentSorter } from "@/lib/tools/FilterSorter";
import { numberReducerFormat } from "@/lib/tools/stringTools";
import languageList from "@/lib/language";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/store";
import useHandleLogRegPopUp from "@/lib/tools/handleLogRegPopUp";
import { AvatarSizeInput } from "@/lib/types/utilitisesType";
type Iprops = {
    authorId: number
    commentList: CommentData[],
    size: AvatarSizeInput,
    userAvatar: string,
}

const CommentModule: FC<Iprops>  = ( {authorId = -1, commentList = [], size= 50, userAvatar="/"} ) => {

    // Reducers
    const { authorized } = useSelector(
        (store: RootState) => store.auth
    )
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )

    // Sort State
    const [currentSort, setCurrentSort] = useState<"like"|"date">("like")
    const [sortedList, setSortedList] = useState<CommentData[]>(commentList)

    // Handle LorReg Popup
    const { handleLogReg } = useHandleLogRegPopUp()

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
                    <h3>
                        <span>{numberReducerFormat(commentList.length)}</span>
                        {commentList.length > 1 ? languageList[currentLanguage].contentType.comment.plural : 
                        languageList[currentLanguage].contentType.comment.singular}
                    </h3>
                    <div className="comment-sort-button">
                        <p>{languageList[currentLanguage].button.sortBy} :</p>
                        <button 
                            className={`link link-button push-action ${currentSort === "like" ? "sort-selected" : ""}`} 
                            onClick={()=>setCurrentSort("like")}>{languageList[currentLanguage].contentType.like.singular}
                        </button>
                        <button 
                            className={`link link-button push-action ${currentSort === "date" ? "sort-selected" : ""}`} 
                            onClick={()=>setCurrentSort("date")}>{languageList[currentLanguage].contentType.date.singular}
                        </button>
                    </div>
                </div>
                {authorized ? 
                <ReplyLike 
                    id={authorId} 
                    type="image" 
                    url={userAvatar} 
                    like={0} 
                    displayLike={false} 
                    allowToggleReplyDisplay={false}
                /> : 
                <button 
                    className="button-cta-reverse button-big push-action" 
                    onClick={()=>handleLogReg("log")}
                    onKeyDown={()=>handleLogReg("log")}
                >{languageList[currentLanguage].button.logIn}</button>
                }
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