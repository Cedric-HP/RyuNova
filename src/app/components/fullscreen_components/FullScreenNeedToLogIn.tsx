/* eslint-disable @next/next/no-img-element */
import { AppDispatch, RootState } from "@/lib/reducers/store";
import { type FC } from "react";
import { useDispatch, useSelector} from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import languageList from "@/lib/language";
import setLogRegAction from "@/lib/reducers/utilitisesReducer/actions/setLogRegAction";

const FullScreenNeedToLogIn: FC  = () => {
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    const handleLogReg = () => {
        dispatch(setLogRegAction("log"))
        dispatch(setFullScreenAction("log-reg"))
    }
    return ( 
        <>  
            <div className="full-screen-button" onClick={()=>dispatch(setFullScreenAction(""))}></div>
            <div className="full-screen-popup full-screen-need-to-login">
                <p>{languageList[currentLanguage].message.notification.needToBeConnected}</p>
                <button
                    className="button-normal button-cta push-action"
                    onClick={handleLogReg}
                    onKeyDown={handleLogReg}
                >
                    {languageList[currentLanguage].button.logIn}
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