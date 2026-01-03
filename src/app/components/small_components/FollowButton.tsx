import { useState, type FC } from "react";
import { useGlobalContext } from "../Navbar";
import languageList from "@/lib/language";
type Iprops = {
    urserId: number,
}

const FollowButton: FC<Iprops>  = ( {urserId= -1} ) => {

    const [testFollow, setTestFollow] = useState<boolean>(false)
    const { language } = useGlobalContext()

    return ( 
        <button className={`button-normal push-action ${testFollow ? "button-cta-reverse" : "button-cta"}`} onClick={()=>setTestFollow((prestate)=> !prestate)}>
            {testFollow ? languageList[language].button.unfollow : languageList[language].button.follow}
        </button>
    )
}

export default FollowButton