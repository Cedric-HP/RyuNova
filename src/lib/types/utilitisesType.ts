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
    imageCategory: "image" | "avatar" | "banner"
    fetch: FetchState,
  }
}
// Respond Type

type RegisterRespond = {
  state: boolean,
  data: {
    id: number,
    name: string,
  },
  message: string,
  error: string
}

type LoginRespond = {
  state: boolean,
  data: {
    userId: number,
    token: string,
  },
  message: string,
  error: string
}

type ProfilRespond = {
  state: boolean,
  data: ProfileData,
  message: string,
  error: string
}


type CheckDuplicateRespond = {
  state: boolean,
  type: "name" | "email",
  value: string,
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
  ProfilRespond
}