import { useDispatch } from "react-redux"
import { LocalView, LocalViewList } from "../types/utilitisesType"
import useLocalViewStorage from "./useLocalViewStorage"
import { AppDispatch } from "../reducers/store"
import getAddContentViewAction from "../reducers/authSliceReducer/actions/content/getAddContentView"

export const useView = () => {
    const [localViewList, setLocalViewList] = useLocalViewStorage("localViewList", [])
    const dispatch: AppDispatch = useDispatch()

    const checkLocalViewUser = (userId: number) => {
        if (localViewList === undefined || typeof localViewList === "string" ) return false
        const checkUser = localViewList.find((item: LocalView)=>item.userId === userId)
        if (!checkUser) {
            const newList: LocalViewList = [...localViewList]
            newList.push({
                userId: userId,
                image: []
            })
            setLocalViewList(newList)
            return newList
        }
        const list: LocalViewList = [...localViewList]
        return list
    }

    const addView  = (userId: number, contentType: "image", contentId: number) => {
        const newList = checkLocalViewUser(userId)
        if (!newList) return 
        const userViews = newList.find((item)=>item.userId === userId)
        if (!userViews) return 
        const contentViewed = userViews[contentType].find((item)=> item.id === contentId)
        if (!contentViewed) {
            userViews[contentType].push({id: contentId, lastViewAt: new Date()})
            setLocalViewList(newList)
            dispatch(getAddContentViewAction({contentId, contentType}))
            return 
        }
        const now = new Date().getTime();
        const past = new Date(contentViewed.lastViewAt).getTime();
        const diffInSeconds = Math.floor((now - past) / 1000)
        if (diffInSeconds < 86400) return
        contentViewed.lastViewAt = new Date()
        setLocalViewList(newList)
        dispatch(getAddContentViewAction({contentId, contentType}))
    }
    return {addView}
}