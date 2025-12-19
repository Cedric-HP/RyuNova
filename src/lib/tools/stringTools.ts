const stringReducer = (rawString: string, maxLenght: number) => {
    if (rawString.length > maxLenght) {
        return rawString.slice(0, (maxLenght-3)) + "..."

    }
    return rawString
}

const stringCuter = (rawString: string, pattern: string) => {
    return rawString.split(pattern)
}
export {stringReducer, stringCuter}