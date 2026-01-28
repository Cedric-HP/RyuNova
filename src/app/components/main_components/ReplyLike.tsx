"use client"
import { CommentContentTypeInput } from "@/lib/types/utilitisesType";
import "../../../styles/components/main_components/comment_style.scss"
import { useCallback, useEffect, useMemo, useRef, useState, type FC } from "react";
import Avatar from "../small_components/Avatar";
import languageList from "@/lib/language";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import postCommentAction from "@/lib/reducers/authSliceReducer/actions/content/postCommentAction";
import LikeButton from "../small_components/LikeButton";
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
const userName = "HYPERNOVA GBX"
type Iprops = {
    contentId: number,
    targetComment: number,
    contentType: CommentContentTypeInput,
    like: number,
    displayLike: boolean,
    allowToggleReplyDisplay: boolean
}

const ReplyLike: FC<Iprops>  = ( {contentId= -1, displayLike= false, like= 0, allowToggleReplyDisplay= false, contentType="image", targetComment=0} ) => {

    // Reducers
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const { userData, postComment, accessToken, authorized  } = useSelector(
        (store: RootState) => store.auth
    )
    const dispatch: AppDispatch = useDispatch()
    const textareaElement = useRef<HTMLSpanElement | null>(null)

    const [displayReply, setTDisplayReply] = useState<boolean>(!allowToggleReplyDisplay)
    const [displayButton, setTDisplayButton] = useState<boolean>(allowToggleReplyDisplay)
    const [commentInput, setCommentInput] = useState<string>("")
    const [isPlaceholder, setIsPlaceholder] = useState(true)

    const PLACEHOLDER = useMemo(()=> languageList[currentLanguage].button.addComment + "...", [currentLanguage])

    const imageSize = useMemo(()=> { 
        return allowToggleReplyDisplay ? 30 : displayButton ? 50 : 30
    },[allowToggleReplyDisplay, displayButton])

    const handleToggleDisplayReply = useCallback((set: boolean)=>{
        if(!allowToggleReplyDisplay)
            setTDisplayReply(true)
        else {
            if (authorized !== true)
                return dispatch(setFullScreenAction("need-to-login"))
            setTDisplayReply(set)
        }     
    },[allowToggleReplyDisplay, authorized, dispatch])

    const handleToggleDisplayButton = useCallback((set: boolean)=>{
        if(allowToggleReplyDisplay)
            setTDisplayButton(true)
        else {
            if (set)
                if (textareaElement.current) 
                    if (textareaElement.current.textContent === PLACEHOLDER) 
                        setIsPlaceholder(false) 
            setTDisplayButton(set)
        }
    },[PLACEHOLDER, allowToggleReplyDisplay])

    const removeSpanContent = useCallback(() => {
        if (displayButton && !allowToggleReplyDisplay) {
            setIsPlaceholder(true)
        }    
        else {
            setIsPlaceholder(false)
        }
        setCommentInput("")         
    },[allowToggleReplyDisplay, displayButton])

    const handleSend = useCallback(()=>{
        dispatch(postCommentAction({
            comment: commentInput, 
            contentId: contentId, 
            contentType: 
            contentType, 
            isReply: allowToggleReplyDisplay, 
            targetCommentId: targetComment,
            token: accessToken}))
            handleToggleDisplayReply(false)
            handleToggleDisplayButton(false)
            removeSpanContent()
    },[accessToken, allowToggleReplyDisplay, commentInput, contentId, contentType, dispatch, handleToggleDisplayButton, handleToggleDisplayReply, removeSpanContent, targetComment])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement >)=>{
        const input = String(e.target.innerHTML).replaceAll("<br>", "\n")
        setCommentInput(input)
    }

    const handleCancel = useCallback(() => {
        handleToggleDisplayReply(false)
        handleToggleDisplayButton(false)
        removeSpanContent()
    },[handleToggleDisplayButton, handleToggleDisplayReply, removeSpanContent])

    useEffect(()=>{
        if (isPlaceholder) {
            if (textareaElement.current)
                textareaElement.current.textContent = PLACEHOLDER
        }    
        else {
            if (textareaElement.current) {
                textareaElement.current.textContent = ""
            }
        }       
    },[PLACEHOLDER, isPlaceholder])

    useEffect(()=>{
        if (displayButton && allowToggleReplyDisplay)
            setIsPlaceholder(false)
    },[allowToggleReplyDisplay, displayButton])

    return (
        <>
        <div className="like-reply-section">
            {/* Like Section */}
            {displayLike ? <>
                <div className="like-reply">
                <LikeButton targetId={targetComment} type={"comment"} likeNumber={like}/>
                <button className="comment-button link push-action" onClick={()=> handleToggleDisplayReply(true)}>{languageList[currentLanguage].button.respond}</button>
            </div>
            </> : <></>}
            {/* Reply / Add Comment Section*/}
            {displayReply ? <>
            <div className="reply">
                <div className="avatar-image" style={{width: imageSize, height: imageSize, maxHeight: imageSize, maxWidth: imageSize}}>
                    <Avatar url={userData.avatarUrl} name={userName} size={imageSize}/>
                </div>
                <div className="reply-main">
                    <span 
                        ref={textareaElement}
                        id={`textarea_${contentId}_${contentType}`} 
                        className={`textarea ${isPlaceholder ? "placeholder" : ""}`}
                        role="textbox" 
                        onFocus={()=>handleToggleDisplayButton(true)} 
                        contentEditable
                        onInput={handleInput}
                    >
                    </span>
                    <hr className="section-separator"/>
                    {displayButton ? <>
                    <div className="button-reply">
                        <button 
                            className="button-normal button-cta-reverse push-action" 
                            onClick={()=> handleCancel()}
                        >
                            {languageList[currentLanguage].button.cancel}
                        </button>
                        <button 
                            className="button-normal button-cta push-action" 
                            disabled={commentInput.replaceAll("\n" ,"") === "" ? true : false} 
                            onClick={()=> handleSend()}
                        >
                            {allowToggleReplyDisplay ? languageList[currentLanguage].button.respond : languageList[currentLanguage].button.addComment}
                        </button>
                    </div>
                    </>:<></>}
                </div>
            </div>
        </> : <></>}
        </div>
        </>
    )
}

export default ReplyLike

