/* eslint-disable @next/next/no-img-element */
import { CommentData } from "@/lib/types/contenteType";
import "../../styles/comment_style.scss"
import Link from "next/link";
import { useState, type FC } from "react";
import CommentInfo from "./CommentInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { defaultComment } from "@/lib/tools/DefaultValues";
type Iprops = {
    id: number,
    size: number,
    userAvatar: string,
    commentList: CommentData[]
}

const Comment: FC<Iprops>  = ( {id= -1, size= 50, userAvatar="/", commentList=[]} ) => {

    const commenData: CommentData = commentList.find((item)=> item.id === id) || defaultComment
    const [displayReplies, setDisplayReplies] = useState<boolean>(false)
    return (
        <>  
            {commenData.id !== -1 ? <>
            <div className="comment">
                <div className="comment-top-part">
                    <div className="comment-avatar">
                        <div className="avatar-image" style={{width: size, height: size, maxHeight: size, maxWidth: size}}>
                            <Link className="push-action" href={`/profile/${commenData.userId}`} >
                                <img src={commenData.url} alt={`${commenData.userName}`}/>
                            </Link>
                        </div>
                         {commenData.replyList.length > 0 ? <>
                        <div className="reply-segment-container">
                            <div className="reply-segment-main"></div>
                        </div>
                        </>:<></>}
                    </div>
                    <div className="comment-main">
                        <CommentInfo 
                            id={commenData.id} 
                            name={commenData.userName} 
                            date={commenData.createdAt} 
                            comment={commenData.comment}
                            like={commenData.likes}
                            userAvatar={userAvatar}
                        />
                    </div>
                </div>
                {commenData.replyList.length > 0 ? <>
                <div className="comment-bottom-part">
                    {displayReplies ? <>
                    {commenData.replyList.map((item, index)=>{
                        console.log(commenData.replyList)
                        return (
                            <div className="reply-comment" key={`reply_id:${item}_${index}`}>
                                <div className="reply-aria-line">
                                    <div className="reply-segment-container">
                                        <div className="reply-segment-top"></div>
                                        <div className="reply-segment-main"></div>
                                    </div>
                                </div>
                                <Comment id={item} size={size} commentList={commentList} userAvatar={userAvatar}/>
                            </div>
                        )
                    })}
                    </>:<></>}
                    <div className="reply-show-section">
                        <div className="reply-segment-container">
                            <div className="reply-segment-top"></div>
                        </div>
                        <button className="push-action reply-show-button button-simple" onClick={()=> setDisplayReplies((prevState)=>!prevState)}>
                            {displayReplies ?
                            <>
                                {commenData.replyList.length > 1 ? <p>Hide Replies</p>:<p>Hide Reply</p>}
                                <FontAwesomeIcon icon={faAngleUp} />
                            </>
                            :
                            <>
                                <span>{commenData.replyList.length}</span>
                                {commenData.replyList.length > 1 ? <p>Replies</p>:<p>Reply</p>}
                                <FontAwesomeIcon icon={faAngleDown} />
                            </>}
                        </button>
                    </div>
                </div>
                </> : <></>}
            </div>
            </>: <></>}
        </>
    )
}

export default Comment