"use client"
import { type FC } from "react";
/* eslint-disable @next/next/no-img-element */
// import Link from "next/link";
import "../../../styles/pages/profile.scss"
import { useParams } from "next/navigation";
import { fecthFinderUser } from "@/lib/tools/usefecth";
import Avatar from "@/app/components/small_components/Avatar";

const LogingRegister: FC = () => {

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
                    <div className=""></div>
                </div>
            </section>
            <hr className="section-separator"/>
        </> : <></>}
        </>
    )
}

export default LogingRegister