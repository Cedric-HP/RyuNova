import { ContentData, ProfileData } from "./contenteType"

type WindowSize = {
  width: number | undefined,
  height: number | undefined,
}

// Imput types

type LanguageInput = "en" | "fr"

type SorterImput = "view" | "like" | "date" | "follower"

type TypeImput = "image" | "article" | "user" | "comment"

type FullScreenImput = "" | "image" | "log-reg" | "user-description"

type FetchingImput = "indle" | "feching" | "done" | "error"

type LogRegImput = "log" | "reg"

// Fetch Input

type RegisterImput = {
  name: string,
  email: string,
  password: string,
}

// Context Type

type GlobalContextType = {
  language: LanguageInput,
  windowSize: WindowSize,
}

// Reducer

type UtilitisesReducerType = {
    fullScreenDisplayed: FullScreenImput,
    logReg: LogRegImput,
    currentImage: ContentData,
}

type AuthSliceReducerType = {
  accessToken: string,
  userData: ProfileData,
  register: FetchState
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

// Fetch State

type FetchState = {
  fetchState: FetchingImput,
  message: string,
  error: string,
}

export type {
  SorterImput, 
  TypeImput, 
  LanguageInput,
  GlobalContextType,
  WindowSize,
  UtilitisesReducerType,
  FullScreenImput,
  AuthSliceReducerType,
  RegisterImput,
  RegisterRespond,
  LogRegImput
}