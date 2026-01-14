import { AppDispatch, RootState } from "@/lib/reducers/store";
import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/components/custom_selectors_components/custom-selectors-display.scss"
import setCustomSelectorAction from "@/lib/reducers/utilitisesReducer/actions/setCustomSelectorAction";
import { useRouter } from "next/navigation";
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import getLogoutAction from "@/lib/reducers/authSliceReducer/actions/logReg/getLogoutAction";
import languageList from "@/lib/language";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUpload, faUser} from '@fortawesome/free-solid-svg-icons'
import { setImageUploadCategoryAction } from "@/lib/reducers/authSliceReducer/authSlice";

const CustomSelectorUserComponent: FC  = () => {

    // Reducers
    const { userData, accessToken } = useSelector(
        (store: RootState) => store.auth
    )
    const { customSelectorDisplayed, currentLanguage } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Router
    const router = useRouter()

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
        <div className={`select-container select-user ${customSelectorDisplayed === "user" ? "custom-select-appear" : "custom-select-disappear"}`}>
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
        </div>
    )
}

export default CustomSelectorUserComponent