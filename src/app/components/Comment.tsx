/* eslint-disable @next/next/no-img-element */
import { CommentData } from "@/lib/types/contenteType";
import "../../styles/user_interface.scss"
import Link from "next/link";
import { useState, type FC } from "react";
import { fecthFinderComment } from "@/lib/tools/usefecth";
import CommentInfo from "./CommentInfo";
type Iprops = {
    id: number,
    size: number
}

const defaultComment: CommentData = {
    id: -1,
    userId: -1,
    comment: "",
    createdAt: "",
    likes: 0,
    replyList: [],
    url: "",
    userName: ""
}

const CommentA: FC<Iprops>  = ( {id= -1, size= 50} ) => {
    const commenData: CommentData = fecthFinderComment(id, "comment") || defaultComment
    return (
        <>  
            {commenData.id !== -1 ? <>
            <div className="comment">
                <div className="comment-avatar">
                    <Link className="push-action" href={`/profile/${commenData.userId}`}>
                        <img src={commenData.url} alt={`${commenData.userName}`} height={size}/>
                    </Link>
                </div>
                <div className="comment-main">
                    <CommentInfo id={commenData.id} 
                            name={commenData.userName} 
                            date={commenData.createdAt} 
                            comment={commenData.comment}
                            like={commenData.likes}
                        />
                </div>
            </div>
            </>: <></>}
        </>
    )
}

export default CommentA