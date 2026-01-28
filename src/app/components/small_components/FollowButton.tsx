import { useEffect, useState, type FC } from "react";
import languageList from "@/lib/language";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import { useDispatch, useSelector } from "react-redux";
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { setFollowTargetUserId } from "@/lib/reducers/authSliceReducer/authSlice";
import getFollowAction from "@/lib/reducers/authSliceReducer/actions/user/getFollowAction";
type Iprops = {
    userId: number,
}

const FollowButton: FC<Iprops>  = ( {userId= -1} ) => {
    
    // Reducers
    const { accessToken, userData, getFollow } = useSelector(
        (store: RootState) => store.auth
    )
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()
    
    const [isFollow, setIsFollow] = useState<boolean>(false)
    const handleFollow = () =>{
        if (accessToken === "")
            return dispatch(setFullScreenAction("need-to-login"))
            if(getFollow.fetch.fetchState !== "fetching") {
                dispatch(setFollowTargetUserId(userId))
                dispatch(getFollowAction({token: accessToken, targetUserId: userId}))
            }
    }
    useEffect(()=>{
        const isfollowing = userData.following.find((item)=> item === userId)
        if (isfollowing)
            return setIsFollow(true)
        setIsFollow(false)
    },[dispatch, getFollow.fetch.fetchState, userData.following, userId])

    return (
        <>
        {userData.id !== userId ?
        <button 
            className={`button-normal push-action ${isFollow ? "button-cta-reverse" : "button-cta"}`} 
            onClick={handleFollow}
            disabled={getFollow.targetedUserId === userId && getFollow.fetch.fetchState === "fetching" ? true : false}
        >
            {isFollow ? languageList[currentLanguage].button.unfollow : languageList[currentLanguage].button.follow}
        </button>:
        <></>}
        </> 
    )
}

export default FollowButton