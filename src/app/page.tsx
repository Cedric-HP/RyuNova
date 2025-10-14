"use client"
import Link from "next/link";
import "../styles/home.scss"
import Image from "next/image";
// import { JSX, useEffect, useState } from "react";
import { ArticleList, EventList, ImageBento } from "./types/contenteType";
import BentoGallery from "./components/BentoGallery";
import ArticlePreview from "./components/ArticlePreview";
import CarouselEvent from "./components/CarouselEvent";

const imageBentoList: ImageBento[] = [
  {
    name: "Jupiter",
    author: "NASA",
    url: "/image/pictures/bento/jupiter.jpg"
  },
  {
    name: "Andromeda",
    author: "Pete Lawrence",
    url: "/image/pictures/bento/Andromeda-Galaxy.webp"
  },
  {
    name: "Mars",
    author: "NASA, Hubble",
    url: "/image/pictures/bento/Mars.jpg"
  },
  {
    name: "Crab Nebula",
    author: "NASA, Hubble",
    url: "/image/pictures/bento/Crab_Nebula.jpg"
  },
  {
    name: "Large Magellanic Cloud",
    author: "ESO, VISTA",
    url: "/image/pictures/bento/Large_Magellanic_Clound.jpg"
  },
  {
    name: "ISS Transit",
    author: "Andrew McCarthy",
    url: "/image/pictures/bento/ISS_Transit_Moon.webp"
  },
  {
    name: "The Pillars of Creation",
    author: "NASA",
    url: "/image/pictures/bento/pillars-of-creation.jpg"
  },
  {
    name: "Low Earth Orbit",
    author: "NASA",
    url: "/image/pictures/bento/earth_from_iss.jpg"
  },
  {
    name: "The Moon",
    author: "Zane Landers",
    url: "/image/pictures/bento/Moon.webp"
  }
  ,
  {
    name: "Uranus",
    author: "NASA, ESA",
    url: "/image/pictures/bento/Uranus.jpg"
  }
]
const articleList: ArticleList[] = [
  {
    title: `The James-Webb telescope captures a new image of the deep Universe`,
    author: "Le Monde avec AFP",
    teaser: `The James-Webb Space Telescope (JWST) has achieved "the deepest view to date" of the Universe on a single target, revealing galaxies forming in a distant past, said Tuesday, May 27, the National Center for Scientific Research (CNRS) and the European Space Agency (ESA).`,
    url: "/image/pictures/article/gravitational_lensing.jpg"
  },
  {
    title: `Comet Lemmon and the Little Pinwheel.`,
    author: "Cédric de Decker/Louis Leroux-Géré/Vincent Martin/Thibault Rouillée",
    teaser: `Comet Lemmon (C/2025 A6) is still just outside the edge of naked-eye visibility, according to reports, but it is showing fine, rapidly changing detail in images. These astroimagers caught Lemmon as it was passing the Little Pinwheel Galaxy (NGC 3184) on Oct. 5 with 45 minutes of LRGB exposure at a focal length of 400mm.`,
    url: "/image/pictures/article/comet_lemmon.jpg"
  },
  {
    title: `The Vera Rubin Observatory is ready to revolutionize astronomy`,
    author: "Lisa Grossman",
    teaser: `At 3 a.m. on a crisp May night in Chile, all seemed well with the world’s largest digital camera. Until it didn’t. Inside the newly built Vera C. Rubin Observatory, site project scientist Sandrine Thomas was running tests when a flat line representing the camera’s temperature started to spike. “That looks bad,” she thought. She was right. Worried scientists quickly shut down the telescope.`,
    url: "/image/pictures/article/lg_camera-ready_feat.webp"
  }
]

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
        <Link href={"/"} className="tag-logo push-action">
          <Image src="/image/icons/noun-stars-7127150.svg" alt="Stars" height={iconSize} width={iconSize} />
        </Link>
        <Link href={"/"} className="tag-logo push-action">
          <Image src="/image/icons/noun-galaxy-3544621.svg" alt="Stars" height={iconSize} width={iconSize} />
        </Link>
        <Link href={"/"} className="tag-logo push-action">
          <Image src="/image/icons/noun-planet-792.svg" alt="Stars" height={iconSize} width={iconSize} />
        </Link>
        <Link href={"/"} className="tag-logo push-action">
          <Image src="/image/icons/noun-nebula-1578521.svg" alt="Stars" height={iconSize} width={iconSize} />
        </Link>
        <Link href={"/"} className="tag-logo push-action">
          <Image src="/image/icons/noun-space-station-1219999.svg" alt="Stars" height={iconSize} width={iconSize} />
        </Link>
      </section>
      <hr className="section-separator"/>

      {/* Gallery Section */}
      <section id="gallery">
        <h2 className="glow spacing-letter-big">Featured Pictures Gallery</h2>
        <BentoGallery elementList={imageBentoList}/>
        <button className="button-cta-reverse button-normal push-action">See More...</button>
      </section>
      <hr className="section-separator"/>

      {/* Article Section */}
      <section id="article">
        <h2 className="glow spacing-letter-big">Articles</h2>
        <ArticlePreview elementList={articleList}/>
        <button className="button-cta-reverse button-normal push-action">See More...</button>
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
