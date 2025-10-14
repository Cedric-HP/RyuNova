import { JSX, useEffect, useState, type FC } from "react";
import "../../styles/bento_gallery.scss"
import { ImageBento } from "../types/contenteType";
/* eslint-disable @next/next/no-img-element */
type Iprops = {
    elementList: ImageBento[]
}

const BentoGallery: FC<Iprops>  = ({elementList = []}) => {

    const [imageBentoListElement, setImageBentoListElement] = useState<JSX.Element[]>([])

    useEffect(()=>{
        setImageBentoListElement(
            elementList.map((item, index)=>{
                return (
                    <li className="bento-box push-action" key={`${item.name}_${index}`}>
                        <div className="bento-image">
                            <img src={item.url} alt={`${item.name}_by_${item.author}`} height={100}/>
                        </div>
                        <div className="bento-text-and-filter">
                            <h3>{item.name}</h3>
                            <p>{item.author}</p>
                        </div>
                    </li>
                )
            })
        )
    },[elementList])

    return (
        <ul className="bento-gallery">
            {imageBentoListElement}
        </ul>
    )
}

export default BentoGallery