"use client"
import Link from "next/link";
import "../styles/pages/home.scss"
import Image from "next/image";
// import { JSX, useEffect, useState } from "react";

import BentoGallery from "./components/main_components/BentoGallery";
import ArticlePreview from "./components/main_components/ArticlePreview";
import CarouselEvent from "./components/main_components/CarouselEvent";
import { EventList } from "@/lib/types/contenteType";
import { articleList, imageBentoList } from "@/lib/testContent";
import { contentSorter } from "@/lib/tools/FilterSorter";
import { useRouter } from 'next/navigation'
import { useGlobalContext } from "./components/Navbar";
import languageList from "@/lib/language";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { LogRegInput } from "@/lib/types/utilitisesType";
import setLogRegAction from "@/lib/reducers/utilitisesReducer/actions/setLogRegAction";

const eventListPast: EventList[] = [
  {
    title: "Snow Moon",
    date: "2025-02-12",
    url: "/image/pictures/event/snow-moon.jpg",
  },
  {
    title: "Nights of the stars",
    date: "2025-08-03",
    url: "/image/pictures/event/affiche-nuits-etoiles.jpg",
  },
  
  {
    title: "Lunar Eclipse",
    date: "2025-09-07",
    url: "/image/pictures/event/lunar_eclipse.avif",
  },
  {
    title: "Partial Solar Eclipse",
    date: "2025-09-21",
    url: "/image/pictures/event/partial_solar-ecplise.png",
  }
]

const eventListFutur: EventList[] = [
  {
    title: "Annular Solar Eclipse",
    date: "2026-02-17",
    url: "/image/pictures/event/annular_solar_eclipse.jpg",
  },
  {
    title: "Solar Eclipse",
    date: "2026-08-12",
    url: "/image/pictures/event/solar-eclipse.webp",
  }
]

const iconSize = 75;

export default function Home() {

  // Reducer
  const { accessToken } = useSelector(
      (store: RootState) => store.auth
  )
  const dispatch: AppDispatch = useDispatch()

  // Language Context
  const { language } = useGlobalContext()
  
  // Router
  const router = useRouter()

  const handleLogReg = (type: LogRegInput) => {
    dispatch(setLogRegAction(type))
    dispatch(setFullScreenAction("log-reg"))
  }

  return (
    <>
      {accessToken === "" ? <>
      {/* Hero Section */}
      <section id="hero">
        <h1 className="glow spacing-letter-big">{languageList[language].titles.homeMainTitle}</h1>
        <p>{languageList[language].titles.homeSecondTitle}</p>
        <div id="hero-buttons">
          <button 
            className="button-cta button-big push-action" 
            onClick={()=>handleLogReg("reg")}
            onKeyDown={()=>handleLogReg("reg")}
          >{languageList[language].button.signUp}</button>
          <button 
            className="button-cta-reverse button-big push-action"
            onClick={()=>handleLogReg("log")}
            onKeyDown={()=>handleLogReg("log")}
          >{languageList[language].button.logIn}</button>
        </div>
      </section></> : <></>}
          <button 
            className="button-cta button-big push-action" 
            onClick={()=>handleLogReg("reg")}
            onKeyDown={()=>handleLogReg("reg")}
          >{languageList[language].button.signUp}</button>
          <button 
            className="button-cta-reverse button-big push-action"
            onClick={()=>handleLogReg("log")}
            onKeyDown={()=>handleLogReg("log")}
          >{languageList[language].button.logIn}</button>
          <button 
            className="button-cta-reverse button-big push-action"
            onClick={()=>dispatch(setFullScreenAction("need-to-login"))}
            onKeyDown={()=>dispatch(setFullScreenAction("need-to-login"))}
          >Test Need to be connected</button>
          <button 
            className="button-cta-reverse button-normal push-action"
            onClick={()=>dispatch(setFullScreenAction("image-upload"))}
            onKeyDown={()=>dispatch(setFullScreenAction("image-upload"))}
          >Image Upload</button>
      <hr className="section-separator"/>

      {/* Tag Section */}
      <section id="tags-list">
        <Link href={"/search?search=&type=image&sort=view&tag=stars#nav"} className="tag-logo push-action">
          <Image src="/image/icons/noun-stars-7127150.svg" alt="Stars" height={iconSize} width={iconSize} />
        </Link>
        <Link href={"/search?search=&type=image&sort=view&tag=gallaxy#nav"} className="tag-logo push-action">
          <Image src="/image/icons/noun-galaxy-3544621.svg" alt="Gallaxy" height={iconSize} width={iconSize} />
        </Link>
        <Link href={"/search?search=&type=image&sort=view&tag=planet#nav"} className="tag-logo push-action">
          <Image src="/image/icons/noun-planet-792.svg" alt="Planet" height={iconSize} width={iconSize} />
        </Link>
        <Link href={"/search?search=&type=image&sort=view&tag=nebula#nav"} className="tag-logo push-action">
          <Image src="/image/icons/noun-nebula-1578521.svg" alt="Nebula" height={iconSize} width={iconSize} />
        </Link>
        <Link href={"/search?search=&type=image&sort=view&tag=iss#nav"} className="tag-logo push-action">
          <Image src="/image/icons/noun-space-station-1219999.svg" alt="ISS" height={iconSize} width={iconSize} />
        </Link>
      </section>
      <hr className="section-separator"/>

      {/* Gallery Section */}
      <section id="gallery">
        <h2 className="glow spacing-letter-big">{languageList[language].titles.featuredPicturesGallery}</h2>
        <BentoGallery elementList={contentSorter(imageBentoList, "like" )}/>
        <button 
          className="button-cta-reverse button-normal push-action" 
          onClick={()=>router.push(`search?search=&type=image&sort=view&tag=#nav`)}
        >{languageList[language].button.seeMore}...</button>
      </section>
      <hr className="section-separator"/>

      {/* Article Section */}
      <section id="article">
        <h2 className="glow spacing-letter-big">{languageList[language].titles.featuredArticles}</h2>
        <ArticlePreview elementList={contentSorter(articleList, "date")}/>
        <button 
        className="button-cta-reverse button-normal push-action"
        onClick={()=>router.push(`search?search=&type=article&sort=view&tag=#nav`)}
        >{languageList[language].button.seeMore}...</button>
      </section>
      <hr className="section-separator"/>

      {/* Event Section */}
      <section id="event">
        <h2 className="glow spacing-letter-big">{languageList[language].titles.upcommingAstronomicalEvents}</h2>
        <CarouselEvent slidesPast={eventListPast} slidesFutur={eventListFutur}/>
        <button className="button-cta-reverse button-normal push-action">{languageList[language].button.seeMore}...</button>
      </section>
    </>
  );
}
