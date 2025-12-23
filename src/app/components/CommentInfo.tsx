import "../../styles/comment_style.scss"
import { useState, type FC } from "react";
import LongTextDisplay from "./LongTextDisplay";
import ReplyLike from "./ReplyLike";
type Iprops = {
    id: number,
    userAvatar: string,
    name: string,
    date: string,
    comment: string,
    like: number,
}
const CommentInfo: FC<Iprops>  = ( {id= -1, name = "title", date = "1/1/2000, 0:00:00 AM", comment = "Comment here", like = 0, userAvatar="/"} ) => {
    const [displayFull, setTDisplayFull] = useState<boolean>(false)
    
    const commentLenght = comment.length
    return (
        <>  
            <div className="user-tile comment-user">
                <div className="user-info-row">
                    <h3>{name}</h3>
                    <span>{date}</span>
                </div>
                {commentLenght > 200 ? <>
                <LongTextDisplay text={comment} sizeCute={200} displayFull={displayFull}/>
                <button className="link push-action" onClick={()=>setTDisplayFull((prevState)=> !prevState)}>{displayFull ? "See less" : "See more"}</button>
                </> : <>
                    <div className="text-section">
                        <p>{comment}</p>
                    </div>
                </>}
                <ReplyLike id={id} type="user" url={userAvatar} like={like} displayLike={true} allowToggleReplyDisplay={true} />
            </div>
        </>
    )
}

export default CommentInfo