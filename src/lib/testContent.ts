import { ContentData, UserData } from "./types/contenteType"


const imageBentoList: ContentData[] = [
  {
    id: 1,
    title: "Jupiter",
    author: "NASA",
    authorId: 1,
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
    authorId: 1,
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
    authorId: 1,
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
    authorId: 1,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptates nisi nihil atque neque recusandae temporibus ducimus ad eius dolorem, tenetur distinctio soluta placeat dicta ullam pariatur, odio, in doloremque quae \n\nillum sequi? A consequuntur tenetur aut rem fugiat autem deserunt debitis ab, accusantium, vero nihil atque eum quisquam necessitatibus vitae esse excepturi placeat consequatur, vel labore nam minima itaque perspiciatis. Officiis, iusto earum tempora eveniet recusandae blanditiis deleniti \n\nnulla hic error quo aliquid quis reprehenderit illum provident perspiciatis labore exercitationem dolor itaque consequatur eos excepturi enim. Molestias dolor autem saepe itaque omnis voluptatibus fugit ex reiciendis aliquid tempore assumenda aperiam veritatis repudiandae ab \ntenetur nihil quam perferendis accusantium ducimus eligendi, quae nemo? Dolor aut culpa error quae suscipit \nipsam eaque ipsa voluptate alias \ndignissimos. Nisi fuga illo, aliquid nostrum sapiente esse cum autem pariatur neque tempore nulla odio laborum ex voluptates \neligendi itaque similique laboriosam quo maiores! Deleniti perferendis accusamus quos eaque voluptatum maiores et culpa, similique quisquam nostrum ipsam, tempore, illo exercitationem veniam incidunt \nperspiciatis sed laborum aperiam nulla quis unde quas ex tempora! Accusamus, nulla consequuntur? Est numquam quas corporis maiores, ut ipsam aut accusamus odio unde ab eligendi. Aspernatur vitae atque in quisquam nulla necessitatibus sit quia a, rem dicta, \nconsectetur repellendus! Odit, vel! Magni mollitia delectus architecto aspernatur deserunt, dignissimos cumque rem sunt, nisi ullam non ab quaerat facilis quo quos rerum nemo distinctio voluptatum quod saepe \nperferendis tempora est porro. Mollitia cum molestiae, nobis distinctio a sunt eligendi voluptate id at optio quos itaque enim facilis explicabo saepe assumenda quibusdam ratione, impedit nemo eum excepturi nulla ab quod aliquid? Dolor repellat aliquam repudiandae earum explicabo quasi adipisci, corporis ipsa iusto ullam error sed possimus dolorum nulla iure sapiente odit itaque, tenetur, voluptas saepe accusamus obcaecati alias officia necessitatibus! Neque expedita earum odit omnis rem impedit ad quos molestiae et? Adipisci totam et possimus laudantium, delectus consectetur quos excepturi beatae doloribus enim quis rem laboriosam sapiente recusandae sequi tempore optio odio itaque iste rerum dignissimos corrupti tempora placeat! Aliquid expedita odit, eius molestias aliquam alias labore fugiat illo rem accusamus fugit eveniet voluptate nemo laborum, maxime repellat impedit voluptas assumenda necessitatibus mollitia iusto doloribus eos eligendi. Corrupti dicta pariatur dolorum, labore saepe reprehenderit quo accusamus ea id asperiores praesentium est dolor. Autem maiores esse expedita ex. Illum laboriosam dignissimos ipsam corrupti optio nulla in, et necessitatibus repellat enim ipsum tempore cumque, doloremque temporibus accusantium sapiente, quam aliquid incidunt. Voluptatem aspernatur iusto illo voluptatibus, voluptates quidem, laboriosam fugit recusandae rem dolorum eveniet odio hic iure unde quisquam reiciendis ullam mollitia possimus, provident quo labore cum libero eum? Nihil praesentium cum, laborum dolorem id velit enim mollitia libero recusandae veniam reprehenderit animi asperiores incidunt. Et voluptatem magnam, itaque fuga cupiditate placeat officiis aspernatur maiores harum. Qui, deleniti, quam architecto adipisci alias, laborum placeat exercitationem autem minus ipsa aliquid? Ad, qui laboriosam saepe in eos laborum mollitia necessitatibus nemo. Ad quos, exercitationem voluptatum distinctio excepturi inventore. Facilis, tempora exercitationem! Quas provident, vel aperiam aspernatur exercitationem est pariatur ullam!",
    url: "/image/pictures/bento/Crab_Nebula.jpg",
    views: 24837108,
    likes: 1824298,
    createdAt: "2011-10-15",
    tags: ["nebula"]
  },
  {
    id: 5,
    title: "Large Magellanic Cloud",
    author: "ESO, VISTA",
    authorId: 1,
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
    authorId: 1,
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
    authorId: 1,
    description: "",
    url: "/image/pictures/bento/pillars-of-creation.jpg",
    views: 36456795,
    likes: 1557294,
    createdAt: "2013-03-13",
    tags: ["nebula"]
  },
  {
    id: 8,
    title: "Low Earth Orbit",
    author: "NASA",
    authorId: 1,
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
    authorId: 1,
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
    authorId: 1,
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
    authorId: 1,
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
    authorId: 1,
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
    authorId: 1,
    description: `At 3 a.m. on a crisp May night in Chile, all seemed well with the world’s largest digital camera. Until it didn’t. Inside the newly built Vera C. Rubin Observatory, site project scientist Sandrine Thomas was running tests when a flat line representing the camera’s temperature started to spike. “That looks bad,” she thought. She was right. Worried scientists quickly shut down the telescope.`,
    url: "/image/pictures/article/lg_camera-ready_feat.webp",
    views: 50,
    likes: 50,
    createdAt: "2012-08-24",
    tags: ["obsevatory", "telescope"]
  }
]

const userList: UserData[] = [
  {
    id: 1,
    name: `NASA`,
    description: `National Aeronautics and Space Administration`,
    url: "/image/pictures/avatar/nasa-logo-png_seeklogo-97034.png",
    views: 1500,
    likes: 200,
    followers: 34625694,
  }
]
export {articleList, imageBentoList, userList}