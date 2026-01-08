import { RootState } from "@/lib/reducers/store";
import { useEffect, useState, type FC } from "react";
import { useSelector } from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import FullScreenImage from "./FullScreenImage";
import FullScreenLogReg from "./FullScreenLogReg";

const FullScreenComponent: FC  = () => {
    const { fullScreenDisplayed } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const [appear, setAppear] = useState<string>("")

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
            {fullScreenDisplayed === "image-upload" ? <></> : <></>}
        </div>
    )
}

export default FullScreenComponent