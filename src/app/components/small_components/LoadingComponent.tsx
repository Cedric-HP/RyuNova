import { type FC } from "react";
import "../../../styles/components/small_components/label_logo.scss"
type Iprops = {
    type: "orbital" | "black-hole" | "simple",
    size: number
}
const LoadingComponent: FC<Iprops>  = ({type= "simple", size=100}) => {

    return (
        <>
        {type === "black-hole" && 
        <div 
            className="loading-component" 
            style={{height: size + "px", width: size + "px"}}
        >
            <div 
                className="loading-ring-1"
                style={{top: ((size / 2) - ((size + 6) / 2)) + "px", left: ((size / 2) - ((size + 6) / 2))+ "px"}}
            ></div>
            <div 
                className="loading-ring-2"
                style={{top: ((size / 2) - (((size * 0.9) + 6) / 2)) + "px", left: ((size / 2) - (((size * 0.9) + 6) / 2))+ "px"}}
            ></div>
            <div 
                className="loading-ring-3"
                style={{top: ((size / 2) - (((size * 0.8) + 6) / 2)) + "px", left: ((size / 2) - (((size * 0.8) + 6) / 2))+ "px"}}
            ></div>
            <div 
                className="loading-core-black-hole"
                style={{top: ((size / 2) - (((size * 0.25) + 2) / 2)) + "px", left: ((size / 2) - (((size * 0.25) + 2) / 2)) + "px"}}
            ></div>
        </div>}
        {type === "orbital" && 
        <div className="system">
            <div className="planet"></div>
            <div className="orbit-1">
                <div className="moon"></div>
            </div>
            <div className="orbit-2">
                <div className="moon"></div>
            </div>
        </div>}
        {type === "simple" && 
        <div 
            className="loading-component" 
            style={{height: size + "px", width: size + "px"}}
        >
            <div 
                className="loading-ring-simple"
                style={{top: ((size / 2) - ((size + 2) / 2)) + "px", left: ((size / 2) - ((size + 2) / 2))+ "px"}}
            ></div>
            <div 
                className="loading-core-simple"
                style={{top: ((size / 2) - ((size / 4) / 2)) + "px", left: ((size / 2) - ((size / 4) / 2)) + "px"}}
            ></div>
        </div>}
        </>
        
    )
}

export default LoadingComponent