import { CommentData, ContentData, ProfileData, UserData } from "./contenteType"
//-------------------------------------------------------------------------
// Utilitises Type

type WindowSize = {
  width: number,
  height: number,
}

type ThumbnailSize = {
  image: {
    400: 400
    750: 750
  },
  avatar: {
    30: 30,
    50: 50,
    55: 55,
    75: 75,
    200: 200,
  },
  banner: {
    300: 300
    750: 750
  } 
}
//-------------------------------------------------------------------------
// Input types

type ThumbnailSizeInput = 30 | 50 | 55 | 75 | 200 | 400 | 500 | 750

type AvatarSizeInput = 30 | 50 | 55 | 75 | 200

type LanguageInput = "en" | "fr"

type SorterInput = "view" | "like" | "date" | "follow"

type OrderInput = "ASC" | "DESC"

type TypeInput = "image" | "article" | "user" | "comment"

type FullScreenInput = "" | "image" | "log-reg" | "user-description" | "image-upload" | "need-to-login"

type FetchingInput = "idle" | "fetching" | "done" | "error"

type LogRegInput = "log" | "reg"

type InputStateInput = "idle" | "valid" | "invalid"

type ImageCategoryInput = "image" | "avatar" | "banner"

type CustomSelectorsInput = "" | "language" | "user"

type CommentContentTypeInput = "image" | "article"

type AuthorizedInput = true | false | "idle"

type ContentInput = "image" | "comment" | "article"

//-------------------------------------------------------------------------
// Fetch Input

type RegisterInput = {
  name: string,
  email: string,
  password: string,
}

type LoginInput = {
  email: string,
  password: string,
}

type CheckDuplicateInput = {
  type: "name" | "email"
  value: string,
}

type ImageUploadInput = {
  token: string,
  formData: FormData
}

type FollowInput = {
  token: string,
  targetUserId: number
}

type ViewInput = {
  contentId: number,
  contentType: "image" | "article"
}

type SearchInput = {
  search: string,
  type: TypeInput,
  sort: SorterInput,
  tag: string,
  user: number,
  page: number
  order: OrderInput,
}

type CommentSearchInput = {
  id: number,
  type: ContentInput,
  sort: "date" | "like",
  limit: number,
  order: OrderInput
}

type CommentPostInput = {
  token: string,
  contentId: number,
  contentType: CommentContentTypeInput,
  targetCommentId: number,
  comment: string,
  isReply: boolean
}

type LikePostInput = {
  token: string,
  id: number,
  type: ContentInput
}

type GetUserInput = {
  isProfil: boolean,
  id: number,
}
//-------------------------------------------------------------------------
// Context Type

type GlobalContextType = {
  language: LanguageInput,
  windowSize: WindowSize,
}
//-------------------------------------------------------------------------
// Reducer

type UtilitisesReducerType = {
    fullScreenDisplayed: FullScreenInput,
    logReg: LogRegInput,
    currentLanguage: LanguageInput,
    customSelectorDisplayed: CustomSelectorsInput
}

type AuthSliceReducerType = {
  accessToken: string,
  authorized: AuthorizedInput,
  userData: ProfileData,
  register: {
    nameValid: {
      value: string,
      valid: InputStateInput
    },
    emailValid: {
      value: string,
      valid: InputStateInput
    },
    registerValid:  ValidateFetch,
    fetch: FetchState,
    fetchType: RegisterFetchType
  },
  login: {
    loginValid: ValidateFetch,
    fetch: FetchState,
  }
  profile: {
    fetch: FetchState,
  },
  logout: {
    fetch: FetchState,
  },
  imageUpload: {
    imageUploadValid: ValidateFetch,
    imageId: number,
    imageCategory: ImageCategoryInput,
    fetch: FetchState,
  },
  getImage: {
    exist: boolean,
    fetch: FetchState
  },
  getUser: {
    isProfil: boolean,
    exist: boolean,
    fetch: FetchState
  },
  getFollow: {
    targetedUserId: number,
    fetch: FetchState
  },
  getSearch: {
    respond: {
      page: number,
      pageSize: number,
      totalResults: number,
      totalPages: number,
      results: {
        image: ContentData[],
        article: ContentData[],
        user: UserData[]
      }
    },
    fetch: FetchState
  },
  getComment: {
    doPush: boolean,
    type: CommentContentTypeInput,
    respond: {
      page: number,
      pageSize: number,
      totalComment: number,
    },
    fetch: FetchState
  }
  postComment: {
    type: CommentContentTypeInput
    fetch: FetchState
  },
  postLike: {
    fetch: FetchState
  },
  currentImage: ContentData,
  currentContentUser: UserData,
  currentArticle: ContentData,
  currentUser: UserData,
}

