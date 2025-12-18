"use client"
import Link from "next/link";
import "../styles/home.scss"
import Image from "next/image";
// import { JSX, useEffect, useState } from "react";

import BentoGallery from "./components/BentoGallery";
import ArticlePreview from "./components/ArticlePreview";
import CarouselEvent from "./components/CarouselEvent";
import { EventList } from "@/lib/types/contenteType";
import { articleList, imageBentoList } from "@/lib/testContent";
import { contentSorter } from "@/lib/tools/FilterSorter";
import { useRouter } from 'next/navigation'

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

  const router = useRouter()

  return (
    <>
      {/* Hero Section */}
      <section id="hero">
        <h1 className="glow spacing-letter-big">Connectez-vous à l’infini!</h1>
        <p>Rejoignez une communauté d’astronomes, de rêveurs et de curieux unis par la passion des étoiles.</p>
        <div id="hero-buttons">
          <button className="button-cta button-big push-action">Sign Up</button>
          <button className="button-cta-reverse button-big push-action">Log In</button>
        </div>
      </section>
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
        <h2 className="glow spacing-letter-big">Featured Pictures Gallery</h2>
        <BentoGallery elementList={contentSorter(imageBentoList, "like" )}/>
        <button 
          className="button-cta-reverse button-normal push-action" 
          onClick={()=>router.push(`search?search=&type=image&sort=view&tag=#nav`)}
        >See More...</button>
      </section>
      <hr className="section-separator"/>

      {/* Article Section */}
      <section id="article">
        <h2 className="glow spacing-letter-big">Articles</h2>
        <ArticlePreview elementList={contentSorter(articleList, "date")}/>
        <button 
        className="button-cta-reverse button-normal push-action"
        onClick={()=>router.push(`search?search=&type=article&sort=view&tag=#nav`)}
        >See More...</button>
      </section>
      <hr className="section-separator"/>

      {/* Event Section */}
      <section id="event">
        <h2 className="glow spacing-letter-big">Upcoming astronomical events</h2>
        <CarouselEvent slidesPast={eventListPast} slidesFutur={eventListFutur}/>
        <button className="button-cta-reverse button-normal push-action">See More...</button>
      </section>
    </>
  );
}
