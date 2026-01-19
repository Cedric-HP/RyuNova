import { ContentData, IdElement, ProfileData, UserData } from "./contenteType"
//-------------------------------------------------------------------------
// Utilitises Type

type WindowSize = {
  width: number | undefined,
  height: number | undefined,
}

type IsTyping = {
  state: boolean,
  type: string
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

type SorterInput = "view" | "like" | "date" | "follower"

type TypeInput = "image" | "article" | "user" | "comment"

type FullScreenInput = "" | "image" | "log-reg" | "user-description" | "image-upload" | "need-to-login"

type FetchingInput = "idle" | "fetching" | "done" | "error"

type LogRegInput = "log" | "reg"

type InputStateInput = "idle" | "valid" | "invalid"

type ImageCategoryInput = "image" | "avatar" | "banner"

type CustomSelectorsInput = "" | "language" | "user"
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
  contentType: "image" | "comment"
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
    currentImage: ContentData,
    customSelectorDisplayed: CustomSelectorsInput
}

type AuthSliceReducerType = {
  accessToken: string,
  authorized: boolean,
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
    exist: boolean,
    fetch: FetchState
  },
  getFollow: {
    targetedUserId: number,
    fetch: FetchState
  },
  currentImage: ContentData,
  currentUser: UserData,
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
  state: boolean,
  code: number,
  data: UserData,
  message: string,
  error: string
}

type GetFollowRespond = {
  state: boolean,
  code: number,
  data: {following: IdElement[]},
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
  IsTyping,
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
  AvatarSizeInput
}