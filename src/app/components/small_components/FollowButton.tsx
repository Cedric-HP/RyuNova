import { useState, type FC } from "react";
import languageList from "@/lib/language";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import { useDispatch, useSelector } from "react-redux";
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
type Iprops = {
    urserId: number,
}

const FollowButton: FC<Iprops>  = ( {urserId= -1} ) => {
    
    // Reducers
    const { accessToken } = useSelector(
        (store: RootState) => store.auth
    )
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()
    
    const [testFollow, setTestFollow] = useState<boolean>(false)
    const handleFollow = () =>{
        if (accessToken === "")
            return dispatch(setFullScreenAction("need-to-login"))
        setTestFollow((prevState)=>!prevState)
    }

    return ( 
        <button className={`button-normal push-action ${testFollow ? "button-cta-reverse" : "button-cta"}`} onClick={handleFollow}>
            {testFollow ? languageList[currentLanguage].button.unfollow : languageList[currentLanguage].button.follow}
        </button>
    )
}

export default FollowButton