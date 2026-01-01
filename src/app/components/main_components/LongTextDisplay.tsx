import { handleLongTextSize, stringCuter, stringReducer } from "@/lib/tools/stringTools";
import { useWatchHeight } from "@/lib/tools/useWatchHeight";
import { useWatchWidth } from "@/lib/tools/useWatchWidth";
import { JSX, useEffect, useMemo, useRef, useState, type FC } from "react";
type Iprops = {
    text: string,
    displayFull: boolean,
    row: number,
}

const LongTextDisplay: FC<Iprops>  = ( {text = "Text Here", displayFull = false, row=1} ) => {

    // Overflow Detection Declarations

    const refContainer = useRef<HTMLDivElement | null>(null)
    const heightContainer = useWatchHeight(refContainer)
    const widthContainer = useWatchWidth(refContainer)
    const [isOverFlow, setIsOverflow] = useState<boolean>(false)
    const sizeCute = useMemo(()=>100 + handleLongTextSize(row, widthContainer.observedEltWidth , 8),[row, widthContainer.observedEltWidth])

    // Text Reduced / Text

    const textList: JSX.Element[] = useMemo(()=> 
        stringCuter(text, "\n").map((item, index)=>{
                return <p key={index}>{item}</p>
    }),[text])

    const textListShort: JSX.Element[] = useMemo(()=> 
        stringCuter(stringReducer(text, sizeCute), "\n").map((item, index)=>{
                return <p key={index}>{item}</p>
    }),[sizeCute, text])

    // Text-Container

    const textContainer: JSX.Element = useMemo(()=>
        <div className="text-container" ref={refContainer}>
            {displayFull ? textList : textListShort }
        </div>
    ,[displayFull, textList, textListShort])

    // Row Declaration
    const rowArray: number[] = useMemo(()=>[],[])
    useEffect(()=>{
        rowArray.splice(0, rowArray.length)
        for(let i = 1; i <= row; i++) {
            rowArray.push(i) 
        } 
    },[row, rowArray])
    const [rowList, setRowList] = useState<JSX.Element[]>([])

    useEffect(()=>{
        if(!displayFull) {
            setRowList(()=> rowArray.map((__, index)=>{
                return <div key={`row_${index}`} className={`row-text-container ${index + 1 === row && isOverFlow ? "text-mask" : ""}`}>
                    <div className="text-container" style={{top: -(25 * index)+"px" }}>
                        {textListShort}
                    </div>
                </div>
            })
            )
        }
    },[displayFull, isOverFlow, row, rowArray, textListShort])

    useEffect(()=>{
        setIsOverflow(()=> 25*row < heightContainer.observedEltHeight)
    },[heightContainer, row])

    return (
        <>  
            <div 
                className="text-section" 
                style={{height: displayFull ? "fit-content" : 25*row+"px"}}
            >
                {!displayFull ? rowList : <></>}
                {textContainer}
                {!displayFull && isOverFlow ? <>
                <div className="text-section-fade">...</div>
                </> : <></>}
            </div>
        </>
    )
}

export default LongTextDisplay
