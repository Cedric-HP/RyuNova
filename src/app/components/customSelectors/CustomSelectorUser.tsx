import { AppDispatch, RootState } from "@/lib/reducers/store";
import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/components/custom_selectors_components/custom-selectors-display.scss"
import setCustomSelectorAction from "@/lib/reducers/utilitisesReducer/actions/setCustomSelectorAction";
import { useRouter } from "next/navigation";
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import getLogoutAction from "@/lib/reducers/authSliceReducer/actions/user/getLogoutAction";
import languageList from "@/lib/language";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faStar, faUpload, faUser} from '@fortawesome/free-solid-svg-icons'
import { setImageUploadCategoryAction } from "@/lib/reducers/authSliceReducer/authSlice";
import SwitchComponent from "../small_components/SwitchComponent";
import { CircleFlag } from "react-circle-flags";
import useDisplayParticles from "@/lib/tools/useDisplayParticles";

const CustomSelectorUserComponent: FC  = () => {

    // Reducers
    const { userData, accessToken, authorized } = useSelector(
        (store: RootState) => store.auth
    )
    const { customSelectorDisplayed, currentLanguage, displayParticles } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Router
    const router = useRouter()

    const {handleDisplayParticles} = useDisplayParticles()

    // Handlers
    const handleProfile = () => {
        dispatch(setCustomSelectorAction(""))
        router.push(`/profile/${userData.id}`)
    }
    const handleImageUploadPopUp = () => {
        dispatch(setCustomSelectorAction(""))
        dispatch(setImageUploadCategoryAction("image"))
        dispatch(setFullScreenAction("image-upload"))
    }
     const handleLogOut = () => {
        dispatch(setCustomSelectorAction(""))
        dispatch(getLogoutAction(accessToken))
    }
    return (
        <div className={`select-container select-user ${customSelectorDisplayed.includes("user") && !customSelectorDisplayed.includes("hide") && authorized === true ? "custom-select-appear" : "custom-select-disappear"}`}>
            <ul>
                <li 
                    onClick={handleProfile}
                    onKeyDown={handleProfile}
                >
                    <FontAwesomeIcon icon={faUser} />
                    <p>{languageList[currentLanguage].button.profile}</p>
                </li>
                <li 
                    onClick={handleImageUploadPopUp}
                    onKeyDown={handleImageUploadPopUp}
                >
                    <FontAwesomeIcon icon={faUpload} />
                    <p>{languageList[currentLanguage].button.imageUpload}</p>
                </li>
                <li 
                    onClick={handleLogOut}
                    onKeyDown={handleLogOut}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <p>{languageList[currentLanguage].button.logOut}</p>
                </li>
            </ul>
            <div className="select-user-utils">
                <button
                    className="button-none"
                    onClick={()=> handleDisplayParticles(displayParticles)}
                >
                    <SwitchComponent state={displayParticles}>
                        <FontAwesomeIcon icon={faStar} />
                    </SwitchComponent>
                </button>
                <div id="language-selector" aria-roledescription="listbox">
                    <button 
                        className="link push-action"
                        onClick={()=>dispatch(setCustomSelectorAction("language"))}
                        onKeyDownCapture={()=>dispatch(setCustomSelectorAction("language"))}
                    >   
                        <p>{languageList[currentLanguage].utilities.uniCode}</p>
                        <CircleFlag countryCode={languageList[currentLanguage].utilities.flagKey} height={20}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomSelectorUserComponent