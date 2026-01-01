import "../../../styles/components/main_components/image_description.scss"
import Link from "next/link";
import { useState, type FC } from "react";
import LongTextDisplay from "./LongTextDisplay";
import { formatDate, formattedValue, numberReducerFormat, timeAgo } from "@/lib/tools/stringTools";
import { useGlobalContext } from "../Navbar";
import languageList from "@/lib/language";
type Iprops = {
    views: number,
    date: string,
    description: string,
    tags: string[],
}

const ImageDescription: FC<Iprops>  = ( {views= 0, date = "2000-01-01", description = "No description", tags = []} ) => {

    const { language } = useGlobalContext()
    const [displayFull, setTDisplayFull] = useState<boolean>(false)
    
    return (
        <>  
            <div className="description-image">
                <div className="views-date-section">
                    <span>
                        {displayFull ? formattedValue(views) : numberReducerFormat(views)} 
                        {" "}{views > 1 ? 
                            languageList[language].contentType.view.plural :
                            languageList[language].contentType.view.singular
                        }
                    </span>
                    <p>{displayFull ? formatDate(date) : timeAgo(date, language)}</p>
                </div>
                <LongTextDisplay text={description} displayFull={displayFull} row={3}/>
                { displayFull ? <>
                <hr className="section-separator"/>
                <div className="tags-list-section">
                    {tags.length > 0 ? <>
                    <h4>{tags.length > 1 ? 
                        languageList[language].contentType.tag.plural :
                        languageList[language].contentType.tag.singular
                    } :</h4>
                    {tags.map((item, index)=>{
                        return (
                        <Link className="link push-action" key={`${item}_${index}`} href={`/search?search=&type=image&sort=view&tag=${item}#nav`}>
                            {item}
                        </Link>
                        )
                    })}
                    </> : 
                    <p>{languageList[language].message.notification.noTag}</p>
                    }
                </div>
                </> : <></>}
                <button className="button-simple" onClick={()=>setTDisplayFull((prevState)=> !prevState)}>
                    {displayFull ? languageList[language].button.seeLess : languageList[language].button.seeMore}
                </button>
            </div>
        </>
    )
}

export default ImageDescription