// Action

type SetCommentType = {
  type: CommentContentTypeInput,
  reducer: "post" | "get"
}

//-------------------------------------------------------------------------
// Respond Type

type RegisterRespond = {
  state: boolean,
  code: number,
  data: {
    id: number,
    name: string,
  },
  message: string,
  error: string
}

type LoginRespond = {
  state: boolean,
  code: number,
  data: {
    userId: number,
    token: string,
  },
  message: string,
  error: string
}

type ProfilRespond = {
  state: boolean,
  code: number,
  authorized: boolean,
  data: ProfileData,
  message: string,
  error: string
}

type CheckDuplicateRespond = {
  state: boolean,
  code: number,
  type: "name" | "email",
  value: string,
  message: string,
  error: string
}

type ImageUploadRespond = {
  state: boolean,
  code: number,
  authorized: boolean,
  data: {
    id: number,
    imageCategory: ImageCategoryInput,
    url: string,
  },
  message: string,
  error: string
}

type GetImageRespond = {
  state: boolean,
  code: number,
  data: ContentData,
  message: string,
  error: string
}

type GetUserRespond = {
  isProfil: boolean
  state: boolean,
  code: number,
  data: UserData,
  message: string,
  error: string
}

type GetFollowRespond = {
  state: boolean,
  code: number,
  authorized: boolean,
  data: {
    method: "add" | "remove",
    targetUserId: number
  },
  message: string,
  error: string
}

type GetSearchRespond = {
  state: boolean,
  code: number,
  page: number,
  pageSize: number,
  totalResults: number,
  totalPages: number,
  results: {
    image: ContentData[],
    article: ContentData[],
    user: UserData[]
  }
  message: string,
  error: string
}

type GetCommentRespond = {
  state: boolean,
  code: number,
  page: number,
  pageSize: number,
  totalcomments: number,
  results: CommentData[],
  message: string,
  error: string
}

type PostCommentRespond = {
  state: boolean,
  code: number,
  authorized: boolean,
  data: CommentData,
  message: string,
  error: string
}

type PostLikeRespond = {
  state: boolean,
  code: number,
  authorized: boolean,
  method: "add" | "remove",
  type: ContentInput,
  targetContentId: number,
  message: string,
  error: string
}

type StantarRespond = {
  state: boolean,
  code: number,
  message: string,
  error: string
}
//-------------------------------------------------------------------------
// Fetch State

type FetchState = {
  fetchState: FetchingInput,
  error: string,
}

type ValidateFetch = {
  state: InputStateInput,
  message: string,
  error: string
}
//-------------------------------------------------------------------------
// Fetch Type

type RegisterFetchType = "" | "name" | "email" | "register"

// LocalView

type LocalViewList = LocalView[]

type LocalView = {
  userId: number,
  image: ContentView[]
}

type ContentView = {
  id: number,
  lastViewAt: Date
}

export type {
  SorterInput, 
  TypeInput, 
  LanguageInput,
  GlobalContextType,
  WindowSize,
  UtilitisesReducerType,
  FullScreenInput,
  AuthSliceReducerType,
  RegisterInput,
  RegisterRespond,
  LogRegInput,
  InputStateInput,
  CheckDuplicateInput,
  CheckDuplicateRespond,
  RegisterFetchType,
  LoginRespond,
  LoginInput,
  ProfilRespond,
  ImageUploadInput,
  ImageUploadRespond,
  ThumbnailSize,
  ThumbnailSizeInput,
  CustomSelectorsInput,
  GetImageRespond,
  GetUserRespond,
  ImageCategoryInput,
  GetFollowRespond,
  FollowInput,
  LocalViewList,
  LocalView,
  StantarRespond,
  ViewInput,
  AvatarSizeInput,
  OrderInput,
  SearchInput,
  GetSearchRespond,
  CommentContentTypeInput,
  GetCommentRespond,
  PostCommentRespond,
  CommentSearchInput,
  CommentPostInput,
  SetCommentType,
  LikePostInput,
  PostLikeRespond,
  GetUserInput
}