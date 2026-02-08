import { useCallback, useRef, useState } from "react";

const useIsTyping = (): [boolean, () => void] => {

    const [isTyping, setIsTyping] = useState<boolean>(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleTyping = useCallback(() => {
        // Reset the timeout if it runs
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // If the timeout isn't running then set isTyping to true
        else setIsTyping(true)
        // TimeOut to set IsTyping to false after 1.25 s   
        timeoutRef.current = setTimeout(() => {
            setIsTyping(false)
            timeoutRef.current = null
        }, 1250);
    },[]);
    return [ isTyping, handleTyping];
};

export default useIsTyping


