"use client"

import "../../styles/pages/search.scss"
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState, FormEvent, type FC } from "react";
import {  OrderInput, SorterInput, TypeInput } from "@/lib/types/utilitisesType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import BentoGallery from "../components/main_components/BentoGallery";
import ArticlePreview from "../components/main_components/ArticlePreview";
import UserList from "../components/main_components/UserList";
import { numberReducerFormat, tagFormat } from "@/lib/tools/stringTools";
import languageList from "@/lib/language";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import getSearchAction from "@/lib/reducers/authSliceReducer/actions/content/getSearchAction";
import setGetSearchFetchStateIdleAction from "@/lib/reducers/authSliceReducer/actions/content/setGetSearchFetchStateIdleAction";

const Search: FC = () => {

    // Reducers
    const { currentLanguage  } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const { getSearch } = useSelector(
        (store: RootState) => store.auth
    )
    const dispatch: AppDispatch = useDispatch()

    // Router
    const router = useRouter()

    // Search Params and Pathname set
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Search Param
    const search = useMemo(() => {
        return pathname === "/search" ? searchParams.get("search") : null
    }, [pathname, searchParams])

    // Tag Param
    const tag = useMemo(() => {
        return pathname === "/search" ? searchParams.get("tag") : null
    }, [pathname, searchParams])

    // Page Param
    const page = useMemo(() => {
        if (pathname !== "/search") return 0
        const rawPage = searchParams.get("page")
        return rawPage ? Number.parseInt(rawPage) || 0 : 0
    }, [pathname, searchParams])

    // Type Param
    const type: TypeInput = useMemo(() => {
        const input = searchParams.get("type")
        return input === "image" || input === "article" || input === "user"
        ? input
        : "image"
    }, [searchParams])

    // Sort Param
    const sort: SorterInput = useMemo(() => {
        const input = searchParams.get("sort")
        if (input === "view" || input === "like" || input === "date") return input
        if (input === "follow" && type === "user") return input
        return "view"
    }, [searchParams, type])

    // Order Param
    const order: OrderInput = useMemo(() => {
        const input = searchParams.get("order")
        return input === "ASC" || input === "DESC" ? input : "DESC"
    }, [searchParams])

    // Use Effect to correct Params
    useEffect(() => {
        if (pathname !== "/search") return

        const params = new URLSearchParams(searchParams.toString())

        let hasChanged = false

        if (params.get("type") !== type) {
            params.set("type", type)
            hasChanged = true
        }

        if (params.get("sort") !== sort) {
            params.set("sort", sort)
            hasChanged = true
        }

        if (params.get("order") !== order) {
            params.set("order", order)
            hasChanged = true
        }

        if (!params.get("page")) {
            params.set("page", String(page))
            hasChanged = true
        }

        if (hasChanged) {
            router.replace(`/search?${params.toString()}#nav`)
        }
    }, [pathname, searchParams, type, sort, order, page, router])

    // State Declaration
    // Last Params
    const [lastType, setLastType] = useState<TypeInput>(type)
    const [lastSort, setLastSort] = useState<SorterInput>(sort)
    const [lastOrder, setLastOrder] = useState<OrderInput>(order)

    // Current Params
    const [currentSearch, setCurrentSearch] = useState<string>(search || "")
    const [currentType, setCurrentType] = useState<TypeInput>(type)
    const [currentSort, setCurrentSort] = useState<SorterInput>(sort)
    const [currentTag, setCurrentTag] = useState<string>(tag || "")
    const [currentOrder, setCurrentOrder] = useState<OrderInput>(order)
    const [currentPage, setCurrentPage] = useState<number>(page || 0)

    // Inputs
    const [searchInput, setSearchInput] = useState<string>(search || "")
    const [tagInput, setTagInput] = useState<string>(String(tag).replaceAll("_", " ") || "")

    // isMounted
    const [isMounted, setIsMounted] = useState<boolean>(false);

    // didFirstFetch
    const [didFirstFetch, setDidFirstFetch] = useState<boolean>(false);

    // asChange
    const [asChange, setAsChange] = useState<boolean>(false)

    // Use Effect to reset getSaerch Fetsh State
    useEffect(()=>{
        if (getSearch.fetch.fetchState === "done")
            setTimeout(()=>dispatch(setGetSearchFetchStateIdleAction()),1000)
    },[dispatch, getSearch.fetch.fetchState])

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
        if(lastOrder !== order) {
            setCurrentOrder(order)
            setLastOrder(order)
        }
    },[lastOrder, lastSort, lastType, order, sort, type])

    // Input Handler
    // Search
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setSearchInput(String(e.currentTarget.value).trim())
        e.preventDefault()
    }

    // Tag
    const handleTagInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setTagInput(String(e.currentTarget.value))
    }

    // Set Current Handler
    // Search
    const handleSearch = useCallback( (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCurrentSearch(searchInput)
    },[searchInput])

    // Tag
    const handleTag = useCallback ((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTags = tagFormat(tagInput)
        setCurrentTag(newTags)
        setTagInput(newTags.replaceAll("_", " "))
    }, [tagInput])

    // Sort
    const handleSort = useCallback((newSort: SorterInput)=>{
        if (newSort === currentSort) {
            setCurrentOrder((prevState)=> prevState === "DESC" ? "ASC" : "DESC")
        }   
        else {
            setCurrentOrder("DESC")
            setCurrentSort(newSort)
        }
    },[currentSort])

    // Use Effect to change the route automatically based on dependencies
    useEffect(()=>{
        if (pathname === "/search" && 
            isMounted && 
            getSearch.fetch.fetchState === "idle" && (
                currentSearch !== search || 
                currentTag !== tag || 
                (currentType !== type && lastType === type) ||
                (currentSort !== sort && lastSort === sort) ||
                (currentOrder !== order && lastOrder === order) ||
                currentPage !== page ||
                currentOrder !== order
            )) {
            setAsChange(true)
            router.push(`/search?search=${currentSearch}&type=${currentType}&sort=${currentSort}&tag=${currentTag}&order=${currentOrder}&page=${currentPage}`)
        }
    },[asChange, currentOrder, currentPage, currentSearch, currentSort, currentTag, currentType, dispatch, getSearch.fetch.fetchState, isMounted, lastOrder, lastSort, lastType, order, page, pathname, router, search, sort, tag, type])

    useEffect(()=>{
        if (isMounted)
            if ( (asChange && getSearch.fetch.fetchState === "idle") || !didFirstFetch) {
                dispatch(getSearchAction({
                    search: currentSearch,
                    type: currentType,
                    sort: currentSort,
                    tag: currentTag,
                    user: -1,
                    order: currentOrder,
                    page: currentPage
                }))
                setAsChange(false)
                if (!didFirstFetch)
                    setDidFirstFetch(true)
            }
    },[asChange, currentOrder, currentPage, currentSearch, currentSort, currentTag, currentType, didFirstFetch, dispatch, getSearch.fetch.fetchState, isMounted])

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                        onClick={()=>handleSort("view")}
                        >
                            {languageList[currentLanguage].contentType.view.singular}
                        </button>
                        <button 
                        className={`link push-action ${currentSort === "like" ? "sort-selected" : ""}`}
                        onClick={()=>handleSort("like")}
                        >
                            {languageList[currentLanguage].contentType.like.singular}
                        </button>
                        <button 
                        className={`link push-action ${currentSort === "date" ? "sort-selected" : ""}`}
                        onClick={()=>handleSort("date")}
                        >
                            {languageList[currentLanguage].contentType.date.singular}
                        </button>
                        {currentType === "user" ? <>
                        <button 
                        className={`link push-action ${currentSort === "follow" ? "sort-selected" : ""}`}
                        onClick={()=>handleSort("follow")}
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
                        (getSearch.respond.totalResults > 1 ? 
                            languageList[currentLanguage].contentType.result.plural : 
                            languageList[currentLanguage].contentType.result.singular
                        ) :
                        (getSearch.respond.totalResults > 1 ? 
                            languageList[currentLanguage].contentType.result.plural : 
                            languageList[currentLanguage].contentType.result.singular
                        )
                        } : {
                        numberReducerFormat(getSearch.respond.totalResults)}
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
                    <BentoGallery elementList={getSearch.respond.results.image}/>
                </> : <></>}
                {currentType === "article" ? <>
                    <ArticlePreview elementList={getSearch.respond.results.article}/>
                </> : <></>}
                {currentType === "user" ? <>
                        <UserList userList={getSearch.respond.results.user}/>
                </> : <></>}
                { getSearch.respond.totalResults === 0 && getSearch.fetch.fetchState !== "error" ? <>
                    <h3 id="no-result" className="spacing-letter-big glow">{languageList[currentLanguage].message.error.noResultFound}</h3>
                </> : <></>}

                {/* Error */}
                {getSearch.fetch.fetchState === "error" && 
                <p>{getSearch.fetch.error}</p>}
            </section>
        </>
    )
}

export default Search