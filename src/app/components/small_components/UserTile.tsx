import { numberReducerFormat } from "@/lib/tools/stringTools";
import "../../../styles/components/main_components/comment_style.scss"
import Link from "next/link";
import { type FC } from "react";
import Avatar from "./Avatar";
import languageList from "@/lib/language";
import FollowButton from "./FollowButton";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/store";

type Iprops = {
    userId: number,
    name: string,
    followers: number,
    url: string,
    size: number,
}

const UserTile: FC<Iprops>  = ( {userId= -1, name = "title", followers = 0, url = "url", size = 50} ) => {

    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )

    return (
        <>  
            <div className="user-tile">
                <div className="user-tile-main">
                    <div className="avatar-image" style={{width: size, height: size, maxHeight: size, maxWidth: size}}>
                        <Link className="push-action" href={`/profile/${userId}`}>
                            <Avatar url={url} name={name} size={size}/>
                        </Link>
                    </div>
                    <div className="user-info">
                        <h3>{name}</h3>
                        <p><span>{numberReducerFormat(followers)}</span> {followers > 1 ? 
                        languageList[currentLanguage].contentType.follower.plural :
                        languageList[currentLanguage].contentType.follower.singular
                        }</p>
                    </div>
                </div>
                <FollowButton urserId={userId}/>
            </div>
        </>
    )
}

export default UserTile