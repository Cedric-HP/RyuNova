/* eslint-disable @next/next/no-img-element */
import { type FC } from "react";
import "../../styles/footer.scss"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer: FC = () => {
    
    return (
        <>  
            <footer>
                <hr className="section-separator"/>
                <div id="footer-background"></div>
                <div id="footer-section-container">
                    <section>
                        <div className="name-logo">
                            <Link href={"/"}>
                                <div className="logo">
                                    <img src="/image/logo.png" alt="Logo" height={75}/>
                                </div>
                                <h1 className="glow">RyuNova</h1>
                            </Link>
                        </div>
                    </section>
                    <section className="footer-link">
                        <h3 className="spacing-letter-big">CONTENT</h3>
                        <ul  className="footer-link-list">
                            <li className="push-action">
                                <Link href={"/search"}>
                                    Gallery
                                </Link>
                            </li>
                            <li className="push-action">
                                <Link href={"/search"}>
                                    Articles
                                </Link>
                            </li>
                            <li className="push-action">
                                <Link href={"/"}>
                                    Events
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="footer-link">
                        <h3 className="spacing-letter-big">INFORMATION</h3>
                        <ul className="footer-link-list">
                            <li className="push-action">
                                <Link href={"/"}>
                                    Terms Of Service
                                </Link>
                            </li>
                            <li className="push-action">
                                <Link href={"/"}>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li className="push-action">
                                <Link href={"/"}>
                                    Copyright Notification
                                </Link>
                            </li>
                            <li className="push-action">
                                <Link href={"/"}>
                                    Intellectual Property Rights
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section id="social-media">
                        <ul id="social-media-list">
                            <li className="push-action">
                                <Link href={"/"}>
                                   <FontAwesomeIcon icon={faSquareGithub} />
                                </Link>
                            </li>
                            <li  className="push-action">
                                <Link href={"/"}>
                                   <FontAwesomeIcon icon={faLinkedin} />
                                </Link>
                            </li>
                        </ul>
                        <button className="button-cta button-normal">Sign Up</button>
                    </section>
                </div>
                <span id="signature">©2025 MOUCHON Cédric</span>
            </footer>
        </>
    )
}

export default Footer