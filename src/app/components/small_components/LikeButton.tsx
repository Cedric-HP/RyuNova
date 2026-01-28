import { useEffect, useState, type FC } from "react";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import { useDispatch, useSelector } from "react-redux";
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import postLikeAction from "@/lib/reducers/authSliceReducer/actions/content/postLikeAction";
import { numberReducerFormat } from "@/lib/tools/stringTools";
type Iprops = {
    targetId: number,
    type: "image" | "comment" | "article"
    likeNumber: number
}

const LikeButton: FC<Iprops>  = ( { targetId = -1, type= "image", likeNumber=0} ) => {
    
    // Reducers
    const { accessToken, authorized, userData, postLike } = useSelector(
        (store: RootState) => store.auth
    )
    const dispatch: AppDispatch = useDispatch()
    
    const [isLike, setIsLike] = useState<boolean>(false)
    const handleLike= () =>{
        if (accessToken === "" && authorized !== true)
            return dispatch(setFullScreenAction("need-to-login"))
            if(postLike.fetch.fetchState !== "fetching") {
                dispatch(postLikeAction({
                    token: accessToken,
                    id: targetId,
                    type: type
                }))
            }
    }
    useEffect(()=>{
        switch(type){
            case "image": {
                const isLike = userData.imageLiked.find((item)=> item === targetId)
                if (isLike)
                return setIsLike(true)
            }    
            case "article": {
                const isLike = userData.articleLiked.find((item)=> item === targetId)
                if (isLike)
                return setIsLike(true)
            }
            case "comment": {
                const isLike = userData.commentLiked.find((item)=> item === targetId)
                if (isLike)
                return setIsLike(true)
            }   
        }
        setIsLike(false)
    },[targetId, type, userData.articleLiked, userData.commentLiked, userData.following, userData.imageLiked])

    return (
        <>
        {type === "comment" ? <>
        <button className="comment-button comment-like" onClick={handleLike}>
                    {isLike? <>
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
                        {numberReducerFormat(likeNumber)}
                    </span>
                </button>
        </> : <>
        <button className={`button-like ${isLike? "liked" : ""}`} onClick={handleLike}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={isLike ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/>
                </svg>
            <span>{numberReducerFormat(likeNumber)}</span>
        </button>
        </>}
        </> 
    )
}

export default LikeButton