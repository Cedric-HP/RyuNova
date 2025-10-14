/* eslint-disable @next/next/no-img-element */
import { type FC, type ReactNode } from "react";
import "../../styles/navbar.scss"
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

type IProps = {
  children: ReactNode[] | ReactNode;
};
const Navbar: FC<IProps> = ({ children }) => {
    
    return (
        <>
            <header>
                <nav>
                    <section id="top-nav">
                        <div className="name-logo">
                            <Link href={"/"}>
                                <div className="logo">
                                    <img src="/image/logo.png" alt="Logo" height={75}/>
                                </div>
                                <h1 className="glow">RyuNova</h1>
                            </Link>
                        </div>
                        <div id="nav-part">
                            <ul id="link-list">
                                <li className="link hover-link push-action">
                                    <Link href={"/"}>
                                        Home
                                    </Link>
                                </li>
                                <li className="link hover-link push-action">
                                    <Link href={"/search"}>
                                        Gallery
                                    </Link>-
                                </li>
                                <li className="link hover-link push-action">
                                    <Link href={"/search"}>
                                        Articles
                                    </Link>
                                </li>
                                <li className="link hover-link push-action">
                                    <Link href={"/"}>
                                        Events
                                    </Link>
                                </li>
                            </ul>
                            <div id="user">
                                <div id="notification-container">
                                    <div id="notification-moon"></div>
                                    <span id="notification-count" >99+</span>
                                </div>
                                <Link id="avatar" href={"/"}>
                                    <div id="avatar-icon"></div>
                                    {/* <Image src={"../../image/icons/noun-galaxy-3544621.svg"} alt="Logo" width={55} height={55}/> */}
                                </Link>
                            </div>
                        </div>
                    </section>
                    <section id="search-nav">
                        <form className="search-bar">
                            <input type="search" placeholder="Search" />
                            
                            <button className="push-action" type="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </section>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}

export default Navbar