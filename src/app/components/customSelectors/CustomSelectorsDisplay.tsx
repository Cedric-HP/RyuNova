import { useEffect, useRef, useState, type FC } from "react";
import "../../../styles/components/custom_selectors_components/custom-selectors-display.scss"
import CustomSelectorLanguageComponent from "./CustomSelectorLanguage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/reducers/store";
import setCustomSelectorAction from "@/lib/reducers/utilitisesReducer/actions/setCustomSelectorAction";
import CustomSelectorUserComponent from "./CustomSelectorUser";

const CustomSelectorsDisplayComponent: FC  = () => {

    // Reducers
    const { customSelectorDisplayed } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Ref
    const ref = useRef<HTMLDivElement | null>(null);

    // Detect click ouside of the element
//     useEffect(() => {
//     const handleOutSideClick = (event: MouseEvent) => {
//       if (ref.current &&
//         event.target instanceof Node &&
//         !ref.current.contains(event.target)) {
//         dispatch(setCustomSelectorAction(""))
//       }
//     };

//     window.addEventListener("mousedown", handleOutSideClick);

//     return () => {
//       window.removeEventListener("mousedown", handleOutSideClick);
//     };
//   }, [dispatch, ref]);

    // isMounted
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
            setIsMounted(true);
    }, []);
    return (
        <div  ref={ref} className="custom-selectors-display" style={{opacity: isMounted ? "1" : "0"}}>
            <div className="custom-selectors-button" onClick={()=>dispatch(setCustomSelectorAction(""))}></div>
            <CustomSelectorLanguageComponent/>
            <CustomSelectorUserComponent/>
            <div className={`custom-selectors-heigth ${customSelectorDisplayed === "language" ? "custom-select-appear" : "custom-select-disappear"}`}></div>
        </div>
    )
}

export default CustomSelectorsDisplayComponent