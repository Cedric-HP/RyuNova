import "../../styles/user_interface.scss"
import { type FC } from "react";
import CommentA from "./Comment";
type Iprops = {
    idList: number[],
    size: number,
}

const CommentList: FC<Iprops>  = ( {idList= [], size= 50} ) => {
    return (
        <>  
            <div className="comment-list">
                {idList.map((item, index)=> <CommentA id={item} size={size} key={`Comment_id:${item}_${index}`}/>)}
            </div>
        </>
    )
}

export default CommentList