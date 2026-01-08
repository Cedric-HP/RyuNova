"use client"
/* eslint-disable @next/next/no-img-element */
import { createContext, FormEvent, useContext, useEffect, useRef, useState, type FC, type ReactNode } from "react";
import "../../styles/navbar.scss"
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {  usePathname, useRouter } from 'next/navigation'
import Avatar from "./small_components/Avatar";
import { GlobalContextType, LanguageInput, LogRegInput } from "@/lib/types/utilitisesType";
import { globalContextDefaultValue } from "@/lib/tools/DefaultValues";
import Footer from "./Footer";
import languageList from "@/lib/language";
import { CircleFlag } from "react-circle-flags";
import useWindowSize from "@/lib/tools/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import FullScreenComponent from "./fullscreen_components/FullScreenDisplay";
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import setLogRegAction from "@/lib/reducers/utilitisesReducer/actions/setLogRegAction";
import getProfileAction from "@/lib/reducers/authSliceReducer/actions/user/getProfileAction";
import useLocalStorage from "@/lib/tools/useLocalStorage";
import { setTokenAction } from "@/lib/reducers/authSliceReducer/authSlice";

type IProps = {
  children: ReactNode[] | ReactNode;
};

const GlobalContext = createContext<GlobalContextType>(globalContextDefaultValue);

export function useGlobalContext() {
    return useContext(GlobalContext)
}

const Navbar: FC<IProps> = ({ children }) => {

    // isMounted
    const [isMounted, setIsMounted] = useState(false);

    // LocalStorage
    const [localToken, setLocalToken] = useLocalStorage("accessToken", "")

    // Reducer
    const { accessToken, userData, profile } = useSelector(
        (store: RootState) => store.auth
    )
    const { fullScreenDisplayed } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Search Params and Pathname set
    const pathname = usePathname()
    const router = useRouter()

    // Window Size Context
    const windowSize = useWindowSize()

    // Language Selector and Context
    const [currentLanguage, setCurrentLanguage] = useState<LanguageInput>("en")
    const [isLangSelectOpen, setIsLangSelectOpen] = useState<boolean>(false)
    
    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        router.replace(`/search?search=${formData.get("search")}&type=image&sort=view&tag=`)
    }

    const handleLogReg = (type: LogRegInput) => {
        dispatch(setLogRegAction(type))
        dispatch(setFullScreenAction("log-reg"))
    }

    const handleLanguage = (lang: LanguageInput) => {
        setIsLangSelectOpen(false)    
        setCurrentLanguage(lang)
    }

    useEffect(()=>{
        if (accessToken === "" && localToken !== "" && isMounted) {
            dispatch(setTokenAction(localToken))
        }
        if (accessToken !== "") {
            setLocalToken(accessToken)
            dispatch(getProfileAction(accessToken))
        }
    },[accessToken, dispatch, isMounted, localToken, setLocalToken])

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <>
            <header>
                <nav id="nav">
                    <section id="top-nav">
                        <div className="name-logo">
                            <Link href={"/"}>
                                <div className="logo">
                                    <img src="/image/logo.webp" alt="Logo" height={75}/>
                                </div>
                                <h1 className="glow">RyuNova</h1>
                            </Link>
                        </div>
                        <div id="nav-part">
                            <ul id="link-list">
                                <li>
                                    <Link className="link push-action" href={"/"}>
                                        {languageList[currentLanguage].titles.home}
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link push-action" href={pathname === "/" ? "#gallery" : "/search?search=&type=image&sort=view&tag="}>
                                        {languageList[currentLanguage].titles.gallery}
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link push-action" href={pathname === "/" ? "#article" : "/search?search=&type=article&sort=view&tag="}>
                                        {languageList[currentLanguage].contentType.article.plural}
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link push-action" href={pathname === "/" ? "#event" : "/search?search=&type=image&sort=view&tag="}>
                                        {languageList[currentLanguage].titles.events}
                                    </Link>
                                </li>
                            </ul>
                            <div id="language-selector" aria-roledescription="listbox">
                                <button 
                                    className="link"
                                    onClick={()=>setIsLangSelectOpen(!isLangSelectOpen)}
                                    onKeyDownCapture={()=>setIsLangSelectOpen(!isLangSelectOpen)}
                                >   
                                    <p>{languageList[currentLanguage].utilities.uniCode}</p>
                                    <CircleFlag countryCode={languageList[currentLanguage].utilities.flagKey} height={20}/>
                                </button>
                                <div className={isLangSelectOpen ? "custom-select-appear select-container" : "custom-select-disappear select-container"}>
                                    <ul>
                                        <li 
                                            className={currentLanguage === "en" ? "option-selected" : ""}
                                            onClick={()=>handleLanguage("en")}
                                            onKeyDown={()=>handleLanguage("en")}
                                        >
                                            <CircleFlag countryCode={languageList.en.utilities.flagKey} height={20}/>
                                            <p>{languageList.en.utilities.languageName}</p>
                                        </li>
                                        <li 
                                            className={currentLanguage === "fr" ? "option-selected" : ""}
                                            onClick={()=>handleLanguage("fr")}
                                            onKeyDown={()=>handleLanguage("fr")}
                                        >
                                            <CircleFlag countryCode={languageList.fr.utilities.flagKey} height={20}/>
                                            <p>{languageList.fr.utilities.languageName}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <button 
                                className="button-cta-reverse button-normal push-action"
                                onClick={()=>dispatch(setFullScreenAction("image-upload"))}
                                onKeyDown={()=>dispatch(setFullScreenAction("image-upload"))}
                            >Image Upload
                            </button>
                            {accessToken === "" ? <>
                                <button 
                                     className="button-cta-reverse button-normal push-action"
                                    onClick={()=>handleLogReg("log")}
                                    onKeyDown={()=>handleLogReg("log")}
                                >{languageList[currentLanguage].button.logIn}</button>
                            </> : <>
                            {profile.fetch.fetchState === "feching" ? <></> : <>
                            {profile.fetch.fetchState === "done" ? 
                            <div id="user">
                                <div id="notification-container">
                                    <div id="notification-moon">
                                        <img className="push-action" src="/image/icons/moon-notif.png" alt="Bell Notification" height={15}/>
                                    </div>
                                    <span id="notification-count" >99+</span>
                                </div>
                                <Link id="avatar" href={`/profile/${userData.id}`}>
                                    <Avatar url={userData.avatarUrl} name={userData.name} size={55}/>
                                </Link>
                            </div>
                            : <></>}
                            </>}
                            </>}
                        </div>
                    </section>
                    {pathname !== "/search" ? 
                    <section id="search-nav">
                        {(pathname.includes("/image") || pathname.includes("/article") || pathname.includes("/profile")) ?
                        <>
                            <button 
                                className="push-action link" 
                                onClick={()=>router.back()}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                                {languageList[currentLanguage].button.previous}
                            </button>
                        </> : <>
                            <div></div>
                        </>
                        }
                        <form className="search-bar" onSubmit={handleSearch}>
                            <input
                                name="search"
                                type="search" 
                                placeholder={languageList[currentLanguage].placeHolders.search}
                            />
                            <button className="push-action" type="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </section> :
                    <>
                    </>
                    }
                </nav>
            </header>
            <GlobalContext value={{language: currentLanguage, windowSize: windowSize}}>
                <main>
                    {children}
                </main>
                <Footer/>
                <FullScreenComponent/>
            </GlobalContext>
        </>
    )
}

export default Navbar

