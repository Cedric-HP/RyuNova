import languageList from "../language"
import { LanguageInput } from "../types/contenteType"

// String Tool Section

const stringReducer = (rawString: string, maxLenght: number) => {
    if (rawString.length > maxLenght) {
        return rawString.slice(0, (maxLenght-3)) + "..."

    }
    return rawString
}

const stringCuter = (rawString: string, pattern: string) => {
    return rawString.split(pattern)
}

// Number Format Section

const numberReducerFormat = (rawNumber: number) => {
    if(rawNumber < 1000)
        return `${rawNumber}`
    // K
    if (rawNumber >= 1000 && rawNumber < 10000)
        return `${String(rawNumber).charAt(0)},${String(rawNumber).charAt(1)} k`
    if (rawNumber >= 10000 && rawNumber < 100000)
         return `${String(rawNumber).slice(0,2)} k`
    if (rawNumber >= 100000 && rawNumber < 1000000)
         return `${String(rawNumber).slice(0,3)} k`
    // M
    if (rawNumber >= 1000000 && rawNumber < 10000000)
        return `${String(rawNumber).charAt(0)},${String(rawNumber).charAt(1)} M`
    if (rawNumber >= 10000000 && rawNumber < 100000000)
         return `${String(rawNumber).slice(0,2)} M`
    if (rawNumber >= 100000000 && rawNumber < 1000000000)
         return `${String(rawNumber).slice(0,3)} M`
    // Md
    if (rawNumber >= 1000000000 && rawNumber < 10000000000)
        return `${String(rawNumber).charAt(0)},${String(rawNumber).charAt(1)} Md`
    if (rawNumber >= 10000000000 && rawNumber < 100000000000)
         return `${String(rawNumber).slice(0,2)} Md`
    if (rawNumber >= 100000000000 && rawNumber < 1000000000000)
         return `${String(rawNumber).slice(0,3)} Md`
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

export {stringReducer, stringCuter, numberReducerFormat, timeAgo, formatDate, formattedValue}

