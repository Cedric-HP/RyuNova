import { JSX, useEffect, useState, type FC } from "react";
import "../../styles/user_list.scss"
import { UserData } from "../../lib/types/contenteType";
import UserTile from "./UserTile";
import LongTextDisplay from "./LongTextDisplay";
import ViewLikeComponent from "./ViewLikeComponent";
type Iprops = {
    userList: UserData[]
}

const UserList: FC<Iprops>  = ({userList = []}) => {

    const [userListElement, setUserListElement] = useState<JSX.Element[]>([])

    useEffect(()=>{
        setUserListElement(
             userList.map((item, index)=>{
                return (
                    <li className="user-list-item apear-user" style={{animationDelay: `${(1*index)/25}s`}} key={`${item.name}_${index}`}>
                        <UserTile id={item.id} name={item.name} size={75} url={item.url} followers={item.followers} />
                        <div className="user-list-info">
                            <LongTextDisplay text={item.description} sizeCute={100} displayFull={false}/>
                            <div className="user-stats">
                                <ViewLikeComponent type="view" ammout={item.views}/>
                                <ViewLikeComponent type="like" ammout={item.likes}/>
                            </div>
                        </div>
                    </li>
                )
            })
        )
    },[userList])

    return (
        <ul className="user-list">
          {userListElement}
        </ul>
    )
}

export default UserList