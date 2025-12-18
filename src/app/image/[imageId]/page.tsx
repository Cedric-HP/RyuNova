"use client"
import { useEffect, useState, type FC } from "react";
// import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { useParams } from "next/navigation";
import { fecthFinderUser, useFetch } from "@/lib/tools/usefecth";
import "../../../styles/image.scss"
import { UserData } from "@/lib/types/contenteType";
import UserTile from "@/app/components/UserTile";

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

    useEffect(()=>{
        if(content !== undefined) {
            const author = fecthFinderUser(content.authorId)
            if (author !== undefined)
                setAuthorData(author)
        }
    },[content]) 
    
    return (
        <>  
            <hr id="top-separtaor" className="section-separator"/>
            {
            content !== undefined ? <>
                <section className="image-section">
                    <img src={content.url} alt={`${content.title}_by_${content.author}`}/>
                </section>
                <hr className="section-separator"/>
                <section className="description-section">
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
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/>
                            </svg>
                            <span>{content.likes}</span>
                        </button>
                    </div>
                    <div><span><strong>{content.views}</strong> views  </span>
                    <span>{content.createdAt}</span>
                    </div>
                    <p>{content.description}</p>
                </section>
            </> : <>
                <p>Image Not Found</p>
                
            </>
            } 
        </>
    )
}

export default LogingRegister

