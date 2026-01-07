import { type FC } from "react";
import "../../../styles/components/small_components/label_logo.scss"
import { IsTyping } from "@/lib/types/utilitisesType";
type Iprops = {
    state: "idle" | "valid" | "invalid" | "feching",
    isTyping: IsTyping,
    type: string
}

const SpanInputFetchState: FC<Iprops>  = ({state = "idle", isTyping= {state: false, type: ""}, type= ""}) => {

    return (
        <span className="input-fetch-state">
            {state === "invalid" ? <>Invalid</> : <></>}
            {state === "valid" ? <>valid</> : <></>}
            {(state === "feching" || (isTyping.state && type === isTyping.type) ) ? <>Loading</> : <></>}
        </span>
    )
}

export default SpanInputFetchState