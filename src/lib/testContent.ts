import { ContentData } from "./types/contenteType"


const imageBentoList: ContentData[] = [
  {
    id: 1,
    title: "Jupiter",
    author: "NASA",
    description: "",
    url: "/image/pictures/bento/jupiter.jpg",
    views: 500,
    likes: 50,
    createdAt: "2012-08-24",
    tags: ["planet"]
  },
  {
    id: 2,
    title: "Andromeda",
    author: "Pete Lawrence",
    description: "",
    url: "/image/pictures/bento/Andromeda-Galaxy.webp",
    views: 124,
    likes: 34,
    createdAt: "2015-02-16",
    tags: ["gallaxy", "stars"]
  },
  {
    id: 3,
    title: "Mars",
    author: "NASA, Hubble",
    description: "",
    url: "/image/pictures/bento/Mars.jpg",
    views: 465,
    likes: 40,
    createdAt: "2016-07-22",
    tags: ["planet"]
  },
  {
    id: 4,
    title: "Crab Nebula",
    author: "NASA, Hubble",
    description: "",
    url: "/image/pictures/bento/Crab_Nebula.jpg",
    views: 132,
    likes: 23,
    createdAt: "2011-10-15",
    tags: ["nebula"]
  },
  {
    id: 5,
    title: "Large Magellanic Cloud",
    author: "ESO, VISTA",
    description: "",
    url: "/image/pictures/bento/Large_Magellanic_Clound.jpg",
    views: 201,
    likes: 21,
    createdAt: "2021-02-21",
    tags: ["gallaxy"]
  },
  {
    id: 6,
    title: "ISS Transit",
    author: "Andrew McCarthy",
    description: "",
    url: "/image/pictures/bento/ISS_Transit_Moon.webp",
    views: 78,
    likes: 8,
    createdAt: "2020-04-30",
    tags: ["iss", "moon", "planet"]
  },
  {
    id: 7,
    title: "The Pillars of Creation",
    author: "NASA",
    description: "",
    url: "/image/pictures/bento/pillars-of-creation.jpg",
    views: 750,
    likes: 120,
    createdAt: "2013-03-13",
    tags: ["nebula"]
  },
  {
    id: 8,
    title: "Low Earth Orbit",
    author: "NASA",
    description: "",
    url: "/image/pictures/bento/earth_from_iss.jpg",
    views: 254,
    likes: 35,
    createdAt: "2024-06-12",
    tags: ["planet", "iss"]
  },
  {
    id: 9,
    title: "The Moon",
    author: "Zane Landers",
    description: "",
    url: "/image/pictures/bento/Moon.webp",
    views: 524,
    likes: 66,
    createdAt: "2019-07-05",
    tags: ["planet", "moon"]
  }
  ,
  {
    id: 10,
    title: "Uranus",
    author: "NASA, ESA",
    description: "",
    url: "/image/pictures/bento/Uranus.jpg",
    views: 156,
    likes: 48,
    createdAt: "2012-09-24",
    tags: ["planet"]
  }
]
const articleList: ContentData[] = [
  {
    id: 1,
    title: `The James-Webb telescope captures a new image of the deep Universe`,
    author: "Le Monde avec AFP",
    description: `The James-Webb Space Telescope (JWST) has achieved "the deepest view to date" of the Universe on a single target, revealing galaxies forming in a distant past, said Tuesday, May 27, the National Center for Scientific Research (CNRS) and the European Space Agency (ESA).`,
    url: "/image/pictures/article/gravitational_lensing.jpg",
    views: 1500,
    likes: 200,
    createdAt: "2023-07-28",
    tags: ["nebula", "telescope"]
  },
  {
    id: 3,
    title: `Comet Lemmon and the Little Pinwheel.`,
    author: "Cédric de Decker/Louis Leroux-Géré/Vincent Martin/Thibault Rouillée",
    description: `Comet Lemmon (C/2025 A6) is still just outside the edge of naked-eye visibility, according to reports, but it is showing fine, rapidly changing detail in images. These astroimagers caught Lemmon as it was passing the Little Pinwheel Galaxy (NGC 3184) on Oct. 5 with 45 minutes of LRGB exposure at a focal length of 400mm.`,
    url: "/image/pictures/article/comet_lemmon.jpg",
    views: 460,
    likes: 54,
    createdAt: "2014-05-01",
    tags: ["comet"]
  },
  {
    id: 3,
    title: `The Vera Rubin Observatory is ready to revolutionize astronomy`,
    author: "Lisa Grossman",
    description: `At 3 a.m. on a crisp May night in Chile, all seemed well with the world’s largest digital camera. Until it didn’t. Inside the newly built Vera C. Rubin Observatory, site project scientist Sandrine Thomas was running tests when a flat line representing the camera’s temperature started to spike. “That looks bad,” she thought. She was right. Worried scientists quickly shut down the telescope.`,
    url: "/image/pictures/article/lg_camera-ready_feat.webp",
    views: 50,
    likes: 50,
    createdAt: "2012-08-24",
    tags: ["obsevatory", "telescope"]
  }
]
export {articleList, imageBentoList}