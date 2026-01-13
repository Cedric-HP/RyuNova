"use client"
import { useEffect, useMemo, useState, type FC } from "react";
/* eslint-disable @next/next/no-img-element */
// import Link from "next/link";
import "../../../styles/pages/profile.scss"
import { useParams, useRouter } from "next/navigation";
import Avatar from "@/app/components/small_components/Avatar";
import { numberReducerFormat } from "@/lib/tools/stringTools";
import languageList from "@/lib/language";
import LongTextDisplay from "@/app/components/main_components/LongTextDisplay";
import FollowButton from "@/app/components/small_components/FollowButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import { defaultUser } from "@/lib/tools/DefaultValues";
import { UserData } from "@/lib/types/contenteType";
import getUserAction from "@/lib/reducers/authSliceReducer/actions/user/getUserAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { setImageUploadCategoryAction } from "@/lib/reducers/authSliceReducer/authSlice";
const LogingRegister: FC = () => {

    // Reducers
    const { currentImage, getImage, userData, currentUser, getUser} = useSelector(
        (store: RootState) => store.auth
    )
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Router
    const router = useRouter()
    
    // Param User ID
    const { userId } = useParams();
    const userID: number = useMemo(()=>{
        if (userId)
            if (parseInt(userId[0]) !== undefined)
                return parseInt(userId[0])
        return -1
    },[userId])
    const [userProfilData, setUserProfileData] = useState<UserData>(defaultUser)

    // Use Effect that handle User Fecth Data
    useEffect(()=>{
        if (userID < 1){
            router.push('/profile/1')
            return
        }
        if (userID === userData.id)
            return setUserProfileData({
                articles: userData.articles.length,
                avatarUrl: userData.avatarUrl,
                bannerUrl: userData.bannerUrl,
                createdAt: userData.createdAt,
                description: userData.description,
                followers: userData.followers,
                id: userData.id,
                images: userData.images.length,
                likes: userData.likes,
                name: userData.name,
                views: userData.views
            })
        if (userID === currentUser.id)
            return setUserProfileData(currentUser)
        if (getUser.fetch.fetchState !== "feching" && getUser.fetch.fetchState !== "error") {
            console.log("here")
            dispatch(getUserAction(userID))
        }  
    },[currentImage.authorId, currentImage.id, currentUser, dispatch, getImage.fetch.fetchState, getUser.exist, getUser.fetch.fetchState, router, userData.articles.length, userData.avatarUrl, userData.bannerUrl, userData.createdAt, userData.description, userData.followers, userData.id, userData.images.length, userData.likes, userData.name, userData.views, userID])

    // Handle Edit Image

    const handleEditeAvatarBanner = (type: "avatar" | "banner") =>{
        dispatch(setImageUploadCategoryAction(type))
        dispatch(setFullScreenAction("image-upload"))
    }

    return (
        <>  {userProfilData.id !== -1 ? 
            <>
            <section className="user-hero">
                {userProfilData.bannerUrl !== "" ? <>
                <div className="banner">
                    <img src={userProfilData.bannerUrl} alt={`${userProfilData.name}'s banner`}/>
                    <div className="banner-filter"></div>
                </div>
                <div className="hero-height-1"></div>
                </> : <></>}
                <div className="hero-height-2"></div>
                <div className="user-hero-content-box">
                    <div className="user-hero-content-avatar">
                        <Avatar url={userProfilData.avatarUrl} name={userProfilData.name} size={200}/>
                        {userProfilData.id === userData.id ? <button 
                            className="push-action edit-button edit-button-normal"
                            onClick={()=>handleEditeAvatarBanner("avatar")}
                        ><FontAwesomeIcon icon={faPenToSquare} /></button> : <></>}
                    </div>
                    <div className="user-hero-main-content">
                        <h1>{userProfilData.name}</h1>
                        <span>
                            {`${numberReducerFormat(userProfilData.followers)} 
                            ${userProfilData.followers > 1 ? 
                                languageList[currentLanguage].contentType.follower.plural : 
                                languageList[currentLanguage].contentType.follower.singular}
                            `}
                            {userProfilData.images > 0 ? 
                            ` . ${numberReducerFormat(userProfilData.images)} 
                            ${userProfilData.images > 1 ? 
                                languageList[currentLanguage].contentType.image.plural :
                                languageList[currentLanguage].contentType.image.singular 
                            }` : 
                            ""}
                            {userProfilData.articles > 0 ? 
                            ` . ${numberReducerFormat(userProfilData.articles)} 
                            ${userProfilData.articles > 1 ? 
                                languageList[currentLanguage].contentType.article.plural :
                                languageList[currentLanguage].contentType.article.singular 
                            }` : 
                            ""}
                        </span>
                        <LongTextDisplay text={userProfilData.description} displayFull={false} row={2}/>
                        <div className="user-hero-main-buttons">
                            <FollowButton urserId={userProfilData.id}/>
                        </div>
                    </div>
                </div>
            </section>
            <hr className="section-separator"/>
        </> : <>
        {!getUser.exist && getUser.fetch.fetchState === "done" ? <>
        <h3>No User Found</h3>
        <p>User Id : {userID}</p>
        </> : <></>}
        {getUser.fetch.fetchState === "error" ?
            <section>
                <p>Error: {getUser.fetch.error}</p>
            </section> :
            <section className="loading">
                <p>Loading</p>
            </section>}
        </>}
        </>
    )
}

export default LogingRegister