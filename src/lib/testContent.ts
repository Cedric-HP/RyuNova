import { CommentData, ContentData, UserData } from "./types/contenteType"


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
    tags: [{name: "planet"}],
    commentList: []
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
    tags: [{name: "gallaxy"}, {name: "stars"}],
    commentList: []
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
    tags: [{name: "planet"}],
    commentList: []
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
    tags: [{name: "nebula"}],
    commentList: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}]
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
    tags: [{name: "gallaxy"}],
    commentList: []
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
    tags: [{name: "iss"}, {name: "moon"}, {name: "planet"}],
    commentList: []
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
    tags: [{name: "nebula"}],
    commentList: []
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
    tags: [{name: "planet"}, {name: "iss"}],
    commentList: []
  },
  {
    id: 9,
    title: "The Moon",
    author: "Zane Landers",
    authorId: 3,
    description: "",
    url: "/image/pictures/bento/Moon.webp",
    views: 524,
    likes: 66,
    createdAt: "2019-07-05",
    tags: [{name: "planet"}, {name: "moon"}],
    commentList: []
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
    tags: [{name: "planet"}],
    commentList: []
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
    createdAt: "7/28/2023, 8:00:14 PM",
    tags: [{name: "nebula"}, {name: "telescope"}],
    commentList: []
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
    commentList: []
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
    commentList: []
  }
]

