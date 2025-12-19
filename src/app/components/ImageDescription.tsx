import { stringCuter, stringReducer } from "@/lib/tools/stringTools";
import "../../styles/image_description.scss"
import Link from "next/link";
import { useState, type FC } from "react";
type Iprops = {
    views: number,
    date: string,
    description: string,
    tags: string[],
}

const ImageDescription: FC<Iprops>  = ( {views= 0, date = "2000-01-01", description = "No description", tags = []} ) => {
    const [displayFull, setTDisplayFull] = useState<boolean>(false)
    const descriptionList = stringCuter(description, "\n")
    const descriptionListShort = stringCuter(stringReducer(description, 300), "\n")
    return (
        <>  
            <div className="description-image">
                <div className="views-date-section">
                    <span>{views} views </span>
                    <p>{date}</p>
                </div>
                <div className="description-section">
                    {displayFull ? descriptionList.map((item, index)=>{
                        return <p key={index}>{item}</p>
                    }) : descriptionListShort.map((item, index)=>{
                        return <p key={index}>{item}</p>
                    }) }
                </div>
                { displayFull ? <>
                <hr className="section-separator"/>
                <div className="tags-list-section">
                    <h4>Tags :</h4>
                    {tags.map((item, index)=>{
                        return (
                        <Link className="link push-action" key={`${item}_${index}`} href={`/search?search=&type=image&sort=view&tag=${item}#nav`}>
                            {item}
                        </Link>
                        )
                    })}
                </div>
                </> : <></>}
                <button onClick={()=>setTDisplayFull((prevState)=> !prevState)}>
                    {displayFull ? "See less" : "See more"}
                </button>
            </div>
        </>
    )
}

export default ImageDescription