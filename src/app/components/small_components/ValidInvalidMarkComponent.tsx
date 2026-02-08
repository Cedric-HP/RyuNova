import "../../../styles/components/small_components/label_logo.scss"
import { type FC } from "react";
type Iprops = {
    type: "valid" | "invalid"
}

const ValidInvalidMarkComponent: FC<Iprops>  = ( {type= "valid"} ) => {
    return (
        <>  
            {type === "invalid" ? 
            <div className="x-cross-invalid">
                <div className="x-cross-segment-1"></div>
                <div className="x-cross-segment-2"></div>
            </div> : 
            <div className="check-mark-valid">
                <div className="check-mark-segment-1"></div>
                <div className="check-mark-segment-2"></div>
            </div>}
        </>
    )
}

export default ValidInvalidMarkComponent