"use client"
import { useEffect, useMemo, useState, type FC } from "react";
// import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { useParams, useRouter } from "next/navigation";
import "../../../styles/pages/image.scss"
import { UserData } from "@/lib/types/contenteType";
import UserTile from "@/app/components/small_components/UserTile";
import ImageDescription from "@/app/components/main_components/ImageDescription";
import CommentModule from "@/app/components/main_components/CommentModule";
import { defaultUser } from "@/lib/tools/DefaultValues";
import { ImageUrl, numberReducerFormat } from "@/lib/tools/stringTools";
import languageList from "@/lib/language";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import setCurrentImageAction from "@/lib/reducers/utilitisesReducer/actions/setCurrentImageAction";
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import getImageAction from "@/lib/reducers/authSliceReducer/actions/image/getImageAction";
import getUserAction from "@/lib/reducers/authSliceReducer/actions/user/getUserAction";
import setGetImageFetchStateIdleAction from "@/lib/reducers/authSliceReducer/actions/image/setGetImageFetchStateIdleAction";
import setGetUserFetchStateIdleActionAction from "@/lib/reducers/authSliceReducer/actions/user/setGetUserFetchStateIdleAction";
import { useView } from "@/lib/tools/useView";
import LikeButton from "@/app/components/small_components/LikeButton";
import ValidInvalidMarkComponent from "@/app/components/small_components/ValidInvalidMarkComponent";
import LoadingComponent from "@/app/components/small_components/LoadingComponent";

const LogingRegister: FC = () => {
    
    // Reducers
    const { currentImage, getImage, userData, currentContentUser, getUser, profile, authorized} = useSelector(
        (store: RootState) => store.auth
    )
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()
    const {addView} = useView()

    // Router
    const router = useRouter()

    // Param Image ID
    const { imageId } = useParams();
    const imageID: number = useMemo(()=>{
        if (imageId)
            if (parseInt(String(imageId)) !== undefined)
                return parseInt(String(imageId))
         return 1
    },[imageId])

    // const content = useFetch(Number(imageId), "image")
    const [authorData, setAuthorData] = useState<UserData>(defaultUser)
    const [isInitialize, setIsInitialize] = useState<boolean>(false)
    const [viewAdded, setViewAdded] = useState<boolean>(false)

    useEffect(()=>{
        if (getImage.fetch.fetchState !== "fetching" && !isInitialize) {
            dispatch(setGetImageFetchStateIdleAction())
            dispatch(setGetUserFetchStateIdleActionAction())
            setIsInitialize(true)
        }
    },[dispatch, getImage.fetch.fetchState, isInitialize])

    useEffect(()=>{
        if ((imageID < 1) || imageID === undefined){
            router.push('/')
            return
        }
        if (
            imageID !== currentImage.id && 
            getImage.fetch.fetchState === "idle"
        ){
            dispatch(getImageAction(imageID))
        }
    },[currentImage.id, dispatch, getImage.exist, getImage.fetch.fetchState, imageID, imageId, router])

    useEffect(()=>{
        if ( getImage.exist ) {
            if (currentImage.authorId === userData.id)
                return setAuthorData({
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
            if (currentImage.authorId === currentContentUser.id) {
                console.log("here")
                return setAuthorData(currentContentUser)
            }
            if (getUser.fetch.fetchState === "idle")
                dispatch(getUserAction({id: currentImage.authorId, isProfil: false}))
        }
    },[currentContentUser, currentImage.authorId, currentImage.id, dispatch, getImage.exist, getImage.fetch.fetchState, getUser.exist, getUser.fetch.fetchState, userData.articles.length, userData.avatarUrl, userData.bannerUrl, userData.createdAt, userData.description, userData.followers, userData.id, userData.images.length, userData.likes, userData.name, userData.views])

    useEffect(()=>{
        if (getImage.fetch.fetchState === "done" && getImage.exist && !viewAdded && 
            (profile.fetch.fetchState !== "fetching") &&
            (authorized && userData.id > 0) &&
            currentImage.id > 0
        ){
            setViewAdded(true)
            addView(userData.id, "image", currentImage.id)
        }
    },[addView, authorized, currentImage.id, getImage.exist, getImage.fetch.fetchState, profile.fetch.fetchState, userData.id, viewAdded])

    return (
        <> 
            { getImage.exist && <>
                <section className="image-section">
                    <img className="image-normal" src={ImageUrl(currentImage.url, "thumbnail", "image", 750)} alt={`${currentImage.title}_by_${currentImage.author}`} onClick={()=>dispatch(setFullScreenAction("image"))}/>
                </section>
                <hr className="section-separator"/>
                <section className="description">
                    <h1>{currentImage.title}</h1>
                    <div className="author-section">
                        <UserTile 
                            userId={authorData.id} 
                            name={authorData.name} 
                            followers={authorData.followers} 
                            url={authorData.avatarUrl} size={75}
                        />
                        <LikeButton likeNumber={currentImage.likes} targetId={currentImage.id} type="image"/>
                    </div>
                    <ImageDescription views={currentImage.views} date={currentImage.createdAt} description={currentImage.description} tags={currentImage.tags}/>
                </section>
                <CommentModule contentType="image" size={50} />
            </>}
            {!getImage.exist && getImage.fetch.fetchState === "done" && 
            <section>
                <h3>No Image Found</h3>
                <p>ImageId : {imageID}</p>
            </section>}
            {getImage.fetch.fetchState === "error" &&
            <section>
                <p>Error: {getImage.fetch.error}</p>
                <ValidInvalidMarkComponent type={"invalid"}/>
            </section>} 
            {getImage.fetch.fetchState === "fetching" &&
            <section className="loading">
                <LoadingComponent type="black-hole" size={100}/>
            </section>}
        </>
    )
}

export default LogingRegister





