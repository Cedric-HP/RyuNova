"use client"
/* eslint-disable @next/next/no-img-element */
import { type FC } from "react";
import "../../styles/footer.scss"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { usePathname } from 'next/navigation'
import languageList from "@/lib/language";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/store";
import useHandleLogRegPopUp from "@/lib/tools/handleLogRegPopUp";

const Footer: FC = () => {
    const pathname = usePathname()

    // Reducers
    const { authorized } = useSelector(
        (store: RootState) => store.auth
    )
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )

    // Handle LorReg Popup
     const { handleLogReg } = useHandleLogRegPopUp()

    return (
        <>  
            <footer>
                <hr className="section-separator"/>
                <div id="footer-background"></div>
                <div id="footer-section-container">
                    <section>
                        <div className="name-logo">
                            <Link href={pathname === "/" ? "#nav" : "/#nav"}>
                                <div className="logo">
                                    <img src="/image/icons/Logo.webp" alt="Logo" height={75}/>
                                </div>
                                <h1 className="glow">RyuNova</h1>
                            </Link>
                        </div>
                    </section>
                    <section className="footer-link">
                        <h3 className="spacing-letter-big">{languageList[currentLanguage].titles.content}</h3>
                        <ul  className="footer-link-list">
                            <li>
                                <Link className="link push-action" href={pathname === "/" ? "#image" : "/search?search=&type=image&sort=view&tag=#nav"}>
                                    {languageList[currentLanguage].titles.gallery}
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={pathname === "/" ? "#article" : "/search?search=&type=article&sort=view&tag=#nav"}>
                                    {languageList[currentLanguage].contentType.article.plural}
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"/#nav"}>
                                    {languageList[currentLanguage].titles.events}
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="footer-link">
                        <h3 className="spacing-letter-big">{languageList[currentLanguage].titles.legalInformation}</h3>
                        <ul className="footer-link-list">
                            <li>
                                <Link className="link push-action" href={"/"}>
                                    {languageList[currentLanguage].titles.termsOfService}
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"/"}>
                                    {languageList[currentLanguage].titles.privacyPolicy}
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"/"}>
                                    {languageList[currentLanguage].titles.copyrightNotification}
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"/"}>
                                    {languageList[currentLanguage].titles.intellectualPropertyRights}
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section id="social-media">
                        <ul id="social-media-list">
                            <li>
                                <Link className="link push-action" href={"/"}>
                                   <FontAwesomeIcon icon={faSquareGithub} />
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"/"}>
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
                    </section>
                </div>
                <span id="signature">©2025 MOUCHON Cédric</span>
            </footer>
        </>
    )
}

export default Footer