import "../../../styles/components/main_components/comment_style.scss"
import { useEffect, useMemo, useState, type FC } from "react";
import Comment from "./Comment";
import { CommentData } from "@/lib/types/contenteType";
import ReplyLike from "./ReplyLike";
import { numberReducerFormat } from "@/lib/tools/stringTools";
import languageList from "@/lib/language";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import useHandleLogRegPopUp from "@/lib/tools/handleLogRegPopUp";
import { AvatarSizeInput, CommentContentTypeInput, OrderInput } from "@/lib/types/utilitisesType";
import getCommentAction from "@/lib/reducers/authSliceReducer/actions/content/getCommentAction";
import { setCommentType, setDoPushAction } from "@/lib/reducers/authSliceReducer/authSlice";
import LoadingComponent from "../small_components/LoadingComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
type Iprops = {
    size: AvatarSizeInput,
    contentType: CommentContentTypeInput
}

const CommentModule: FC<Iprops>  = ( { size= 50, contentType="image" } ) => {

    // Reducers
    const { authorized, currentImage, getComment } = useSelector(
        (store: RootState) => store.auth
    )
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()
    const currentContent = useMemo(()=> contentType === "image" ? currentImage : currentImage,[contentType, currentImage])

    // Sort State
    const [currentSort, setCurrentSort] = useState<"like"|"date">("like")
    const [sortedList, setSortedList] = useState<CommentData[]>([])

    // Limite
    const [limit, setLimit] = useState<number>(1)

    // Order
    const [currentOrder, setCurrentOrder] = useState<OrderInput>("DESC")

    // Handle LorReg Popup
    const { handleLogReg } = useHandleLogRegPopUp()

    // Use Effect to filter comment
    useEffect(()=>{
        setSortedList(currentContent.commentList.filter((item)=> item.isReply === false))
    },[currentContent.commentList])

    const handleSort = (newSort: "date" | "like") => {
        if (newSort === currentSort) {
            setCurrentOrder((prevState)=> prevState === "DESC" ? "ASC" : "DESC")
        }
        else {
            setCurrentOrder("DESC") 
            setCurrentSort(newSort)
        }
        dispatch(setDoPushAction(false))
        setLimit(1)
    }

    const handleLimit = () => {
        dispatch(setDoPushAction(true))
        setLimit((prevState)=> prevState + 1)
    }

    useEffect(()=>{
        switch(contentType) {
            case"article":
                break
            case "image":
                dispatch(setCommentType({
                    reducer: "get", 
                    type:"image"
                }))
                dispatch(getCommentAction({
                    sort: currentSort, 
                    id: currentContent.id, 
                    limit: limit, 
                    type: contentType,
                    order: currentOrder
                }))
        }
    },[contentType, currentContent.id, currentOrder, currentSort, dispatch, limit])

    return (
        <>  
            <section className="comment-section">
                <div className="info-sort-button">
                    <h3>
                        <span>{numberReducerFormat(currentImage.totalComment)}</span>
                        {currentImage.totalComment > 1 ? languageList[currentLanguage].contentType.comment.plural : 
                        languageList[currentLanguage].contentType.comment.singular}
                    </h3>
                    <div className="comment-sort-button">
                        <p>{languageList[currentLanguage].button.sortBy} :</p>
                        <button 
                            className={`link link-button push-action ${currentSort === "like" ? "sort-selected" : ""}`} 
                            onClick={()=>handleSort("like")}
                        >
                                {languageList[currentLanguage].contentType.like.singular}
                                {currentSort === "like" && <>
                                {currentOrder === "DESC" ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} />}</>}
                        </button>
                        <button 
                            className={`link link-button push-action ${currentSort === "date" ? "sort-selected" : ""}`} 
                            onClick={()=>handleSort("date")}
                        >
                            {languageList[currentLanguage].contentType.date.singular}
                            {currentSort === "date" && <>
                            {currentOrder === "DESC" ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} />}</>}
                        </button>
                    </div>
                </div>
                {authorized === true ? 
                <ReplyLike 
                    contentId={currentContent.id}
                    contentType={contentType} 
                    targetComment={0}
                    like={0} 
                    displayLike={false} 
                    allowToggleReplyDisplay={false}
                /> : 
                <button 
                    className="button-cta-reverse button-normal push-action" 
                    onClick={()=>handleLogReg("log")}
                    onKeyDown={()=>handleLogReg("log")}
                >{languageList[currentLanguage].button.logIn}</button>
                }
                <div className="comment-list">
                    {sortedList.map((item, index)=> 
                            <Comment 
                                size={size}
                                contentType={contentType}  
                                commentData={item} 
                                key={`Comment_id:${item.id}_${index}`}
                                currentContent={currentContent}
                            />
                        )
                    }
                </div>
                {getComment.fetch.fetchState === "fetching" &&
                <LoadingComponent type="simple" size={100}/>}
                {(currentContent.parentComment > currentContent.commentList.filter((item)=> !item.isReply).length && getComment.fetch.fetchState !== "fetching") &&
                 <button className="push-action reply-show-button button-simple" onClick={handleLimit}>
                    {languageList[currentLanguage].button.seeMore}
                </button>}
            </section>
        </>
    )
}

export default CommentModule