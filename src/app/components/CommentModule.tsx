import "../../styles/comment_style.scss"
import { type FC } from "react";
import Comment from "./Comment";
import { CommentData } from "@/lib/types/contenteType";
import ReplyLike from "./ReplyLike";
type Iprops = {
    authorId: number
    commentList: CommentData[],
    size: number,
    userAvatar: string,
}

const CommentModule: FC<Iprops>  = ( {authorId = -1, commentList = [], size= 50, userAvatar="/"} ) => {
    return (
        <>  
            <section className="comment-section">
                <div className="info-sort-button">
                    <h3><span>{commentList.length}</span>{commentList.length > 1 ? <p>Comments</p>: <p>Comment</p>}</h3>
                    <div className="comment-sort-button">
                        <p>Sort By :</p>
                        <button className="link link-button push-action">Date</button>
                        <button className="link link-button push-action">View</button>
                    </div>
                </div>
                <ReplyLike id={authorId} type="image" url={userAvatar} like={0} displayLike={false} allowToggleReplyDisplay={false}/>
                <div className="comment-list">
                    {commentList
                        .filter((item)=> item.isReply === false)
                        .map((item, index)=> 
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