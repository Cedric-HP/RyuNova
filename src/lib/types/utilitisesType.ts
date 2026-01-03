import { RefObject } from "react"
import { ContentData } from "./contenteType"

type WindowSize = {
  width: number | undefined,
  height: number | undefined,
}

// Imput types

type LanguageInput = "en" | "fr"

type SorterImput = "view" | "like" | "date" | "follower"

type TypeImput = "image" | "article" | "user" | "comment"

type FullScreenImput = "" | "image" | "log-reg" | "user-description"

// Context Type

type GlobalContextType = {
  language: LanguageInput,
  mainElement: RefObject<HTMLElement | null>,
  windowSize: WindowSize,
}

// Reducer

type UtilitisesReducerType = {
    fullScreenDisplayed: FullScreenImput,
    currentImage: ContentData,
}

export type {
  SorterImput, 
  TypeImput, 
  LanguageInput,
  GlobalContextType,
  WindowSize,
  UtilitisesReducerType,
  FullScreenImput
}