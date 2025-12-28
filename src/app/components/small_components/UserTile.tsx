import { numberReducerFormat } from "@/lib/tools/stringTools";
import "../../../styles/components/main_components/comment_style.scss"
import Link from "next/link";
import { useState, type FC } from "react";
import Avatar from "./Avatar";
import { useGlobalContext } from "../Navbar";
import languageList from "@/lib/language";

type Iprops = {
    id: number,
    name: string,
    followers: number,
    url: string,
    size: number,
}

const UserTile: FC<Iprops>  = ( {id= -1, name = "title", followers = 0, url = "url", size = 50} ) => {

    const { language } = useGlobalContext()
    const [testFollow, setTestFollow] = useState<boolean>(false)

    return (
        <>  
            <div className="user-tile">
                <div className="user-tile-main">
                    <div className="avatar-image" style={{width: size, height: size, maxHeight: size, maxWidth: size}}>
                        <Link className="push-action" href={`/profile/${id}`}>
                            <Avatar url={url} name={name} size={size}/>
                        </Link>
                    </div>
                    <div className="user-info">
                        <h3>{name}</h3>
                        <p><span>{numberReducerFormat(followers)}</span> {followers > 1 ? 
                        languageList[language].contentType.follower.plural :
                        languageList[language].contentType.follower.singular
                        }</p>
                    </div>
                </div>
                <button className={`button-normal push-action ${testFollow ? "button-cta-reverse" : "button-cta"}`} onClick={()=>setTestFollow((prestate)=> !prestate)}>
                    {testFollow ? languageList[language].button.unfollow : languageList[language].button.follow}
                </button>
            </div>
        </>
    )
}

export default UserTile