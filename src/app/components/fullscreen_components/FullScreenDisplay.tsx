import { RootState } from "@/lib/reducers/store";
import { useEffect, useState, type FC } from "react";
import { useSelector } from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import FullScreenImage from "./FullScreenImage";
import FullScreenLogReg from "./FullScreenLogReg";
import FullScreenImageUpload from "./FullScreenImageUpload";
import FullScreenNeedToLogIn from "./FullScreenNeedToLogIn";

const FullScreenComponent: FC  = () => {

    // Reducer
    const { fullScreenDisplayed } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const [appear, setAppear] = useState<string>("")

    // Hide the component if fullScreenDisplayed is set to empty
    useEffect(()=>{
        if(fullScreenDisplayed !== "")  
            setAppear("full-screen-appear")
        else
            setAppear("full-screen-disappear")
    },[fullScreenDisplayed])
    
    return (
        <div className={`full-screen ${appear}`} >
            {fullScreenDisplayed === "image" ? <FullScreenImage/> : <></>}
            {fullScreenDisplayed === "log-reg" ? <FullScreenLogReg/> : <></>}
            {fullScreenDisplayed === "user-description" ? <></> : <></>}
            {fullScreenDisplayed === "image-upload" ? <FullScreenImageUpload/>  : <></>}
            {fullScreenDisplayed === "need-to-login" ? <FullScreenNeedToLogIn/>  : <></>}
            {/* {fullScreenDisplayed === "user-update" ? <FullScreenUserUpdate/>  : <></>} */}
            {/* {fullScreenDisplayed === "user-delete" ? <FullScreenUserDelete/>  : <></>} */}
            {/* {fullScreenDisplayed === "image-update" ? <FullScreenImageUpdate/>  : <></>} */}
            {/* {fullScreenDisplayed === "image-delete" ? <FullScreenImageDelete/>  : <></>} */}
        </div>
    )
}

export default FullScreenComponent