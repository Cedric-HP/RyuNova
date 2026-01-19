"use client"
/* eslint-disable @next/next/no-img-element */
import { createContext, FormEvent, useContext, useEffect, useState, type FC, type ReactNode } from "react";
import "../../styles/navbar.scss"
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {  usePathname, useRouter } from 'next/navigation'
import { GlobalContextType, LogRegInput } from "@/lib/types/utilitisesType";
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
import setCustomSelectorAction from "@/lib/reducers/utilitisesReducer/actions/setCustomSelectorAction";
import CustomSelectorsDisplayComponent from "./customSelectors/CustomSelectorsDisplay";
import Avatar from "./small_components/Avatar";

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
    const { accessToken, userData, profile, authorized } = useSelector(
        (store: RootState) => store.auth
    )
    const { currentLanguage } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Search Params and Pathname set
    const pathname = usePathname()
    const router = useRouter()

    // Window Size Context
    const windowSize = useWindowSize()
    
    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        router.push(`/search?search=${formData.get("search")}&type=image&sort=view&tag=`)
    }

    const handleLogReg = (type: LogRegInput) => {
        dispatch(setLogRegAction(type))
        dispatch(setFullScreenAction("log-reg"))
    }

    // Use Effect to Handle Local Token and get profile
    useEffect(()=>{
        if (accessToken === "" && localToken !== "" && isMounted && authorized) {
            dispatch(setTokenAction(localToken))
        }
        if (accessToken !== "") {
            setLocalToken(accessToken)
            dispatch(getProfileAction(accessToken))
        }
        if (accessToken === "" && localToken !== "" && isMounted && !authorized) {
            setLocalToken("")
        }
    },[accessToken, authorized, dispatch, isMounted, localToken, setLocalToken])

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
                                    <img src="/image/icons/Logo.webp" alt="Logo" height={75}/>
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
                                    className="link push-action"
                                    onClick={()=>dispatch(setCustomSelectorAction("language"))}
                                    onKeyDownCapture={()=>dispatch(setCustomSelectorAction("language"))}
                                >   
                                    <p>{languageList[currentLanguage].utilities.uniCode}</p>
                                    <CircleFlag countryCode={languageList[currentLanguage].utilities.flagKey} height={20}/>
                                </button>
                            </div>
                            {accessToken === "" ? <>
                                <button 
                                     className="button-cta-reverse button-normal push-action"
                                    onClick={()=>handleLogReg("log")}
                                    onKeyDown={()=>handleLogReg("log")}
                                >{languageList[currentLanguage].button.logIn}</button>
                            </> : <>
                            {profile.fetch.fetchState === "fetching" ? <></> : <>
                            {profile.fetch.fetchState === "done" ? 
                            <div id="user">
                                <div id="notification-container">
                                    <div id="notification-moon">
                                        <img className="push-action" src="/image/icons/moon-notif.png" alt="Bell Notification" height={15}/>
                                    </div>
                                    <span id="notification-count" >99+</span>
                                </div>
                                <div
                                    className="push-action"
                                    onClick={()=>dispatch(setCustomSelectorAction("user"))}
                                    onKeyDown={()=>dispatch(setCustomSelectorAction("user"))}  
                                >
                                <Avatar url={userData.avatarUrl} name={userData.name} size={55}/>
                                </div>
                            </div>
                            : <></>}
                            </>}
                            </>}
                        </div>
                    </section>
                    
                    <section id="search-nav">
                        <CustomSelectorsDisplayComponent/>
                        {pathname !== "/search" ? 
                        <>
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
                     </> :<></>}
                    </section>
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

