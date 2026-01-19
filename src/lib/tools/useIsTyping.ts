import { useState } from "react";
import { IsTyping } from "../types/utilitisesType";

let isTypingTimeOut: ReturnType<typeof setTimeout> | null = null

const useIsTyping = ()=> {

    const [isTyping, setIsTyping] = useState<IsTyping>({state: false, type: ""})

    const handleTyping = (type: string) => {
        // Reset the timeout if it runs
        if (isTypingTimeOut !== null) {
            clearTimeout(isTypingTimeOut);
            isTypingTimeOut = null
        }
        // If the timeout isn't running then set isTyping to true
        else setIsTyping((prevState)=>{
            const newState = {...prevState}
            newState.state = true
            newState.type = type
            return newState
        })
        // TimeOut to set IsTyping to false after 1.25 s   
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
