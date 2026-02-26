"use client"
/* eslint-disable @next/next/no-img-element */
import { createContext, FormEvent, useContext, useEffect, useRef, useState, type FC, type ReactNode } from "react";
import "../../styles/navbar.scss"
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChevronLeft, faBars, faXmark, faStar} from '@fortawesome/free-solid-svg-icons'
import {  usePathname, useRouter } from 'next/navigation'
import { GlobalContextType, LogRegInput, NavBarShowInput, ResponsiveInput } from "@/lib/types/utilitisesType";
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
import { useWatchHeight } from "@/lib/tools/useWatchHeight";
import Logo from "./small_components/Logo";
import toggleParticlesAction from "@/lib/reducers/utilitisesReducer/actions/toggleParticlesAction";
import SwitchComponent from "./small_components/SwitchComponent";
import LoadingComponent from "./small_components/LoadingComponent";
import setCurrentLanguageAction from "@/lib/reducers/utilitisesReducer/actions/setCurrentLanguageAction";
import useHandleLanguage from "@/lib/tools/useHandleLanguage";
import useDisplayParticles from "@/lib/tools/useDisplayParticles";

type IProps = {
  children: ReactNode[] | ReactNode;
};

const resBreakPoint = {
    desktop: 1007,
    mobile: 655
}

const navBreakPointList ={
    en: {
        connected: 1007,
        notConnected: 1300
    },
    fr: {
        connected: 1060,
        notConnected: 1430
    }
}

export const GlobalContext = createContext<GlobalContextType>(globalContextDefaultValue);

export function useGlobalContext() {
    return useContext(GlobalContext)
}

