const generateColor = (seed: string) => {
    let hash = ""
    for (let i = 0; i < seed.length; i++){
        hash += seed.charCodeAt(i)
    }
    return Math.floor((Math.abs(Math.sin(Number(hash)) * 16777215))).toString(16)
}

export {generateColor}
        
