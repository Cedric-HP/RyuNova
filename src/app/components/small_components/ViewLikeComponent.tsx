import { numberReducerFormat } from "@/lib/tools/stringTools";
import "../../../styles/components/small_components/view_like_component.scss"
import { type FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye} from '@fortawesome/free-solid-svg-icons'
type Iprops = {
    type: "view" | "like",
    ammout: number
}

const ViewLikeComponent: FC<Iprops>  = ( {type="view", ammout=0} ) => {
    return (
        <>  
            <div className="view-like-container">
                <span>{numberReducerFormat(ammout)}</span>
                {type === "like" ? <>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M2 11a2 2 0 0 1 2-2h3v12H4a2 2 0 0 1-2-2v-8z"/>
                    <path d="M9 9V4a2 2 0 1 1 4 0v5h5.5a2 2 0 0 1 2 2.4l-1.3 6.5a2 2 0 0 1-2 1.6H9V9z"/>
                </svg>
                </> : <>
                    <FontAwesomeIcon icon={faEye} />
                </>}
            </div>
        </>
    )
}

export default ViewLikeComponent