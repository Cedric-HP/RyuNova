"use client"
import { type FC } from "react";
// import Link from "next/link";
// import Image from "next/image";
import { useParams } from "next/navigation";

const Article: FC = () => {
    const { articleId } = useParams();
    return (
        <>  
            <h1>
                {articleId}
            </h1>
        </>
    )
}

export default Article