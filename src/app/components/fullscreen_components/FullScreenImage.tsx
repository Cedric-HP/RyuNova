/* eslint-disable @next/next/no-img-element */
import { AppDispatch, RootState} from "@/lib/reducers/store";
import { useState, type FC } from "react";
import { useDispatch, useSelector} from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ImageUrl } from "@/lib/tools/stringTools";

const FullScreenImage: FC  = () => {
    const { currentImage } = useSelector(
        (store: RootState) => store.auth
    )
    const dispatch: AppDispatch = useDispatch()
    const [fullScreenLimit, setFullScreenLimit] = useState<boolean>(true)
    return ( 
        <>
            <div className="full-screen-button" onClick={()=>dispatch(setFullScreenAction(""))}></div>
            <img 
                className={fullScreenLimit ? "image-full image-full-limit appear" : "image-full appear"} 
                src={ImageUrl(currentImage.url, "full")} 
                alt={`${currentImage.title}_by_${currentImage.author}`} 
                onClick={()=>setFullScreenLimit((prevState)=>!prevState)}
            />
            <button className="full-screen-xmark"
                onClick={()=>dispatch(setFullScreenAction(""))}
                onKeyDown={()=>dispatch(setFullScreenAction(""))}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </>
    )
}

export default FullScreenImage