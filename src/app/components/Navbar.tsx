"use client"
/* eslint-disable @next/next/no-img-element */
import { FormEvent, type FC, type ReactNode } from "react";
import "../../styles/navbar.scss"
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {  usePathname, useRouter } from 'next/navigation'
import Avatar from "./small_components/Avatar";

type IProps = {
  children: ReactNode[] | ReactNode;
};

const Navbar: FC<IProps> = ({ children }) => {

    const router = useRouter()

    // Search Params and Pathname set
    const pathname = usePathname()
    
    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        router.replace(`/search?search=${formData.get("search")}&type=image&sort=view&tag=`)
    }

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
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link push-action" href={pathname === "/" ? "#gallery" : "/search?search=&type=image&sort=view&tag="}>
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link push-action" href={pathname === "/" ? "#article" : "/search?search=&type=article&sort=view&tag="}>
                                        Articles
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link push-action" href={pathname === "/" ? "#event" : "/search?search=&type=image&sort=view&tag="}>
                                        Events
                                    </Link>
                                </li>
                            </ul>
                            <div id="user">
                                <div id="notification-container">
                                    <div id="notification-moon">
                                        <img className="push-action" src="/image/icons/moon-notif.png" alt="Bell Notification" height={15}/>
                                    </div>
                                    <span id="notification-count" >99+</span>
                                </div>
                                <Link id="avatar" href={"/"}>
                                    <Avatar url={"/image/pictures/avatar/GBX_LOGO_Head_PNG.png"} name={"HYPERNOVA GBX"} size={55}/>
                                </Link>
                            </div>
                        </div>
                    </section>
                    {pathname !== "/search" ? 
                    <section id="search-nav">
                        {(pathname.includes("/image") || pathname.includes("/article") || pathname.includes("/profile")) ?
                        <>
                            <button className="push-action link" onClick={()=>router.back()}><FontAwesomeIcon icon={faArrowLeft} />{`Previous`}</button>
                        </> : <>
                            <div></div>
                        </>
                        }
                        <form className="search-bar" onSubmit={handleSearch}>
                            <input
                                name="search"
                                type="search" 
                                placeholder="Search"
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
            <main>
                {children}
            </main>
        </>
    )
}

export default Navbar