const userListTest: UserData[] = [
  {
    id: 1,
    name: `NASA`,
    description: `National Aeronautics and Space Administration. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptates nisi nihil atque neque recusandae temporibus ducimus ad eius dolorem, tenetur distinctio soluta placeat dicta ullam pariatur, odio, in doloremque quae \n\nillum sequi? A consequuntur tenetur aut rem fugiat autem deserunt debitis ab, accusantium, vero nihil atque eum quisquam necessitatibus vitae esse excepturi placeat consequatur, vel labore nam minima itaque perspiciatis. Officiis, iusto earum tempora eveniet recusandae blanditiis deleniti \n\nnulla hic error quo aliquid quis reprehenderit illum provident perspiciatis labore exercitationem dolor itaque consequatur eos excepturi enim. Molestias dolor autem saepe itaque omnis voluptatibus fugit ex reiciendis aliquid tempore assumenda aperiam veritatis repudiandae ab \ntenetur nihil quam perferendis accusantium ducimus eligendi, quae nemo? Dolor aut culpa error quae suscipit \nipsam eaque ipsa voluptate alias \ndignissimos. Nisi fuga illo, aliquid nostrum sapiente esse cum autem pariatur neque tempore nulla odio laborum ex voluptates \neligendi itaque similique laboriosam quo maiores! Deleniti perferendis accusamus quos eaque voluptatum maiores et culpa, similique quisquam nostrum ipsam, tempore, illo exercitationem veniam incidunt \nperspiciatis sed laborum aperiam nulla quis unde quas ex tempora! Accusamus, nulla consequuntur? Est numquam quas corporis maiores, ut ipsam aut accusamus odio unde ab eligendi. Aspernatur vitae atque in quisquam nulla necessitatibus sit quia a, rem dicta, \nconsectetur repellendus! Odit, vel! Magni mollitia delectus architecto aspernatur deserunt, dignissimos cumque rem sunt, nisi ullam non ab quaerat facilis quo quos rerum nemo distinctio voluptatum quod saepe \nperferendis tempora est porro. Mollitia cum molestiae, nobis distinctio a sunt eligendi voluptate id at optio quos itaque enim facilis explicabo saepe assumenda quibusdam ratione, impedit nemo eum excepturi nulla ab quod aliquid? Dolor repellat aliquam repudiandae earum explicabo quasi adipisci, corporis ipsa iusto ullam error sed possimus dolorum nulla iure sapiente odit itaque, tenetur, voluptas saepe accusamus obcaecati alias officia necessitatibus! Neque expedita earum odit omnis rem impedit ad quos molestiae et? Adipisci totam et possimus laudantium, delectus consectetur quos excepturi beatae doloribus enim quis rem laboriosam sapiente recusandae sequi tempore optio odio itaque iste rerum dignissimos corrupti tempora placeat! Aliquid expedita odit, eius molestias aliquam alias labore fugiat illo rem accusamus fugit eveniet voluptate nemo laborum, maxime repellat impedit voluptas assumenda necessitatibus mollitia iusto doloribus eos eligendi. Corrupti dicta pariatur dolorum, labore saepe reprehenderit quo accusamus ea id asperiores praesentium est dolor. Autem maiores esse expedita ex. Illum laboriosam dignissimos ipsam corrupti optio nulla in, et necessitatibus repellat enim ipsum tempore cumque, doloremque temporibus accusantium sapiente, quam aliquid incidunt. Voluptatem aspernatur iusto illo voluptatibus, voluptates quidem, laboriosam fugit recusandae rem dolorum eveniet odio hic iure unde quisquam reiciendis ullam mollitia possimus, provident quo labore cum libero eum? Nihil praesentium cum, laborum dolorem id velit enim mollitia libero recusandae veniam reprehenderit animi asperiores incidunt. Et voluptatem magnam, itaque fuga cupiditate placeat officiis aspernatur maiores harum. Qui, deleniti, quam architecto adipisci alias, laborum placeat exercitationem autem minus ipsa aliquid? Ad, qui laboriosam saepe in eos laborum mollitia necessitatibus nemo. Ad quos, exercitationem voluptatum distinctio excepturi inventore. Facilis, tempora exercitationem! Quas provident, vel aperiam aspernatur exercitationem est pariatur ullam!`,
    avatarUrl: "/image/pictures/avatar/nasa-logo-png_seeklogo-97034.png",
    bannerUrl: "/image/pictures/banner/ascans-2-003.jpg",
    views: 17863459550,
    likes: 35468182,
    followers: 34625694,
    images: 358456,
    articles: 132,
    createdAt: "8/24/2012, 8:00:12"
  },
  {
    id: 2,
    name: `HYPERNOVA GBX`,
    description: `The Gooner Lord At 3 a.m. on a crisp May night in Chile, all seemed well with the world’s largest digital camera. Until it didn’t. Inside the newly built Vera C. Rubin Observatory, site project scientist Sandrine Thomas was running tests when a flat line`,
    avatarUrl: "/image/pictures/avatar/GBX_LOGO_Head_PNG.png",
    bannerUrl: "/image/pictures/banner/hypernova-banner.jpg",
    views: 999999999999999,
    likes: 999999999999999,
    followers: 999999999999999,
    images: 999999999999999,
    articles: 999999999999999,
    createdAt: "10/23/2002, 12:59:23"
  },
  {
    id: 3,
    name: `The Otaku`,
    description: `Otaku for life!`,
    avatarUrl: "/image/pictures/avatar/Capture_decran_2023-12-17_204729.png",
    bannerUrl: "",
    views: 3469,
    likes: 675,
    followers: 246,
    images: 76,
    articles: 0,
    createdAt: "8/24/2018, 8:00:12"
  },
  {
    id: 4,
    name: `THE DEATH STAR 2020`,
    description: `THE EMPIRE WILL WIPE OUT ALL REPUBLICS ACROSS THE GALLAXY AND WILL ALL BATTLE WITH IT ULTIMATE WEAPON!`,
    avatarUrl: "/image/pictures/avatar/The_Death_Star.webp",
    bannerUrl: "/image/pictures/banner/death-star-banner.png",
    views: 4168245,
    likes: 183648,
    followers: 8226415,
    images: 7687,
    articles: 846,
    createdAt: "8/15/1999, 23:59:59"
  },
  {
    id: 5,
    name: `Pandora`,
    description: `Pandora will only make a bite of you at the first opportunity!`,
    avatarUrl: "/image/pictures/avatar/Pandora.jpg",
    bannerUrl: "/image/pictures/banner/isv-ventury.png",
    views: 24856,
    likes: 98979,
    followers: 542365,
    images: 7687,
    articles: 35,
    createdAt: "9/30/2072, 12:30:00"
  },
  {
    id: 6,
    name: `Random astronomer`,
    description: `A random astronomer.`,
    avatarUrl: "",
    bannerUrl: "",
    views: 7358,
    likes: 495,
    followers: 658,
    images: 94,
    articles: 0,
    createdAt: "10/8/2019, 8:47:06"
  },
  {
    id: 7,
    name: `_TenGuy`,
    description: `Ten Guys inside him + 2 balls.`,
    avatarUrl: "/image/pictures/avatar/_TGLogo.png",
    bannerUrl: "",
    views: 931576346562,
    likes: 64167452,
    followers: 934975246,
    images: 31675642,
    articles: 183,
    createdAt: "17/9/2019, 12:12:12"
  },
  {
    id: 8,
    name: `Bob Lennon`,
    description: `BONSOIR!! Je suis Bob Lennon AH AH!! ET BINVENUE, BIENVENUE DANS..... LA CUUUUUUUUVE!!!!`,
    avatarUrl: "/image/pictures/avatar/bob_avatar.png",
    bannerUrl: "/image/pictures/banner/bob_banner.png",
    views: 76859124,
    likes: 3795454,
    followers: 79348655,
    images: 3546851,
    articles: 0,
    createdAt: "15/4/2009, 4:05:45"
  },
  {
    id: 9,
    name: `Antoine Daniel`,
    description: `Le dieux des internets!`,
    avatarUrl: "/image/pictures/avatar/Antoine_Daniel.jpg",
    bannerUrl: "",
    views: 64894657,
    likes: 9893894,
    followers: 98746354,
    images: 21684545,
    articles: 0,
    createdAt: "13/11/2003, 1:38:05"
  }
]

