import { ContentData, ProfileData } from "./contenteType"

type WindowSize = {
  width: number | undefined,
  height: number | undefined,
}

type IsTyping = {
  state: boolean,
  type: string
}

// Input types

type LanguageInput = "en" | "fr"

type SorterInput = "view" | "like" | "date" | "follower"

type TypeInput = "image" | "article" | "user" | "comment"

type FullScreenInput = "" | "image" | "log-reg" | "user-description" | "image-upload"

type FetchingInput = "idle" | "feching" | "done" | "error"

type LogRegInput = "log" | "reg"

type InputStateInput = "idle" | "valid" | "invalid"

type ImageCategoryInput = "image" | "avatar" | "banner"

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

// Context Type

type GlobalContextType = {
  language: LanguageInput,
  windowSize: WindowSize,
}

// Reducer

type UtilitisesReducerType = {
    fullScreenDisplayed: FullScreenInput,
    logReg: LogRegInput,
    currentImage: ContentData,
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
  imageUpload: {
    imageUploadValid: ValidateFetch,
    imageCategory: ImageCategoryInput,
    fetch: FetchState,
  }
}
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

// Fetch Type

type RegisterFetchType = "" | "name" | "email" | "register"

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
  ImageUploadRespond
}