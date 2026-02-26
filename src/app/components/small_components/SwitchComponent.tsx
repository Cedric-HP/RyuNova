import { type FC } from "react";
import "../../../styles/components/small_components/switch-component.scss"
type Iprops = {
    state: boolean,
    children?: React.ReactNode
}

const SwitchComponent: FC<Iprops>  = ({ state = false, children }) => {

    return ( 
        <div 
            className={`switch ${state && "on"}`}
        >   
            {children}
            <div className="switch-slider-container">
                <div className="switch-slider">
                    <div className="switch-sphere"></div>
                </div>
            </div>
        </div>
    )
}

export default SwitchComponent