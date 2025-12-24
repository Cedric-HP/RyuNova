const stringReducer = (rawString: string, maxLenght: number) => {
    if (rawString.length > maxLenght) {
        return rawString.slice(0, (maxLenght-3)) + "..."

    }
    return rawString
}

const stringCuter = (rawString: string, pattern: string) => {
    return rawString.split(pattern)
}

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
export {stringReducer, stringCuter, numberReducerFormat}