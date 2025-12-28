"use client"
/* eslint-disable @next/next/no-img-element */
import { type FC } from "react";
import "../../styles/footer.scss"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { usePathname } from 'next/navigation'
import { useGlobalContext } from "./Navbar";
import languageList from "@/lib/language";

const Footer: FC = () => {
    const pathname = usePathname()
    const { language } = useGlobalContext()
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
                                    <img src="/image/logo.webp" alt="Logo" height={75}/>
                                </div>
                                <h1 className="glow">RyuNova</h1>
                            </Link>
                        </div>
                    </section>
                    <section className="footer-link">
                        <h3 className="spacing-letter-big">{languageList[language].titles.content}</h3>
                        <ul  className="footer-link-list">
                            <li>
                                <Link className="link push-action" href={pathname === "/" ? "#image" : "/search?search=&type=image&sort=view&tag=#nav"}>
                                    {languageList[language].titles.gallery}
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={pathname === "/" ? "#article" : "/search?search=&type=article&sort=view&tag=#nav"}>
                                    {languageList[language].contentType.article.plural}
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"/#nav"}>
                                    {languageList[language].titles.events}
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="footer-link">
                        <h3 className="spacing-letter-big">{languageList[language].titles.legalInformation}</h3>
                        <ul className="footer-link-list">
                            <li>
                                <Link className="link push-action" href={"/"}>
                                    {languageList[language].titles.termsOfService}
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"/"}>
                                    {languageList[language].titles.privacyPolicy}
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"/"}>
                                    {languageList[language].titles.copyrightNotification}
                                </Link>
                            </li>
                            <li>
                                <Link className="link push-action" href={"/"}>
                                    {languageList[language].titles.intellectualPropertyRights}
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
                        <button className="button-cta button-normal">{languageList[language].button.signUp}</button>
                    </section>
                </div>
                <span id="signature">©2025 MOUCHON Cédric</span>
            </footer>
        </>
    )
}

export default Footer