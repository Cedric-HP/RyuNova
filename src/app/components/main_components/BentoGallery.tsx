import { JSX, useEffect, useState, type FC } from "react";
import "../../../styles/components/main_components/bento_gallery.scss"
import { ContentData } from "../../../lib/types/contenteType";
import { useRouter } from 'next/navigation'
import ViewLikeBundle from "../small_components/ViewLikeBundle";
/* eslint-disable @next/next/no-img-element */
type Iprops = {
    elementList: ContentData[]
}

const BentoGallery: FC<Iprops>  = ({elementList = []}) => {

    const router = useRouter()

    const [imageBentoListElement, setImageBentoListElement] = useState<JSX.Element[]>([])

    useEffect(()=>{
        setImageBentoListElement(
            elementList.map((item, index)=>{
                return (
                    <li 
                        className="bento-box push-action appear-transform-scale" 
                        style={{animationDelay: `${(1*index)/25}s`}} 
                        key={`${item.title}_${index}`} 
                        onClick={()=>router.push(`/image/${item.id}/#nav`)}
                    >
                        <div className="bento-image">
                            <img src={item.url} alt={`${item.title}_by_${item.author}`} height={100} loading="lazy"/>
                        </div>
                        <div className="bento-text-and-filter">
                            <h3>{item.title}</h3>
                            <p>{item.author}</p>
                        </div>
                        <ViewLikeBundle view={item.views} like={item.likes}/>
                    </li>
                )
            })
        )
    },[elementList, router])

    return (
        <ul className="bento-gallery">
            {imageBentoListElement}
        </ul>
    )
}

export default BentoGallery