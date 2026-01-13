"use client"

import "../../styles/pages/search.scss"
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState, FormEvent, type FC } from "react";
import { ContentData, UserData } from "@/lib/types/contenteType";
import {  SorterInput, TypeInput } from "@/lib/types/utilitisesType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { articleList, imageBentoList, userListTest } from "@/lib/testContent";
import BentoGallery from "../components/main_components/BentoGallery";
import ArticlePreview from "../components/main_components/ArticlePreview";
import { contentSorter, filterHandler, filterUserHandler, userSorter } from "@/lib/tools/FilterSorter";
import UserList from "../components/main_components/UserList";
import { numberReducerFormat, tagFormat } from "@/lib/tools/stringTools";
import languageList from "@/lib/language";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/store";

const Search: FC = () => {

    // Reducers
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )

    // Router
    
    const router = useRouter()

    // Search Params and Pathname set

    const pathname = usePathname()
    const searchParams = useSearchParams()

    //Search Param

    const search = useMemo( ()=> {
        if (pathname === "/search")
            return searchParams.get('search')
    }, [pathname, searchParams])

    //Tag Param

    const tag = useMemo( ()=> {
        if (pathname === "/search")
            return searchParams.get('tag')
    }, [pathname, searchParams])

    //Type Param

    const type: TypeInput = useMemo( ()=> {
        if (pathname === "/search") {
            const input = searchParams.get('type')
            if ( (input !== "image" && input !== "article" && input !== "user" ) || input === undefined) {
                router.push(`/search?search=${search}&type=image&sort=view&tag=${tag}/#nav`)
                return "image"
            } 
            return input
        }
        return "image"
    }, [pathname, router, search, searchParams, tag])

    //Sort Param

    const sort: SorterInput = useMemo( ()=> {
        if (pathname === "/search") {
            const input = searchParams.get('sort')
            if ( (input !== "view" && input !== "like" && input !== "date" && input !== "follower") || input === undefined || (input === "follower" && type !== "user")) {
                router.push(`/search?search=${search}&type=${type}&sort=view&tag=${tag}/#nav`)
                return "view"
            } 
            return input
        }
        return "view"
    }, [pathname, router, search, searchParams, tag, type])

    // State Declaration

    const [lastType, setLastType] = useState<TypeInput>(type)
    const [lastSort, setLastSort] = useState<SorterInput>(sort)
    const [currentSearch, setCurrentSearch] = useState<string>(search || "")
    const [currentType, setCurrentType] = useState<TypeInput>(type)
    const [currentSort, setCurrentSort] = useState<SorterInput>(sort)
    const [currentTag, setCurrentTag] = useState<string>(tag || "")
    const [searchInput, setSearchInput] = useState<string>(search || "")
    const [tagInput, setTagInput] = useState<string>(String(tag).replaceAll("_", " ") || "")
    const [resultList, setResultList] = useState<ContentData[]>([])
    const [userResultList, setUserResultList] = useState<UserData[]>([])

    // Use Effect to correctly set the current type and sort

    useEffect(()=>{
        if(lastType !== type) {
            setCurrentType(type)
            setLastType(type)
        }
        if(lastSort !== sort) {
            setCurrentSort(sort)
            setLastSort(sort)
        }
    },[lastSort, lastType, sort, type])

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setSearchInput(String(e.currentTarget.value).trim())
        e.preventDefault()
    }

    const handleSearch = useCallback( (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCurrentSearch(searchInput)
        if(pathname !== "/search")
            router.push(`/search?search=${currentSearch}&type=${currentType}&sort=${currentSort}&tag=${currentTag}`)
    },[currentSearch, currentSort, currentTag, currentType, pathname, router, searchInput])

    const handleTagInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setTagInput(String(e.currentTarget.value))
    }

    const handleTag = useCallback ((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTags = tagFormat(tagInput)
        setCurrentTag(newTags)
        setTagInput(newTags.replaceAll("_", " "))
    }, [tagInput])

    // Use Effect to change the route automatically based on dependencies

    useEffect(()=>{
        if (pathname === "/search" && (
                currentSearch !== search || 
                currentSort !== sort || 
                currentTag !== tag || 
                (currentType !== type && lastType === type) 
            )) {
            router.push(`/search?search=${currentSearch}&type=${currentType}&sort=${currentSort}&tag=${currentTag}`)
        }
    },[currentSearch, currentSort, currentTag, currentType, lastType, pathname, router, search, sort, tag, type])

    // Use Effect which simulates a fetch based on the type and dependencies

    useEffect(()=>{
        switch(currentType) {
            case "image":
                setResultList( filterHandler( imageBentoList, currentSearch, currentTag) )
                break
            case "article":
                setResultList( filterHandler( articleList, currentSearch, currentTag) )
                break
            case "user":
                setUserResultList( filterUserHandler(userListTest, currentSearch))
                break
        }
    },[currentSearch, currentTag, currentType])

    return (
        <>  

            {/* Search nav bar Section */}
            <section id="search-tool-section">

                {/* Tag Section */}
                <div id="tag-search">
                    <form id="tags" className="search-bar" onSubmit={handleTag}>
                        <input
                            name="tag"
                            type="search" 
                            placeholder={languageList[currentLanguage].placeHolders.tagsPlaceholder}
                            onChange={handleTagInput}
                            value={tagInput}
                        />
                        <button className="push-action" type="submit">
                            {languageList[currentLanguage].button.apply}
                        </button>
                    </form>
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input
                            name="search"
                            type="search" 
                            placeholder={languageList[currentLanguage].placeHolders.search}
                            onChange={handleSearchInput}
                            defaultValue={(search === undefined || search === null) ? "" : String(currentSearch)}
                        />
                        <button className="push-action" type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                </div>

                {/* Sort and type Section */}
                <div id="sorter-type">

                    {/* Sort Section */}
                    <div id="sorter">
                        <p>{languageList[currentLanguage].button.sortBy} :</p>
                        <button 
                        className={`link push-action ${currentSort === "view" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentSort("view")}
                        >
                            {languageList[currentLanguage].contentType.view.singular}
                        </button>
                        <button 
                        className={`link push-action ${currentSort === "like" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentSort("like")}
                        >
                            {languageList[currentLanguage].contentType.like.singular}
                        </button>
                        <button 
                        className={`link push-action ${currentSort === "date" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentSort("date")}
                        >
                            {languageList[currentLanguage].contentType.date.singular}
                        </button>
                        {currentType === "user" ? <>
                        <button 
                        className={`link push-action ${currentSort === "follower" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentSort("follower")}
                        >
                            {languageList[currentLanguage].contentType.follower.singular}
                        </button>
                        </> : <></>
                        }
                    </div>

                    {/* Type Section */}
                    <div id="type">
                        <p>{languageList[currentLanguage].button.type} :</p>
                        <button 
                        className={`link push-action ${currentType === "image" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentType("image")}
                        >
                            {languageList[currentLanguage].contentType.image.singular}
                        </button>
                        <button 
                        className={`link push-action ${currentType === "article" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentType("article")}
                        >
                            {languageList[currentLanguage].contentType.article.singular}
                        </button>
                        <button 
                        className={`link push-action ${currentType === "user" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentType("user")}
                        >
                            {languageList[currentLanguage].contentType.user.singular}
                        </button>
                    </div>
                </div>
            </section>
            <hr className="section-separator"/>

            {/* Result Section */}
            <section id="result-section">

                {/* Result Info */}
                <div id="result-info">
                    <span>{ currentType === "user" ? 
                        (userResultList.length > 1 ? 
                            languageList[currentLanguage].contentType.result.plural : 
                            languageList[currentLanguage].contentType.result.singular
                        ) :
                        (resultList.length > 1 ? 
                            languageList[currentLanguage].contentType.result.plural : 
                            languageList[currentLanguage].contentType.result.singular
                        )
                        } : {currentType === "user" ? 
                        numberReducerFormat(userResultList.length) : 
                        numberReducerFormat(resultList.length)}
                    </span>
                    {currentTag !== "" ? <>
                    <span>{currentTag.split("_").length > 1 ? 
                        languageList[currentLanguage].contentType.tag.plural :
                        languageList[currentLanguage].contentType.tag.singular
                        } : {String(currentTag).replaceAll("_", " ")}
                    </span>
                    </> : <></>}
                </div>

                {/* Result list */}
                {currentType === "image" ? <>
                    <BentoGallery elementList={contentSorter( resultList, currentSort )}/>
                </> : <></>}
                {currentType === "article" ? <>
                    <ArticlePreview elementList={contentSorter( resultList, currentSort )}/>
                </> : <></>}
                {currentType === "user" ? <>
                        <UserList userList={userSorter(userResultList, currentSort)}/>
                </> : <></>}
                { ( (resultList.length === 0 && currentType !== "user") || (userResultList.length === 0 && currentType === "user") )  ? <>
                    <h3 id="no-result" className="spacing-letter-big glow">{languageList[currentLanguage].message.error.noResultFound}</h3>
                </> : <></>}
            </section>
        </>
    )
}

export default Search