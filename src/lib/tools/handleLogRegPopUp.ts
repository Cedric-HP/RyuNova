import { useDispatch } from "react-redux"
import { AppDispatch } from "../reducers/store"
import setLogRegAction from "../reducers/utilitisesReducer/actions/setLogRegAction"
import setFullScreenAction from "../reducers/utilitisesReducer/actions/setFullScreenAction"
import { LogRegInput } from "../types/utilitisesType"

const useHandleLogRegPopUp = () => {
    const dispatch: AppDispatch = useDispatch()
    
    const handleLogReg = (type: LogRegInput) => {
        dispatch(setLogRegAction(type))
        dispatch(setFullScreenAction("log-reg"))
    }
    return {handleLogReg}
}

export default useHandleLogRegPopUp