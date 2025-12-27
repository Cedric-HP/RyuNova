import "../../../styles/components/small_components/view_like_component.scss"
import { type FC } from "react";
import ViewLikeComponent from "./ViewLikeComponent";
type Iprops = {
    view: number,
    like: number,
}

const ViewLikeBundle: FC<Iprops>  = ( {view=0, like=0} ) => {
    return (
        <>  
            <div className="view-like-bundle">
                <ViewLikeComponent type={"view"} ammout={view}/>
                <ViewLikeComponent type={"like"} ammout={like}/>
            </div>
        </>
    )
}

export default ViewLikeBundle