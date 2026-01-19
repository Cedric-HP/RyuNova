import { CommentData } from "@/lib/types/contenteType";
import "../../../styles/components/main_components/comment_style.scss"
import Link from "next/link";
import { useState, type FC } from "react";
import CommentInfo from "./CommentInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { defaultComment } from "@/lib/tools/DefaultValues";
import Avatar from "../small_components/Avatar";
import languageList from "@/lib/language";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/store";
import { AvatarSizeInput } from "@/lib/types/utilitisesType";
type Iprops = {
    id: number,
    size: AvatarSizeInput,
    userAvatar: string,
    commentList: CommentData[]
}

const Comment: FC<Iprops>  = ( {id= -1, size= 50, userAvatar="/", commentList=[]} ) => {
    // Reducers
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    
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
                                <Avatar url={commenData.url} name={commenData.userName} size={size}/>
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
                        return (
                            <div className="reply-comment" key={`reply_id:${item}_${index}`}>
                                <div className="reply-aria-line">
                                    <div className="reply-segment-container">
                                        <div className="reply-segment-top"></div>
                                        <div className="reply-segment-main"></div>
                                    </div>
                                </div>
                                <Comment id={item.id} size={size} commentList={commentList} userAvatar={userAvatar}/>
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
                                <p>
                                    {commenData.replyList.length > 1 ?  
                                        `${languageList[currentLanguage].button.hide.plural} ${languageList[currentLanguage].contentType.reply.plural}` : 
                                        `${languageList[currentLanguage].button.hide.singular} ${languageList[currentLanguage].contentType.reply.singular}`
                                    }
                                </p>
                                <FontAwesomeIcon icon={faAngleUp} />
                            </>
                            :
                            <>
                                <span>{commenData.replyList.length}</span>
                                <p>
                                    {commenData.replyList.length > 1 ?  
                                        languageList[currentLanguage].contentType.reply.plural : 
                                        languageList[currentLanguage].contentType.reply.singular
                                    }
                                </p>
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