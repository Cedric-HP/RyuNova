"use client"
import { useContext, useEffect, useState, type FC } from "react";
import "../../styles/footer.scss"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { usePathname } from 'next/navigation'
import languageList from "@/lib/language";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/store";
import useHandleLogRegPopUp from "@/lib/tools/handleLogRegPopUp";
import Logo from "./small_components/Logo";
import { GlobalContext } from "./Navbar";

const rowBreakPoint = {
    footer: 1150,
    media: 420,
    button: 455
}

const Footer: FC = () => {
    const pathname = usePathname()

    // Reducers
    const { authorized } = useSelector(
        (store: RootState) => store.auth
    )
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )

    // Responsive Context
    const { responsive, windowSize } = useContext(GlobalContext)

    // Handle LorReg Popup
     const { handleLogReg } = useHandleLogRegPopUp()

     const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;
    return (
        <>  
            <footer>
                <hr 
                    className="section-separator"
                />
                <div id="footer-background"></div>
                <div id="footer-section-container">
                    <section id="top-footer">
                        <Logo responsive={responsive} url={pathname === "/" ? "#nav" : "/#nav"}/>
                        {windowSize.width < rowBreakPoint.footer &&
                        <div id="social-media-top">
                        <ul className="social-media-list">
                            <li>
                                <Link className="link push-action" href={"https://github.com/Cedric-HP"}>
                                   <FontAwesomeIcon icon={faSquareGithub} />
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"https://www.linkedin.com/in/c%C3%A9dric-mouchon-33072a2b3/"}>
                                   <FontAwesomeIcon icon={faLinkedin} />
                                </Link>
                            </li>
                        </ul>
                        {authorized !== true ? 
                        <button 
                            className="button-cta button-normal"
                            onClick={()=>handleLogReg("reg")}
                            onKeyDown={()=>handleLogReg("reg")}
                        >{languageList[currentLanguage].button.signUp}</button>
                        : <></>}</div>}
                    </section>
                    <section id="footer-link-lists">
                        <div className="footer-links">
                            <h3 className="spacing-letter-big">
                                {languageList[currentLanguage].titles.content}
                            </h3>
                            <ul className="footer-link-list">
                                <li>
                                    <Link 
                                        className="link push-action" 
                                        href={pathname === "/" ? "#image" : "/search?search=&type=image&sort=view&tag=#nav"}
                                    >
                                        {languageList[currentLanguage].titles.gallery}
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className="link push-action" 
                                        href={pathname === "/" ? "#article" : "/search?search=&type=article&sort=view&tag=#nav"}
                                    >
                                        {languageList[currentLanguage].contentType.article.plural}
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className="link push-action" 
                                        href={"/#nav"}
                                    >
                                        {languageList[currentLanguage].titles.events}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h3 className="spacing-letter-big">
                                {languageList[currentLanguage].titles.legalInformation}
                            </h3>
                            <ul className="footer-link-list">
                                <li>
                                    <Link 
                                        className="link push-action" 
                                        href={"/"}
                                    >
                                        {languageList[currentLanguage].titles.termsOfService}
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className="link push-action" 
                                        href={"/"}
                                    >
                                        {languageList[currentLanguage].titles.privacyPolicy}
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className="link push-action" 
                                        href={"/"}
                                    >
                                        {languageList[currentLanguage].titles.copyrightNotification}
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        className="link push-action" 
                                        href={"/"}
                                    >
                                        {languageList[currentLanguage].titles.intellectualPropertyRights}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                    {windowSize.width >= rowBreakPoint.footer &&
                    <section id="social-media">
                        <ul className="social-media-list">
                            <li>
                                <Link className="link push-action" href={"https://github.com/Cedric-HP"}>
                                   <FontAwesomeIcon icon={faSquareGithub} />
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"https://www.linkedin.com/in/c%C3%A9dric-mouchon-33072a2b3/"}>
                                   <FontAwesomeIcon icon={faLinkedin} />
                                </Link>
                            </li>
                        </ul>
                        {authorized !== true ? 
                        <button 
                            className="button-cta button-normal"
                            onClick={()=>handleLogReg("reg")}
                            onKeyDown={()=>handleLogReg("reg")}
                        >{languageList[currentLanguage].button.signUp}</button>
                        : <></>}
                    </section>}
                </div>
                <span id="signature">©2025 MOUCHON Cédric</span>
            </footer>
        </>
    )
}

export default Footer