import { useState } from "react";
import { IsTyping } from "../types/utilitisesType";

let isTypingTimeOut: ReturnType<typeof setTimeout> | null = null

const useIsTyping = ()=> {

    const [isTyping, setIsTyping] = useState<IsTyping>({state: false, type: ""})
    const handleTyping = (type: string) => {
        if (isTypingTimeOut !== null) {
            clearTimeout(isTypingTimeOut);
            isTypingTimeOut = null
        }
        else setIsTyping((prevState)=>{
            const newState = {...prevState}
            newState.state = true
            newState.type = type
            return newState
        })   
        isTypingTimeOut = setTimeout(() => {
            setIsTyping((prevState)=>{
            const newState = {...prevState}
            newState.state = false
            return newState
        })
            isTypingTimeOut = null
        }, 1250);
    }
    return { isTyping, handleTyping}
}

export default useIsTyping
