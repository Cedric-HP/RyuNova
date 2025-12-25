"use client"

// import Link from "next/link";
// import Image from "next/image";
import "../../styles/search.scss"
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState, FormEvent, type FC } from "react";
import { ContentData, SorterImput, TypeImput, UserData } from "@/lib/types/contenteType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { articleList, imageBentoList, userListTest } from "@/lib/testContent";
import BentoGallery from "../components/BentoGallery";
import ArticlePreview from "../components/ArticlePreview";
import { contentSorter, filterHandler, filterUserHandler, userSorter } from "@/lib/tools/FilterSorter";
import UserList from "../components/UserList";
import { numberReducerFormat } from "@/lib/tools/stringTools";

const Search: FC = () => {

    const router = useRouter()

    // Search Params and Pathname set
    const pathname = usePathname()
    const searchParams = useSearchParams()

    //Search
    const search = useMemo( ()=> {
        if (pathname === "/search")
            return searchParams.get('search')
    }, [pathname, searchParams])

    //Tag
    const tag = useMemo( ()=> {
        if (pathname === "/search")
            return searchParams.get('tag')
    }, [pathname, searchParams])

    //Type
    const type: TypeImput = useMemo( ()=> {
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

    //Sort
    const sort: SorterImput = useMemo( ()=> {
        if (pathname === "/search") {
            const input = searchParams.get('sort')
            if ( (input !== "view" && input !== "like" && input !== "date" ) || input === undefined) {
                router.push(`/search?search=${search}&type=${type}&sort=view&tag=${tag}/#nav`)
                return "view"
            }   
            return input
        }
        return "view"
    }, [pathname, router, search, searchParams, tag, type])

    const [lastType, setLastType] = useState<TypeImput>(type)
    const [currentSearch, setCurrentSearch] = useState<string>(search || "")
    const [currentType, setCurrentType] = useState<TypeImput>(type)
    const [currentSort, setCurrentSort] = useState<SorterImput>(sort)
    const [currentTag, setCurrentTag] = useState<string>(tag || "")
    const [searchInput, setSearchInput] = useState<string>(search || "")
    const [tagInput, setTagInput] = useState<string>(String(tag).replaceAll("_", " ") || "")
    const [resultList, setResultList] = useState<ContentData[]>([])
    const [userResultList, setUserResultList] = useState<UserData[]>([])

    useEffect(()=>{
        if(lastType !== type) {
            setCurrentType(type)
            setLastType(type)
        }
    },[lastType, type])

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
        const trimedImput = tagInput.replaceAll("_", " ").replaceAll("&", " ").replaceAll("=", " ").replaceAll("#", " ").trim().replace(/\s\s+/g, ' ')
        const rawTagList = trimedImput.split(" ")
        const filteredTagList: string[] = []
        rawTagList.forEach((item)=>{
            if(!filteredTagList.includes(item) && item !== "")
                filteredTagList.push(item)
        })
        let newTags = ""
        filteredTagList.forEach((item)=>{
            newTags += item + "_"
        })
        setCurrentTag(newTags.slice(0, -1))
        setTagInput(newTags.slice(0, -1).replaceAll("_", " "))
    }, [tagInput])

    useEffect(()=>{
        if (pathname === "/search" && (currentSearch !== search || currentSort !== sort || currentTag !== tag || (currentType !== type && lastType === type) )) {
            router.push(`/search?search=${currentSearch}&type=${currentType}&sort=${currentSort}&tag=${currentTag}`)
        }
    },[currentSearch, currentSort, currentTag, currentType, lastType, pathname, router, search, sort, tag, type])

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
            <section id="search-tool-section">
                <div id="tag-search">
                    <form id="tags" className="search-bar" onSubmit={handleTag}>
                        <input
                            name="tag"
                            type="search" 
                            placeholder="Tags (Separe tags with space)"
                            onChange={handleTagInput}
                            value={tagInput}
                        />
                        <button className="push-action" type="submit">
                            Apply
                        </button>
                    </form>
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input
                            name="search"
                            type="search" 
                            placeholder="Search"
                            onChange={handleSearchInput}
                            defaultValue={(search === undefined || search === null) ? "" : String(currentSearch)}
                        />
                        <button className="push-action" type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                </div>
                <div id="sorter-type">
                    <div id="sorter">
                        <p>Sort By :</p>
                        <button 
                        className={`link push-action ${currentSort === "view" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentSort("view")}
                        >
                            View
                        </button>
                        <button 
                        className={`link push-action ${currentSort === "like" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentSort("like")}
                        >
                            Like
                        </button>
                        <button 
                        className={`link push-action ${currentSort === "date" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentSort("date")}
                        >
                            Date
                        </button>
                    </div>
                    <div id="type">
                        <p>Type :</p>
                        <button 
                        className={`link push-action ${currentType === "image" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentType("image")}
                        >
                            Image
                        </button>
                        <button 
                        className={`link push-action ${currentType === "article" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentType("article")}
                        >
                            Article
                        </button>
                        <button 
                        className={`link push-action ${currentType === "user" ? "sort-selected" : ""}`}
                        onClick={()=>setCurrentType("user")}
                        >
                            User
                        </button>
                    </div>
                </div>
            </section>
            <hr className="section-separator"/>
            <section id="result-section">
                <div id="result-info">
                    <span>Result : {currentType === "user" ? numberReducerFormat(userResultList.length) : numberReducerFormat(resultList.length)}</span>
                    <span>Tags : {String(currentTag).replaceAll("_", " ")}</span>
                </div>
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
                    <h3 id="no-result" className="spacing-letter-big glow">No Result found</h3>
                </> : <></>}
            </section>
        </>
    )
}

export default Search