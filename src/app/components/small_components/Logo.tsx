/* eslint-disable @next/next/no-img-element */
import { ResponsiveInput } from "@/lib/types/utilitisesType";
import Link from "next/link";
import { type FC } from "react";
type Iprops = {
    responsive: ResponsiveInput,
    url: string
}

const Logo: FC<Iprops>  = ( {url="", responsive= "desktop"} ) => {

    return (
        <div className="name-logo">
            <Link href={url}>
                <div className="logo">
                    <img src="/image/icons/Logo.webp" alt="Logo" height={responsive === "mobile" ? 50 : 60}/>
                </div>
                <h1 className="glow">RyuNova</h1>
            </Link>
        </div>
    )
}

export default Logo