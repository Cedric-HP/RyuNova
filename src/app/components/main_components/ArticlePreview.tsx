import { JSX, useEffect, useState, type FC } from "react";
import "../../../styles/components/main_components/article_preview.scss"
import { ContentData } from "../../../lib/types/contenteType";
import LabelLogo from "../small_components/LabelLogo";
import Link from "next/link";
import ViewLikeBundle from "../small_components/ViewLikeBundle";
import { useRouter } from 'next/navigation'
/* eslint-disable @next/next/no-img-element */
type Iprops = {
    elementList: ContentData[]
}

const ArticlePreview: FC<Iprops>  = ({elementList = []}) => {

    const router = useRouter()

    const [articleListElement, setArticleistElement] = useState<JSX.Element[]>([])

    useEffect(()=>{
        setArticleistElement(
            elementList.map((item, index)=>{
                return (
                    <li 
                        className="article-item-list push-action apear" 
                        style={{animationDelay: `${(1*index)/25}s`}} 
                        key={`${item.title}_${index}`}
                        onClick={()=>router.replace(`/article/${item.id}/#nav`)}
                    >
                        <ViewLikeBundle view={item.views} like={item.likes}/>
                        <img className="article-image" src={item.url} alt={`${item.title}_by_${item.author}`} height={100} loading="lazy"/>
                        <div className="article-content">
                            <div className="article-logo">
                                <LabelLogo title="Article" url="/image/icons/noun-article-7370563.svg" />
                            </div>
                            <div className="article-text">
                                <div className="article-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <span>{item.author}</span>
                                </div>
                                <div className="article-link-container" >
                                    <Link className="article-link" href={`/article/${item.id}/#nav`}>Read More...</Link>
                                </div>
                            </div>
                        </div>
                        <div className="article-filter"></div>
                    </li>
                )
            })
        )
    },[elementList, router])

    return (
        <ul className="article-list">
          {articleListElement}
        </ul>
    )
}

export default ArticlePreview