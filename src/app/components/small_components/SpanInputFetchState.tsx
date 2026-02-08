import { type FC } from "react";
import "../../../styles/components/small_components/label_logo.scss"
import LoadingComponent from "./LoadingComponent";
import ValidInvalidMarkComponent from "./ValidInvalidMarkComponent";
type Iprops = {
    state: "idle" | "valid" | "invalid" | "feching",
    isTyping: boolean
}

const SpanInputFetchState: FC<Iprops>  = ({state = "idle", isTyping= false }) => {

    return (
        <span className="input-fetch-state">
            {(state === "invalid" && !isTyping)
            && <ValidInvalidMarkComponent type={"invalid"}/>}
            {(state === "valid" && !isTyping) 
            && <ValidInvalidMarkComponent type={"valid"}/>}
            {(state === "feching" || isTyping ) 
            && <LoadingComponent type="simple" size={26}/>}
        </span>
    )
}

export default SpanInputFetchState