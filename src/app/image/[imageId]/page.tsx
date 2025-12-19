"use client"
import { useEffect, useState, type FC } from "react";
// import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { useParams } from "next/navigation";
import { fecthFinderUser, useFetch } from "@/lib/tools/usefecth";
import "../../../styles/image.scss"
import { UserData } from "@/lib/types/contenteType";
import UserTile from "@/app/components/UserTile";
import ImageDescription from "@/app/components/ImageDescription";
import { faMagnifyingGlass, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const defaultUser: UserData = {
    id: -1,
    name: "deleted_user",
    url:"url",
    description: "",
    views: 0,
    likes: 0,
    followers: 0
}

const LogingRegister: FC = () => {

    const { imageId } = useParams();

    const content = useFetch(Number(imageId), "image")
    const [authorData, setAuthorData] = useState<UserData>(defaultUser)
    const [testLike, setTestLike] = useState<boolean>(false)
    const [fullScreen, setFullScreen] = useState<boolean>(false)
    const [fullScreenLimit, setFullScreenLimit] = useState<boolean>(false)

    useEffect(()=>{
        if(content !== undefined) {
            const author = fecthFinderUser(content.authorId)
            if (author !== undefined)
                setAuthorData(author)
        }
    },[content]) 
    
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
                            url={authorData.url} size={75}
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
                            <span>{content.likes}</span>
                        </button>
                    </div>
                    <ImageDescription views={content.views} date={content.createdAt} description={content.description} tags={content.tags}/>
                </section>
                {fullScreen ? <>
                    <div className="full-screen">
                        <img className={fullScreenLimit ? "image-full image-full-limit" : "image-full"} src={content.url} alt={`${content.title}_by_${content.author}`} onClick={()=>setFullScreenLimit((prevState)=>!prevState)}/>
                        <button onClick={()=>setFullScreen(false)}>
                            LAAAL
                        </button>
                    </div>
                    </> : <></>}
            </> : <>
                <section className="no-image-found">
                    <h1>Image Not Found</h1>
                    <p>Image id : {imageId}</p>
                </section>
            </>
            } 
        </>
    )
}

export default LogingRegister

