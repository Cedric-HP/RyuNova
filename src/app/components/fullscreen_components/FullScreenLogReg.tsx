import { AppDispatch, RootState} from "@/lib/reducers/store";
import { useEffect, useState, type FC } from "react";
import { useDispatch, useSelector} from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../Navbar";
import languageList from "@/lib/language";

const FullScreenLogReg: FC  = () => {

    // Reducers
    const { accessToken } = useSelector(
        (store: RootState) => store.auth
    )
    const { logReg } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Language Context
    const { language } = useGlobalContext()

    // Use Effect to auto-exit the popup when user is log in
    useEffect(()=>{
        if (accessToken !== "")
            dispatch(setFullScreenAction(""))
    },[accessToken, dispatch])

    // States
    const [canSubmit, setCanSubmit] = useState<boolean>(false)
    const [isNameValid, setIsNameValid] = useState<boolean>(false)
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
    const [isComfPasswordValid, setIsComfPasswordValid] = useState<boolean>(false)

    const handleRegister = (formData: FormData) => {

    }

    return ( 
        <>
            <div className="full-screen-button" onClick={()=>dispatch(setFullScreenAction(""))}></div>
            <button className="full-screen-xmark"
                onClick={()=>dispatch(setFullScreenAction(""))}
                onKeyDown={()=>dispatch(setFullScreenAction(""))}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="full-screen-popup full-screen-lor-reg">
                {logReg === "log" ? <>
                <h2 className="spacing-letter-big glow">{languageList[language].button.logIn}</h2>
                <form action="" onSubmit={()=>handleRegister}>
                    <div className="input-logreg-container">
                        <input name="name" className="base-input" type="text" placeholder="Name"/>
                        <span></span>
                        <p>Message here</p>
                    </div>
                    <div className="input-logreg-container">
                        <span></span>
                    </div>
                    <input name="email" className="base-input" type="email" placeholder="Email"/>
                    <input name="password" className="base-input" type="password" placeholder="Password"/>
                    <input name="confirmePassword" className="base-input" type="password" placeholder="Confirme Password"/>
                    <button type="submit" className={`button-normal button-cta ${canSubmit ? "push-action" : "button-disable"}`} disabled={!canSubmit}>{languageList[language].button.logIn}</button>
                </form>
                </> : <>
                <h2 className="spacing-letter-big glow">{languageList[language].button.signUp}</h2>
                <form action="">
                </form>
                </>}
                <p>URL is : {process.env.SERVER_URL}</p>
            </div>
        </>
    )
}

export default FullScreenLogReg