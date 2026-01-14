import languageList from "../language"
import { LanguageInput, ThumbnailSize, ThumbnailSizeInput } from "../types/utilitisesType"
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'
// String Tool Section

const stringReducer = (rawString: string, maxLenght: number) => {
    if (rawString.length > maxLenght) {
        return rawString.slice(0, (maxLenght))
    }
    return rawString
}

const stringCuter = (rawString: string, pattern: string) => {
    return rawString.split(pattern)
}

// Long Text Size Calculator depending on sreen size

const handleLongTextSize = (textRow: number, containerWidth: number, fontSize: number) => {
  return Math.floor( ( containerWidth  / fontSize) * textRow )
}

// Number Format Section

const numberReducerFormat = (rawNumber: number) => {
    if(rawNumber < 1000)
        return `${rawNumber}`
    // K
    if (rawNumber >= 1000 && rawNumber < 10000)
        return `${String(rawNumber).charAt(0)},${String(rawNumber).charAt(1)} K`
    if (rawNumber >= 10000 && rawNumber < 100000)
         return `${String(rawNumber).slice(0,2)} K`
    if (rawNumber >= 100000 && rawNumber < 1000000)
         return `${String(rawNumber).slice(0,3)} K`
    // M
    if (rawNumber >= 1000000 && rawNumber < 10000000)
        return `${String(rawNumber).charAt(0)},${String(rawNumber).charAt(1)} M`
    if (rawNumber >= 10000000 && rawNumber < 100000000)
         return `${String(rawNumber).slice(0,2)} M`
    if (rawNumber >= 100000000 && rawNumber < 1000000000)
         return `${String(rawNumber).slice(0,3)} M`
    // Md
    if (rawNumber >= 1000000000 && rawNumber < 10000000000)
        return `${String(rawNumber).charAt(0)},${String(rawNumber).charAt(1)} G`
    if (rawNumber >= 10000000000 && rawNumber < 100000000000)
         return `${String(rawNumber).slice(0,2)} G`
    if (rawNumber >= 100000000000 && rawNumber < 1000000000000)
         return `${String(rawNumber).slice(0,3)} G`
    // T
    if (rawNumber >= 1000000000000 && rawNumber < 10000000000000)
        return `${String(rawNumber).charAt(0)},${String(rawNumber).charAt(1)} T`
    if (rawNumber >= 10000000000000 && rawNumber < 100000000000000)
         return `${String(rawNumber).slice(0,2)} T`
    if (rawNumber >= 100000000000000 && rawNumber < 1000000000000000)
         return `${String(rawNumber).slice(0,3)} T`
    if (rawNumber >= 1000000000000000)
        return  `${String(rawNumber).slice(0,-12)} T`
}

const formattedValue = (value: number) => Intl.NumberFormat("no").format(value);

// DATE Format Section

const timeAgo = (rawdate: Date | string | number, language: LanguageInput): string => {
  const now = new Date().getTime();
  const past = new Date(rawdate).getTime();

  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 0) {
    return languageList[language].date.justNow;
  }

  type Unit = {
  label:
  "year" |
  "month" |
  "week" |
  "day" |
  "hour" |
  "minute" |
  "second" ,
  seconds: number 
}

  const units: Unit[] = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 }
  ];

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value >= 1) {
      const plural = value > 1 ? "plural" : "singular";
      return `${languageList[language].date.prefix} ${value} ${languageList[language].date[unit.label][plural]} ${languageList[language].date.sufix}`;
    }
  }

  return languageList[language].date.justNow;
}

const formatDate = (date: Date | string | number): string =>{
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

// Image Url

const ImageUrl = (url: string, type: "full" | "thumbnail" ,size?: ThumbnailSizeInput) =>{
  if (type ==="full")
    return (SERVER_URL + "/" + url).replaceAll("\\", '/')
  return (SERVER_URL + "/" + url.replace("full\\", `thumbnail\\${size}_`)).replaceAll("\\", '/').slice(0, -3) + "webp"
}

const thumbnailSize: ThumbnailSize = {
  image: {
    400: 400,
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
    300: 300,
    750: 750
  } 
}

// Tag String

const tagFormat = (tagInput: string) => {
  const trimedImput = 
    tagInput.replaceAll("_", " ")
      .replaceAll("&", " ")
      .replaceAll("=", " ")
      .replaceAll("#", " ")
      .trim()
      .replace(/\s\s+/g, ' ')
      .normalize("NFD").replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
    const rawTagList = trimedImput.split(" ").filter((item)=> item.length >= 3 && item.length <= 50)
    const filteredTagList: string[] = []
    rawTagList.forEach((item)=>{
      if(!filteredTagList.includes(item) && item !== "")
        filteredTagList.push(item)
    })
    let newTags = ""
    filteredTagList.forEach((item)=>{
      newTags += item + "_"
    })
    return newTags.slice(0, -1)
}

export {
    stringReducer, 
    stringCuter, 
    numberReducerFormat, 
    timeAgo, 
    formatDate, 
    formattedValue,
    handleLongTextSize,
    ImageUrl,
    thumbnailSize,
    tagFormat
}