const commentList: CommentData[] = [
  {
    id: 1,
    userId: 2,
    userName: "HYPERNOVA GBX",
    url: "/image/pictures/avatar/GBX_LOGO_Head_PNG.png", 
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptates nisi nihil atque neque recusandae temporibus ducimus ad eius dolorem, tenetur distinctio soluta placeat dicta ullam pariatur, odio, in doloremque quae \n\nillum sequi? A consequuntur tenetur aut rem fugiat autem deserunt debitis ab, accusantium, vero nihil atque eum quisquam necessitatibus vitae esse excepturi placeat consequatur, vel labore nam minima itaque perspiciatis. Officiis, iusto earum tempora eveniet recusandae blanditiis deleniti \n\nnulla hic error quo aliquid quis reprehenderit illum provident perspiciatis labore exercitationem dolor itaque consequatur eos excepturi enim. Molestias dolor autem saepe itaque omnis voluptatibus fugit ex reiciendis aliquid tempore assumenda aperiam veritatis repudiandae ab \ntenetur nihil quam perferendis accusantium ducimus eligendi, quae nemo? Dolor aut culpa error quae suscipit \nipsam eaque ipsa voluptate alias \ndignissimos. Nisi fuga illo, aliquid nostrum sapiente esse cum autem pariatur neque tempore nulla odio laborum ex voluptates \neligendi itaque similique laboriosam quo maiores! Deleniti perferendis accusamus quos eaque voluptatum maiores et culpa, similique quisquam nostrum ipsam, tempore, illo exercitationem veniam incidunt \nperspiciatis sed laborum aperiam nulla quis unde quas ex tempora! Accusamus, nulla consequuntur? Est numquam quas corporis maiores, ut ipsam aut accusamus odio unde ab eligendi. Aspernatur vitae atque in quisquam nulla necessitatibus sit quia a, rem dicta, \nconsectetur repellendus! Odit, vel! Magni mollitia delectus architecto aspernatur deserunt, dignissimos cumque rem sunt, nisi ullam non ab quaerat facilis quo quos rerum nemo distinctio voluptatum quod saepe \nperferendis tempora est porro. Mollitia cum molestiae, nobis distinctio a sunt eligendi voluptate id at optio quos itaque enim facilis explicabo saepe assumenda quibusdam ratione, impedit nemo eum excepturi nulla ab quod aliquid? Dolor repellat aliquam repudiandae earum explicabo quasi adipisci, corporis ipsa iusto ullam error sed possimus dolorum nulla iure sapiente odit itaque, tenetur, voluptas saepe accusamus obcaecati alias officia necessitatibus! Neque expedita earum odit omnis rem impedit ad quos molestiae et? Adipisci totam et possimus laudantium, delectus consectetur quos excepturi beatae doloribus enim quis rem laboriosam sapiente recusandae sequi tempore optio odio itaque iste rerum dignissimos corrupti tempora placeat! Aliquid expedita odit, eius molestias aliquam alias labore fugiat illo rem accusamus fugit eveniet voluptate nemo laborum, maxime repellat impedit voluptas assumenda necessitatibus mollitia iusto doloribus eos eligendi. Corrupti dicta pariatur dolorum, labore saepe reprehenderit quo accusamus ea id asperiores praesentium est dolor. Autem maiores esse expedita ex. Illum laboriosam dignissimos ipsam corrupti optio nulla in, et necessitatibus repellat enim ipsum tempore cumque, doloremque temporibus accusantium sapiente, quam aliquid incidunt. Voluptatem aspernatur iusto illo voluptatibus, voluptates quidem, laboriosam fugit recusandae rem dolorum eveniet odio hic iure unde quisquam reiciendis ullam mollitia possimus, provident quo labore cum libero eum? Nihil praesentium cum, laborum dolorem id velit enim mollitia libero recusandae veniam reprehenderit animi asperiores incidunt. Et voluptatem magnam, itaque fuga cupiditate placeat officiis aspernatur maiores harum. Qui, deleniti, quam architecto adipisci alias, laborum placeat exercitationem autem minus ipsa aliquid? Ad, qui laboriosam saepe in eos laborum mollitia necessitatibus nemo. Ad quos, exercitationem voluptatum distinctio excepturi inventore. Facilis, tempora exercitationem! Quas provident, vel aperiam aspernatur exercitationem est pariatur ullam!",
    likes: 4546574,
    createdAt: "12/11/2025, 13:05:35",
    replyList: [{id: 2}, {id: 6}],
    isReply: false
  },
  {
    id: 2,
    userId: 1,
    userName: "NASA",
    url: "/image/pictures/avatar/nasa-logo-png_seeklogo-97034.png", 
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor voluptates nisi nihil atque neque recusandae temporibus ducimus ad eius dolorem, tenetur distinctio soluta placeat dicta ullam pariatur, odio, in doloremque quae \n\nillum sequi? A consequuntur tenetur aut rem fugiat autem deserunt debitis ab, accusantium, vero nihil atque eum quisquam necessitatibus vitae esse excepturi placeat consequatur, vel labore nam minima itaque perspiciatis. Officiis, iusto earum tempora eveniet recusandae blanditiis deleniti ",
    likes: 4,
    createdAt: "12/11/2025, 13:35:35",
    replyList: [{id: 4}],
    isReply: true
  },
  {
    id: 3,
    userId: 3,
    userName: "The Otaku",
    url: "/image/pictures/avatar/Capture_decran_2023-12-17_204729.png", 
    comment: "Good Picture",
    likes: 16,
    createdAt: "12/25/2025, 17:58:30",
    replyList: [],
    isReply: false
  },
  {
    id: 4,
    userId: 2,
    userName: "HYPERNOVA GBX",
    url: "/image/pictures/avatar/GBX_LOGO_Head_PNG.png", 
    comment: "I'm COOMING!!!",
    likes: 2,
    createdAt: "12/13/2025, 10:30:26",
    replyList: [{id: 5}],
    isReply: true
  },
  {
    id: 5,
    userId: 3,
    userName: "The Otaku",
    url: "/image/pictures/avatar/Capture_decran_2023-12-17_204729.png", 
    comment: "The Fuck was that XD?!",
    likes: 2,
    createdAt: "12/13/2025, 10:45:26",
    replyList: [],
    isReply: true
  },
  {
    id: 6,
    userId: 3,
    userName: "The Otaku",
    url: "/image/pictures/avatar/Capture_decran_2023-12-17_204729.png", 
    comment: "Lorem ???",
    likes: 3,
    createdAt: "12/13/2025, 11:04:05",
    replyList: [],
    isReply: true
  },
  {
    id: 7,
    userId: 6,
    userName: "Random astronomer",
    url: "", 
    comment: "The famous one!",
    likes: 496,
    createdAt: "12/26/2025, 18:09:56",
    replyList: [],
    isReply: false
  },
  {
    id: 8,
    userId: 4,
    userName: "THE DEATH STAR 2020",
    url: "/image/pictures/avatar/The_Death_Star.webp", 
    comment: "These are the remains of Tatwin! It was destroyed by DS-1.",
    likes: 49825,
    createdAt: "12/11/2025, 13:38:47",
    replyList: [],
    isReply: false
  }
]
export {articleList, imageBentoList, userListTest, commentList}