import { stringCuter, stringReducer } from "@/lib/tools/stringTools";
import { type FC } from "react";
type Iprops = {
    text: string,
    sizeCute: number,
    displayFull: boolean,
}

const LongTextDisplay: FC<Iprops>  = ( {text = "Text Here", sizeCute = 100, displayFull = false} ) => {
    const textList = stringCuter(text, "\n")
    const reducedText = stringReducer(text, sizeCute)
    const textListShort = stringCuter(reducedText.text, "\n")
    return (
        <>  
            <div className="text-section">
                {displayFull ? textList.map((item, index)=>{
                    return <p key={index}>{item}</p>
                }) : textListShort.map((item, index)=>{
                    return <p key={index}>{item}</p>
                }) }
                {!displayFull && reducedText.isReduced ? <>
                <div className="text-section-fade"></div>
                </> : <></>}
            </div>
        </>
    )
}

export default LongTextDisplay