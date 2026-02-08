import { ContentData } from "./types/contenteType"

const articleList: ContentData[] = [
  {
    id: 1,
    title: `The James-Webb telescope captures a new image of the deep Universe`,
    author: "Le Monde avec AFP",
    authorId: 1,
    description: `The James-Webb Space Telescope (JWST) has achieved "the deepest view to date" of the Universe on a single target, revealing galaxies forming in a distant past, said Tuesday, May 27, the National Center for Scientific Research (CNRS) and the European Space Agency (ESA).`,
    url: "/image/pictures/article/gravitational_lensing.jpg",
    views: 1500,
    likes: 200,
    createdAt: "7/28/2023, 8:00:14 PM",
    tags: [{name: "nebula"}, {name: "telescope"}],
    commentList: [],
    totalComment: 0,
    parentComment:0
  },
  {
    id: 3,
    title: `Comet Lemmon and the Little Pinwheel.`,
    author: "Cédric de Decker/Louis Leroux-Géré/Vincent Martin/Thibault Rouillée",
    authorId: 1,
    description: `Comet Lemmon (C/2025 A6) is still just outside the edge of naked-eye visibility, according to reports, but it is showing fine, rapidly changing detail in images. These astroimagers caught Lemmon as it was passing the Little Pinwheel Galaxy (NGC 3184) on Oct. 5 with 45 minutes of LRGB exposure at a focal length of 400mm.`,
    url: "/image/pictures/article/comet_lemmon.jpg",
    views: 460,
    likes: 54,
    createdAt: "5/1/2025, 7:05:35 PM",
    tags: [{name: "comet"}],
    commentList: [],
    totalComment: 0,
    parentComment:0
  },
  {
    id: 3,
    title: `The Vera Rubin Observatory is ready to revolutionize astronomy`,
    author: "Lisa Grossman",
    authorId: 1,
    description: `At 3 a.m. on a crisp May night in Chile, all seemed well with the world’s largest digital camera. Until it didn’t. Inside the newly built Vera C. Rubin Observatory, site project scientist Sandrine Thomas was running tests when a flat line representing the camera’s temperature started to spike. “That looks bad,” she thought. She was right. Worried scientists quickly shut down the telescope.`,
    url: "/image/pictures/article/lg_camera-ready_feat.webp",
    views: 50,
    likes: 50,
    createdAt: "8/24/2012, 8:00:12 AM",
    tags: [{name: "obsevatory"}, {name: "telescope"}],
    commentList: [],
    totalComment: 0,
    parentComment:0
  }
]

export {articleList}