import "../../../styles/components/main_components/image_description.scss"
import Link from "next/link";
import { useState, type FC } from "react";
import LongTextDisplay from "./LongTextDisplay";
import { formatDate, formattedValue, numberReducerFormat, timeAgo } from "@/lib/tools/stringTools";
import languageList from "@/lib/language";
import { TagElement } from "@/lib/types/contenteType";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/store";
type Iprops = {
    views: number,
    date: string,
    description: string,
    tags: TagElement[],
}

const ImageDescription: FC<Iprops>  = ( {views= 0, date = "2000-01-01", description = "No description", tags = []} ) => {

    // Reducers
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const [displayFull, setTDisplayFull] = useState<boolean>(false)
    
    return (
        <>  
            <div className="description-image">
                <div className="views-date-section">
                    <span>
                        {displayFull ? formattedValue(views) : numberReducerFormat(views)} 
                        {" "}{views > 1 ? 
                            languageList[currentLanguage].contentType.view.plural :
                            languageList[currentLanguage].contentType.view.singular
                        }
                    </span>
                    <p>{displayFull ? formatDate(date) : timeAgo(date, currentLanguage)}</p>
                </div>
                <LongTextDisplay text={description} displayFull={displayFull} row={3}/>
                { displayFull ? <>
                <hr className="section-separator"/>
                <div className="tags-list-section">
                    {tags.length > 0 ? <>
                    <h4>{tags.length > 1 ? 
                        languageList[currentLanguage].contentType.tag.plural :
                        languageList[currentLanguage].contentType.tag.singular
                    } :</h4>
                    {tags.map((item, index)=>{
                        return (
                        <Link className="link push-action" key={`${item.name}_${index}`} href={`/search?search=&type=image&sort=view&tag=${item}#nav`}>
                            {item.name}
                        </Link>
                        )
                    })}
                    </> : 
                    <p>{languageList[currentLanguage].message.notification.noTag}</p>
                    }
                </div>
                </> : <></>}
                <button className="button-simple" onClick={()=>setTDisplayFull((prevState)=> !prevState)}>
                    {displayFull ? languageList[currentLanguage].button.seeLess : languageList[currentLanguage].button.seeMore}
                </button>
            </div>
        </>
    )
}

export default ImageDescription