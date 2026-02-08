import { CommentData, ContentData } from "@/lib/types/contenteType";
import "../../../styles/components/main_components/comment_style.scss"
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import CommentInfo from "./CommentInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { defaultComment, defaultContent } from "@/lib/tools/DefaultValues";
import Avatar from "../small_components/Avatar";
import languageList from "@/lib/language";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import { AvatarSizeInput, CommentContentTypeInput } from "@/lib/types/utilitisesType";
import getCommentAction from "@/lib/reducers/authSliceReducer/actions/content/getCommentAction";
import { setCommentType, setDoPushAction } from "@/lib/reducers/authSliceReducer/authSlice";
type Iprops = {
    size: AvatarSizeInput,
    commentData: CommentData,
    contentType: CommentContentTypeInput,
    currentContent: ContentData
}

const Comment: FC<Iprops>  = ( {size= 50, commentData= defaultComment, contentType="image", currentContent = defaultContent} ) => {

    // Reducers
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const { getComment  } = useSelector(
        (store: RootState) => store.auth
    )
    const dispatch: AppDispatch = useDispatch()
    const [displayReplies, setDisplayReplies] = useState<boolean>(false)
    const [canFetch, setCanFetch] = useState<boolean>(false)
    const [limit, setLimit] = useState<number>(1)
    const replyList = useMemo(()=>currentContent.commentList.filter((item)=>item.targetCommentId === commentData.id),[commentData.id, currentContent.commentList]) 


    useEffect(()=>{
        if (displayReplies && replyList.length < commentData.parentReply)
            return setCanFetch(true)
        setCanFetch(false)
    },[commentData.parentReply, displayReplies, replyList.length])

    useEffect(()=>{
        if (canFetch){
                dispatch(setDoPushAction(true))
            dispatch(setCommentType({
                reducer: "get",
                type: contentType
            }))
            dispatch(getCommentAction({
                id: commentData.id,
                limit: limit,
                sort: "date",
                type:"comment",
                order: "ASC"
            }))
        }
    },[canFetch, commentData.id, contentType, dispatch, limit])
    
    return (
        <>  
            {commentData.id !== -1 ? <>
            <div className="comment">
                <div className="comment-top-part">
                    <div className="comment-avatar">
                        <div className="avatar-image" style={{width: size, height: size, maxHeight: size, maxWidth: size}}>
                            <Link className="push-action" href={`/profile/${commentData.userId}`} >
                                <Avatar url={commentData.url} name={commentData.userName} size={size}/>
                            </Link>
                        </div>
                         {commentData.parentReply > 0 ? <>
                        <div 
                            className="reply-segment-container"
                            style={{width: size + "px", maxWidth: size + "px"}}
                        >
                            <div className="reply-segment-main"></div>
                        </div>
                        </>:<></>}
                    </div>
                    <div className="comment-main">
                        <CommentInfo 
                            commentId={commentData.id}
                            contentId={currentContent.id}
                            name={commentData.userName} 
                            date={commentData.createdAt} 
                            comment={commentData.comment}
                            like={commentData.likes}
                            contentType={contentType}
                        />
                    </div>
                </div>
                {commentData.parentReply > 0 ? <>
                <div className="comment-bottom-part">
                    {displayReplies ? <>
                    {replyList.map((item, index)=>{
                        return (
                            <div className="reply-comment" key={`reply_id:${item}_${index}`}>
                                <div className="reply-aria-line">
                                    <div 
                                        className="reply-segment-container" 
                                        style={{width: size + "px", maxWidth: size + "px"}}
                                    >
                                        <div className="reply-segment-top"></div>
                                        <div className="reply-segment-main"></div>
                                    </div>
                                </div>
                                <Comment
                                    size={30}
                                    commentData={item}
                                    contentType={contentType}
                                    currentContent={currentContent}
                                />
                            </div>
                        )
                    })}
                    </>:<></>}
                    <div className="reply-show-section">
                        <div 
                            className="reply-segment-container" 
                            style={{width: size + "px", maxWidth: size + "px"}}
                        >
                            <div className="reply-segment-top"></div>
                        </div>
                        {!displayReplies && 
                        <button className="push-action reply-show-button button-simple" onClick={()=> setDisplayReplies(true)}>
                                <span>{commentData.totalReply}</span>
                                <p>
                                    {commentData.totalReply > 1 ?  
                                        languageList[currentLanguage].contentType.reply.plural : 
                                        languageList[currentLanguage].contentType.reply.singular
                                    }
                                </p>
                                <FontAwesomeIcon icon={faAngleDown} />
                        </button>}
                        {(displayReplies && replyList.length < commentData.parentReply) &&
                        <button className="push-action reply-show-button button-simple" onClick={()=> setLimit((prevState)=> prevState + 1)}>

                                <span>{commentData.totalReply - replyList.length}</span>
                                <p>
                                    {commentData.totalReply - replyList.length > 1 ?  
                                        languageList[currentLanguage].contentType.reply.plural : 
                                        languageList[currentLanguage].contentType.reply.singular
                                    }
                                </p>
                                <FontAwesomeIcon icon={faAngleDown} />
                        </button>}
                        {(displayReplies && replyList.length >= commentData.parentReply) &&
                        <button className="push-action reply-show-button button-simple" onClick={()=> setDisplayReplies(false)}>
                            <>
                                <p>
                                    {commentData.totalReply > 1 ?  
                                        `${languageList[currentLanguage].button.hide.plural} ${languageList[currentLanguage].contentType.reply.plural}` : 
                                        `${languageList[currentLanguage].button.hide.singular} ${languageList[currentLanguage].contentType.reply.singular}`
                                    }
                                </p>
                                <FontAwesomeIcon icon={faAngleUp} />
                            </>
                        </button>}
                    </div>
                </div>
                </> : <></>}
            </div>
            </>: <></>}
        </>
    )
}

export default Comment