const Navbar: FC<IProps> = ({ children }) => {

    // isMounted
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [firstLocalLang, setFirstLocalLang] = useState<boolean>(false);
    const [firstLocalParticles, setFirstParticles] = useState<boolean>(false);

    // Show NavBar
    const [showNavBar, setShowNavBar] = useState<NavBarShowInput>("unfixed");

    // Show Side Nav
    const [showSideNav, setShowSideNav] = useState<boolean>(false);

    // First Hiden
    const [isFirstHide, setIsFirstHide] = useState<boolean>(false);

    // LocalStorage
    const [localToken, setLocalToken] = useLocalStorage("accessToken", "")
    const { localLanguage} = useHandleLanguage()
    const {handleDisplayParticles, localParticles} = useDisplayParticles()

    // Responsive State
    const [responsive, setResponsive] = useState<ResponsiveInput>("desktop")

    // NavBar BreakPoint
    const [navBreakPoint, setNavBreakPoint] = useState<number>(navBreakPointList.en.notConnected);

    // Reducer
    const { accessToken, userData, profile, authorized } = useSelector(
        (store: RootState) => store.auth
    )
    const { currentLanguage, displayParticles, customSelectorDisplayed } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Search Params and Pathname set
    const pathname = usePathname()
    const router = useRouter()

    // Window Size Context
    const windowSize = useWindowSize()

    const headerRef = useRef<HTMLHeadingElement | null>(null)

    const headerHeight = useWatchHeight(headerRef)

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        router.push(`/search?search=${formData.get("search")}&type=image&sort=view&tag=&order=DESC&page=1#nav`)
    }

    const handleLogReg = (type: LogRegInput) => {
        dispatch(setLogRegAction(type))
        dispatch(setFullScreenAction("log-reg"))
    }

    const handleUserSelector = () => {
        if (customSelectorDisplayed.includes("language")) {
            dispatch(setCustomSelectorAction("language"))
            return dispatch(setCustomSelectorAction("user"))
        }
        dispatch(setCustomSelectorAction("user"))
    }

     // Responsive Device Set
    useEffect(()=>{
        if (!isMounted) return
        if (windowSize.width === 0 || windowSize.width >= resBreakPoint.desktop)
            return setResponsive("desktop")
        if (windowSize.width < resBreakPoint.desktop && windowSize.width >= resBreakPoint.mobile)
            return setResponsive("tablet")
        if (windowSize.width < resBreakPoint.mobile)
            return setResponsive("mobile")
    },[isMounted, windowSize.width])

    // NavBar Break Point set
    useEffect(()=>{
        switch(currentLanguage){
            case "en":
                if (authorized === true)
                    setNavBreakPoint( navBreakPointList.en.connected )
                else
                    setNavBreakPoint( navBreakPointList.en.notConnected )
                break
            case "fr":
                if (authorized === true)
                    setNavBreakPoint( navBreakPointList.fr.connected )
                else
                    setNavBreakPoint( navBreakPointList.fr.notConnected )
                break
        }
    },[authorized, currentLanguage])
    
    // Use Effect to Handle Local Language
    useEffect(()=>{
        if (!firstLocalLang && isMounted && (localLanguage === "en" || localLanguage === "fr"))
            if (localLanguage !== currentLanguage) {
                dispatch(setCurrentLanguageAction(localLanguage))
                setFirstLocalLang(true)
            }
    },[currentLanguage, dispatch, firstLocalLang, isMounted, localLanguage])

    // Use Effect to Handle Local Particles
    useEffect(()=>{
        if (!firstLocalParticles && isMounted && (localParticles === true || localParticles === false))
            if (localParticles !== displayParticles){
                setFirstParticles(true)
                dispatch(toggleParticlesAction())
            }
    },[dispatch, displayParticles, firstLocalParticles, isMounted, localParticles])

    // Use Effect to Handle Local Token and get profile
    useEffect(()=>{
        if (accessToken === "" && localToken !== "" && isMounted && authorized === "idle") {
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

    // Display NavBar
    useEffect(() => {
        let last = window.scrollY;

        const onScroll = () => {
            const current = window.scrollY;
            const dif = current - last;

            if (
                (current < headerHeight.observedEltHeight && dif > 2)  &&
                ((current !== 0 && !isFirstHide)) ||
                (current === 0 && isFirstHide)     
            ) {
                setShowNavBar("unfixed");
                setIsFirstHide(false)
            } else if (dif > 2 && !isFirstHide) {
                setShowNavBar("first-hide");
                setIsFirstHide(true)
            } else if (dif > 2 && isFirstHide) {
                setShowNavBar("hide");
            } else if (dif < -2 && isFirstHide) {
                setShowNavBar("show");
            }   

            last = current;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [dispatch, headerHeight.observedEltHeight, isFirstHide, showNavBar]);

    // Display Selectors
    useEffect(()=>{
        switch(showNavBar) {
            case "unfixed":
                dispatch(setCustomSelectorAction("show"))
                break;
            case "first-hide":
                dispatch(setCustomSelectorAction("hide"))
                break;
            case "hide":
                dispatch(setCustomSelectorAction("hide"))
                break;
            case "show":
                dispatch(setCustomSelectorAction("show"))
                break;
        }
    },[dispatch, showNavBar])

    // Mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <>
            <header ref={headerRef} className={showNavBar} >
                {/* <p>{windowSize.width}</p>
                <p>{responsive}</p>
                <p>{navBreakPoint}</p> */}
                <div id="header-background"></div>
                <nav 
                    id="nav-desktop"
                    style={{
                        width:  responsive === "mobile" ? "calc(100vw - 40px" : "75vw",
                    }}
                >
                    <section id="top-nav">
                        <Logo responsive={responsive} url={"/"}/>
                        {windowSize.width > navBreakPoint ?
                        <div id="nav-part">
                            <ul className="link-list">
                                <li>
                                    <Link className="link push-action" href={"/"}>
                                        {languageList[currentLanguage].titles.home}
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link push-action" href={pathname === "/" ? "#gallery" : "/search?search=&type=image&sort=view&tag=&order=DESC&page=1#nav"}>
                                        {languageList[currentLanguage].titles.gallery}
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link push-action" href={pathname === "/" ? "#article" : "/search?search=&type=article&sort=view&tag=&order=DESC&page=1#nav"}>
                                        {languageList[currentLanguage].contentType.article.plural}
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link push-action" href={pathname === "/" ? "#event" : "/search?search=&type=image&sort=view&tag=&order=DESC&page=1#nav"}>
                                        {languageList[currentLanguage].titles.events}
                                    </Link>
                                </li>
                            </ul>
                            {authorized !== true ? <>
                            <button
                                    className="button-none"
                                    onClick={()=> handleDisplayParticles(displayParticles)}
                                >
                                    <SwitchComponent state={displayParticles}>
                                        <FontAwesomeIcon icon={faStar} />
                                    </SwitchComponent>
                                </button>
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
                                <button 
                                     className="button-cta-reverse button-normal push-action"
                                    onClick={()=>handleLogReg("log")}
                                    onKeyDown={()=>handleLogReg("log")}
                                >
                                    {languageList[currentLanguage].button.logIn}
                                </button>
                            </> : <>
                            {profile.fetch.fetchState === "fetching" ? <LoadingComponent type={"black-hole"} size={81}/> : <>
                            {profile.fetch.fetchState === "done" ? 
                            <div id="user">
                                <div id="notification-container">
                                    <div id="notification-moon">
                                        <img 
                                            className="push-action" 
                                            src="/image/icons/moon-notif.png" 
                                            alt="Bell Notification" 
                                            height={15}
                                        />
                                    </div>
                                    <span id="notification-count" >99+</span>
                                </div>
                                <button
                                    className="push-action avatar-container"
                                    onClick={handleUserSelector}
                                    onKeyDown={()=>dispatch(setCustomSelectorAction("user"))}  
                                >
                                    <Avatar url={userData.avatarUrl} name={userData.name} size={55}/>
                                </button>
                            </div> : <></>} </>} </>}
                        </div> : <>

                        {/* Burger Menu ------------------------------------------------------------------------*/}
                        <button 
                            id="nav-burger_button"
                            onClick={()=>setShowSideNav(true)}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        </>}
                    </section>
                    
                    <section id="search-nav">
                        {windowSize.width > navBreakPoint &&
                        <CustomSelectorsDisplayComponent/>}
                        {pathname !== "/search" ? 
                        <>
                        {(pathname.includes("/image") || pathname.includes("/article") || pathname.includes("/profile")) ?
                        <>
                            <button 
                                className="push-action link" 
                                onClick={()=>router.back()}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
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
                     </> :<>
                     
                     </>}
                    </section>
                </nav>
            </header>
            {windowSize.width < navBreakPoint &&
            <nav id="nav-mobile">
                <div 
                    id="side-nav"
                    style={{
                        width: windowSize.width / 2 < 300 ? "100vw" : "300px",
                        transform: 
                            `translateX(${showSideNav ? "0px" : windowSize.width / 2 < 300 ? "100vw" : "300px"})`
                    }}
                    className={`${showSideNav ? "show" : "hide"}`}
                >
                    { windowSize.width / 2 > 300 && <div id="side-nav-border"></div>}
                    <button 
                        className="full-screen-xmark"
                        onClick={()=>setShowSideNav(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    {/* List Section */}
                    <ul className="link-list">
                        <li>
                            <Link className="link push-action" href={"/"}>
                                {languageList[currentLanguage].titles.home}
                            </Link>
                        </li>
                        <li>
                            <Link className="link push-action" href={pathname === "/" ? "#gallery" : "/search?search=&type=image&sort=view&tag=&order=DESC&page=1#nav"}>
                                {languageList[currentLanguage].titles.gallery}
                            </Link>
                        </li>
                        <li>
                            <Link className="link push-action" href={pathname === "/" ? "#article" : "/search?search=&type=article&sort=view&tag=&order=DESC&page=1#nav"}>
                                {languageList[currentLanguage].contentType.article.plural}
                            </Link>
                        </li>
                        <li>
                            <Link className="link push-action" href={pathname === "/" ? "#event" : "/search?search=&type=image&sort=view&tag=&order=DESC&page=1#nav"}>
                                {languageList[currentLanguage].titles.events}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>}
            <GlobalContext 
                value={{
                    windowSize: windowSize,
                    responsive: responsive
                }}
            >
                <main
                    style={{
                        marginTop: 
                            showNavBar !== "unfixed" ?
                            headerHeight.observedEltHeight !== 0 ? 
                            headerHeight.observedEltHeight : 
                            pathname !== "/search" ? "160px" : "95px" :
                            "0"
                    }} 
                >
                    {children}
                </main>
                <Footer/>
                <FullScreenComponent/>
            </GlobalContext>
        </>
    )
}

export default Navbar






