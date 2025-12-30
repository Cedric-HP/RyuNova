"use client"
import { type FC } from "react";
/* eslint-disable @next/next/no-img-element */
// import Link from "next/link";
import "../../../styles/pages/profile.scss"
import { useParams } from "next/navigation";
import { fecthFinderUser } from "@/lib/tools/usefecth";
import Avatar from "@/app/components/small_components/Avatar";
import { handleLongTextSize, numberReducerFormat } from "@/lib/tools/stringTools";
import { useGlobalContext } from "@/app/components/Navbar";
import languageList from "@/lib/language";
import LongTextDisplay from "@/app/components/small_components/LongTextDisplay";
import { Exo_2 } from "next/font/google";

const LogingRegister: FC = () => {

    const { language, mainElement, windowSize } = useGlobalContext()
    const { userId } = useParams();
    const userData = fecthFinderUser( Number(userId))

    return (
        <>  {userData ? <>
            <section className="user-hero">
                {userData.bannerUrl !== "" ? <>
                <div className="banner">
                    <img src={userData.bannerUrl} alt={`${userData.name}'s banner`}/>
                    <div className="banner-filter"></div>
                </div>
                <div className="hero-height-1"></div>
                </> : <></>}
                <div className="hero-height-2"></div>
                <div className="user-hero-content-box">
                    <Avatar url={userData.avatarUrl} name={userData.name} size={200}/>
                    <div className="user-hero-main-content">
                        <h1>{userData.name}</h1>
                        <span>
                            {`${numberReducerFormat(userData.followers)} 
                            ${userData.followers > 1 ? 
                                languageList[language].contentType.follower.plural : 
                                languageList[language].contentType.follower.singular}
                            `}
                            {userData.images > 0 ? 
                            ` . ${numberReducerFormat(userData.images)} 
                            ${userData.images > 1 ? 
                                languageList[language].contentType.image.plural :
                                languageList[language].contentType.image.singular 
                            }` : 
                            ""}
                            {userData.articles > 0 ? 
                            ` . ${numberReducerFormat(userData.articles)} 
                            ${userData.articles > 1 ? 
                                languageList[language].contentType.article.plural :
                                languageList[language].contentType.article.singular 
                            }` : 
                            ""}
                        </span>
                        <LongTextDisplay text={userData.description} sizeCute={handleLongTextSize(0.75, 2, 260, windowSize.width, 8)} displayFull={false}/>
                        <span>{windowSize.width}width</span>
                        <span>{windowSize.height}height</span>
                    </div>
                </div>
            </section>
            <hr className="section-separator"/>
        </> : <></>}
        </>
    )
}

export default LogingRegister