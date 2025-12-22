/* eslint-disable @next/next/no-img-element */
import { TypeImput } from "@/lib/types/contenteType";
import "../../styles/user_interface.scss"
import { useCallback, useState, type FC } from "react";
type Iprops = {
    id: number,
    type: TypeImput,
    url: string,
    like: number,
    displayLike: boolean,
    allowToggleReplyDisplay: boolean
}

const ReplyLike: FC<Iprops>  = ( {id= -1, type = "image", url = "url", displayLike= false, like= 0, allowToggleReplyDisplay= false} ) => {
    const textareaElement = document.getElementById(`textarea_${id}_${type}`)
    const [displayReply, setTDisplayReply] = useState<boolean>(type === "user" ? false : true)
    const [displayButton, setTDisplayButton] = useState<boolean>(type === "user" ? true : false)
    const [commentInput, setCommentInput] = useState<string>("")
    const [testLike, setTestLike] = useState<boolean>(false)

    const handleToggleDisplayReply = useCallback((set: boolean)=>{
        if(!allowToggleReplyDisplay)
            setTDisplayReply(true)
        else
            setTDisplayReply(set)
    },[allowToggleReplyDisplay])

    const handleToggleDisplayButton = useCallback((set: boolean)=>{
        if(allowToggleReplyDisplay)
            setTDisplayButton(true)
        else {
            if (set)
                if (textareaElement !== undefined && textareaElement !== null)
                    if (textareaElement.innerHTML === `<p>Ajoutez un commentaire…</p>`)
                        textareaElement.innerHTML = ``
            setTDisplayButton(set)
        }
    },[allowToggleReplyDisplay, textareaElement])

    const removeSpanContent = useCallback(() => {
        if (textareaElement !== undefined && textareaElement !== null)
            if (displayButton && type !== "user")
                textareaElement.innerHTML = `<p>Ajoutez un commentaire…</p>`
            else
                textareaElement.innerHTML = ``
    },[displayButton, textareaElement, type])

    const handleSend = useCallback(()=>{
        console.log({input: commentInput})
        handleToggleDisplayReply(false)
        removeSpanContent()
    },[commentInput, handleToggleDisplayReply, removeSpanContent])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement >)=>{
        const input = String(e.target.innerHTML).replaceAll("<br>", "\n")
        setCommentInput(input)
    }

    const handleCancel = useCallback(() => {
        handleToggleDisplayReply(false)
        handleToggleDisplayButton(false)
        removeSpanContent()
    },[handleToggleDisplayButton, handleToggleDisplayReply, removeSpanContent])

    return (
        <>
        <div className="like-reply-section">
            {/* Like Section */}
            {displayLike ? <>
                <div className="like-reply">
                <button className="comment-like" onClick={()=> setTestLike((prevstate)=>!prevstate)}>
                    {testLike ? <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M2 11a2 2 0 0 1 2-2h3v12H4a2 2 0 0 1-2-2v-8z"/>
                        <path d="M9 9V4a2 2 0 1 1 4 0v5h5.5a2 2 0 0 1 2 2.4l-1.3 6.5a2 2 0 0 1-2 1.6H9V9z"/>
                    </svg>
                    </> : <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M14 4c0-1.1-.9-2-2-2s-2 .9-2 2v5"/>
                        <path d="M10 9h7.5a2 2 0 0 1 2 2.4l-1.2 6.5a2 2 0 0 1-2 1.6H8"/>
                        <path d="M6 9H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>
                    </svg>
                    </>}
                    <span>
                        {testLike ? `${like + 1}` : `${like}`}
                    </span>
                </button>
                <button className="link push-action" onClick={()=> handleToggleDisplayReply(true)}>Reply</button>
            </div>
            </> : <></>}
            {/* Reply / Add Comment Section*/}
            {displayReply ? <>
            <div className="reply">
                <img src={url} alt={`User Avatar`} height={type === "user" ? 30 : displayButton ? 50 : 30}/>
                <div className="reply-main">
                    <span 
                        id={`textarea_${id}_${type}`} 
                        className="textarea" 
                        role="textbox" 
                        onFocus={()=>handleToggleDisplayButton(true)} 
                        contentEditable onInput={handleInput}
                    >
                    </span>
                    <hr className="section-separator"/>
                    {displayButton ? <>
                    <div className="button-reply">
                        <button 
                            className="link push-action" 
                            onClick={()=> handleCancel()}
                        >
                            Cancel
                        </button>
                        <button 
                            className="link push-action" 
                            disabled={commentInput.replaceAll("\n" ,"") === "" ? true : false} 
                            onClick={()=> handleSend()}
                        >
                            {type === "user" ? "Reply" : "Add Comment"}
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