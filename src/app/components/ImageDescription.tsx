import "../../styles/image_description.scss"
import Link from "next/link";
import { useState, type FC } from "react";
import LongTextDisplay from "./LongTextDisplay";
type Iprops = {
    views: number,
    date: string,
    description: string,
    tags: string[],
}

const ImageDescription: FC<Iprops>  = ( {views= 0, date = "2000-01-01", description = "No description", tags = []} ) => {
    const [displayFull, setTDisplayFull] = useState<boolean>(false)
    
    return (
        <>  
            <div className="description-image">
                <div className="views-date-section">
                    <span>{views} views </span>
                    <p>{date}</p>
                </div>
                <LongTextDisplay text={description} sizeCute={300} displayFull={displayFull}/>
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
                <button className="button-simple" onClick={()=>setTDisplayFull((prevState)=> !prevState)}>
                    {displayFull ? "See less" : "See more"}
                </button>
            </div>
        </>
    )
}

export default ImageDescription