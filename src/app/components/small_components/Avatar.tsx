/* eslint-disable @next/next/no-img-element */
import { generateColor } from "@/lib/tools/generators";
import { type FC } from "react";
type Iprops = {
    url: string,
    name: string,
    size: number,
}

const Avatar: FC<Iprops>  = ( {url="", name= "", size=50} ) => {

    return ( (url !== "" && url !== "/") ? 
        <img 
            className="avatar" 
            src={url} alt={`${name}'s Avatar`} 
            height={size}
        /> : 
        <div 
            className="avatar" 
            style={{
                backgroundColor: `#${generateColor(name)}`,
                height: size,
                width: size
            }}
        >
            <p style={{fontSize: (size/2)+"px"}}>{name.charAt(0)}</p>
        </div>
    )
}

export default Avatar