import { RootState } from "@/lib/reducers/store";
import { useEffect, useState, type FC } from "react";
import { useSelector } from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import FullScreenImage from "./FullScreenImage";

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
            {fullScreenDisplayed === "log-reg" ? <></> : <></>}
            {fullScreenDisplayed === "user-description" ? <></> : <></>}
        </div>
    )
}

export default FullScreenComponent