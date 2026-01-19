/* eslint-disable @next/next/no-img-element */
import { generateColor } from "@/lib/tools/generators";
import { ImageUrl } from "@/lib/tools/stringTools";
import { AvatarSizeInput } from "@/lib/types/utilitisesType";
import { type FC } from "react";
type Iprops = {
    url: string,
    name: string,
    size: AvatarSizeInput,
}

const Avatar: FC<Iprops>  = ( {url="", name= "", size=50} ) => {

    return ( (url !== "" && url !== "/") ? 
        <img 
            className="avatar" 
            src={ImageUrl(url, "thumbnail", size)} alt={`${name}'s Avatar`} 
            height={size}
            style={{
                height: size,
                width: size,
                maxHeight: size,
                maxWidth: size,
                minHeight: size,
                minWidth: size
            }}
        /> : 
        <div 
            className="avatar" 
            style={{
                backgroundColor: `#${generateColor(name)}`,
                height: size,
                width: size,
                maxHeight: size,
                maxWidth: size,
                minHeight: size,
                minWidth: size
            }}
        >
            <p style={{fontSize: (size/2)+"px"}}>{name.charAt(0)}</p>
        </div>
    )
}

export default Avatar