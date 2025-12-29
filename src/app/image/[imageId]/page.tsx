"use client"
import { useEffect, useState, type FC } from "react";
// import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { useParams } from "next/navigation";
import { fecthFinderComment, fecthFinderUser, useFetch } from "@/lib/tools/usefecth";
import "../../../styles/pages/image.scss"
import { UserData } from "@/lib/types/contenteType";
import UserTile from "@/app/components/small_components/UserTile";
import ImageDescription from "@/app/components/main_components/ImageDescription";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentModule from "@/app/components/main_components/CommentModule";
import { defaultUser } from "@/lib/tools/DefaultValues";
import { numberReducerFormat } from "@/lib/tools/stringTools";
import { useGlobalContext } from "@/app/components/Navbar";
import languageList from "@/lib/language";

const userAvatar: string = "/image/pictures/avatar/GBX_LOGO_Head_PNG.png"

const LogingRegister: FC = () => {

    const { language, mainElement } = useGlobalContext()

    const { imageId } = useParams();

    const content = useFetch(Number(imageId), "image")
    const [authorData, setAuthorData] = useState<UserData>(defaultUser)
    const [testLike, setTestLike] = useState<boolean>(false)
    const [fullScreen, setFullScreen] = useState<boolean>(false)
    const [fullScreenLimit, setFullScreenLimit] = useState<boolean>(false)
    const conmmentList = fecthFinderComment(content?.commentList || [])

    // Use Effect that simule e fecth

    useEffect(()=>{
        if(content !== undefined) {
            const author = fecthFinderUser(content.authorId)
            if (author !== undefined)
                setAuthorData(author)
        }
    },[content]) 

    // Use Effect that changes the z-index of the main element when fullscreen is on

    useEffect(()=>{
        if (fullScreen) {
            if(mainElement.current)
                mainElement.current.style.zIndex = "3"
        }
        else
            if(mainElement.current)
                mainElement.current.style.zIndex = "0"    
    },[fullScreen, mainElement])
    
    return (
        <>  
            {
            content !== undefined ? <>
                <section className="image-section">
                    <img className="image-normal" src={content.url} alt={`${content.title}_by_${content.author}`} onClick={()=>{setFullScreen(true); setFullScreenLimit(true)}}/>
                </section>
                <hr className="section-separator"/>
                <section className="description">
                    <h1>{content.title}</h1>
                    <div className="author-section">
                        <UserTile 
                            id={authorData.id} 
                            name={authorData.name} 
                            followers={authorData.followers} 
                            url={authorData.avatarUrl} size={75}
                        />
                        <button className={`button-like ${testLike ? "liked" : ""}`} onClick={()=> setTestLike((prevstate)=>!prevstate)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={testLike ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/>
                            </svg>
                            <span>{testLike ? `${numberReducerFormat(content.likes +1)}` : `${numberReducerFormat(content.likes)}` }</span>
                        </button>
                    </div>
                    <ImageDescription views={content.views} date={content.createdAt} description={content.description} tags={content.tags}/>
                </section>
                <CommentModule authorId={authorData.id} commentList={conmmentList} size={50} userAvatar={userAvatar}/>
                {fullScreen ? <>
                    <div className="full-screen full-screen-blur">
                        <div className="full-screen-button" onClick={()=>setFullScreen(false)}></div>
                        <img className={fullScreenLimit ? "image-full image-full-limit appear" : "image-full appear"} src={content.url} alt={`${content.title}_by_${content.author}`} onClick={()=>setFullScreenLimit((prevState)=>!prevState)}/>
                        <button 
                            onClick={()=>setFullScreen(false)}
                            onKeyDown={()=>setFullScreen(false)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    </> : <></>}
            </> : <>
                <section className="no-image-found">
                    <h1>{languageList[language].message.error.imageNotFound}</h1>
                    <p>Image id : {imageId}</p>
                </section>
            </>
            } 
        </>
    )
}

export default LogingRegister

