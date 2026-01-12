/* eslint-disable @next/next/no-img-element */
import { AppDispatch } from "@/lib/reducers/store";
import { type FC } from "react";
import { useDispatch} from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../Navbar";
import languageList from "@/lib/language";

const FullScreenNeedToLogIn: FC  = () => {
    const dispatch: AppDispatch = useDispatch()
    // Language Context
        const { language } = useGlobalContext()
    return ( 
        <>
            <div className="full-screen-button" onClick={()=>dispatch(setFullScreenAction(""))}></div>
            <div className="full-screen-popup full-screen-image-upload">
                <p>You need to be conneted!</p>
                <button
                    className="button-normal button-cta push-action"
                    onClick={()=>dispatch(setFullScreenAction(""))}
                    onKeyDown={()=>dispatch(setFullScreenAction(""))}
                >
                    {languageList[language].button.logIn}
                </button>
                <button className="full-screen-xmark"
                    onClick={()=>dispatch(setFullScreenAction(""))}
                    onKeyDown={()=>dispatch(setFullScreenAction(""))}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            
        </>
    )
}

export default FullScreenNeedToLogIn