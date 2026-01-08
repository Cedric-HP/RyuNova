import { AppDispatch, RootState} from "@/lib/reducers/store";
import { FormEvent, useCallback, useEffect, useState, type FC } from "react";
import { useDispatch, useSelector} from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../Navbar";
import languageList from "@/lib/language";
import { InputStateInput } from "@/lib/types/utilitisesType";
import checkDuplicateAction from "@/lib/reducers/authSliceReducer/actions/logReg/checkDuplicateAction";
import setRegisterFetchStateIdleAction from "@/lib/reducers/authSliceReducer/actions/logReg/setRegisterFetchStateIdleAction";
import SpanInputFetchState from "../small_components/SpanInputFetchState";
import { setRegisterFetchTypeAction } from "@/lib/reducers/authSliceReducer/authSlice";
import validator from 'validator';
import postRegisterAction from "@/lib/reducers/authSliceReducer/actions/logReg/postRegisterAction";
import setLogRegAction from "@/lib/reducers/utilitisesReducer/actions/setLogRegAction";
import resetRegisterStateAction from "@/lib/reducers/authSliceReducer/actions/logReg/resetRegisterStateAction";
import postLoginAction from "@/lib/reducers/authSliceReducer/actions/logReg/postLoginAction";
import resetLoginStateAction from "@/lib/reducers/authSliceReducer/actions/logReg/resetLoginAction";
import setLoginFetchStateIdleAction from "@/lib/reducers/authSliceReducer/actions/logReg/setLoginFetchStateIdleAction";
import useIsTyping from "@/lib/tools/useIsTyping";

const formData = new FormData()
formData.append("image", "")

const FullScreenImageUpload: FC  = () => {

    // Reducers
    const { accessToken, imageUpload  } = useSelector(
        (store: RootState) => store.auth
    )
    const dispatch: AppDispatch = useDispatch()

    // Language Context
    const { language } = useGlobalContext()

    // Use IsTyping
    const {isTyping, handleTyping} = useIsTyping()


    // useStates Section
    const [canSubmit, setCanSubmit] = useState<boolean>(false)

    // Input Valid States
    const [isTitleValid, setIsTitleValid] = useState<InputStateInput>("idle")
    const [isDescriptionValid, setIsDescriptionValid] = useState<InputStateInput>("idle")
    const [isImageValid, setIsImageValid] = useState<InputStateInput>("idle")

    // Input Data States
    const [titleInput, setTitleInput] = useState<string>("")
    const [descriptionInput, setDescriptionInput] = useState<string>("")
    const [imageInput, setImageInput] = useState<FormData>(formData)

    // Error States
    const [titleError, setTitleError] = useState<string>("")
    const [descriptionError, setDescriptionError] = useState<string>("")
    const [imageError, setImageError] = useState<string>("")


    // Fonction to reset form input
    const resetFormInput = () => {
        setTitleInput("")
        setDescriptionInput("")
        setImageInput(formData)
    }

    // Input handler
    const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setTitleInput(String(e.currentTarget.value))
        handleTyping("name")
    }

    const handleDescriptionInput= (e: React.ChangeEvent<HTMLInputElement >) => {
        setDescriptionInput(String(e.currentTarget.value))
        handleTyping("email")
    }

    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        if (e.target.files && e.target.files[0] !== null){
            const file = e.target.files[0]
            setImageInput(()=>{
                const newData = new FormData()
                newData.append("image", file)
                return newData
            })
        }  
    }
    useEffect(()=>{
        console.log(imageInput)
    },[imageInput])

    // UseEffect to handle Fetch state
    // Image Upload
    // useEffect(()=>{
    //     if (register.fetch.fetchState === "done" || register.fetch.fetchState === "error")
    //         setTimeout(() => {
    //             dispatch(setRegisterFetchStateIdleAction())
    //         }, 500);
    // },[dispatch, register.fetch.fetchState])


    // Use Effect to Validate inputs
    // Title
    useEffect(()=>{
        if (titleInput === "") {
            setIsTitleValid("idle")
            setTitleError("")
            return
        }
        if (titleInput.length < 3 && !isTyping.state) {
            setIsTitleValid("invalid")
            setTitleError(languageList[language].message.error.nameTooShort)
            return
        }
        if (titleInput.length > 50 && !isTyping.state) {
            setIsTitleValid("invalid")
            setTitleError(languageList[language].message.error.nameTooLong)
            return
        }
        setIsTitleValid("valid")
    },[isTyping.state, language, titleInput])

    // Description
    useEffect(()=>{
        if (descriptionInput.length <= 1000) {
            setIsDescriptionValid("idle")
            setDescriptionError("")
            return
        }
        if (descriptionInput.length > 1000) {
            setIsDescriptionValid("invalid")
            setDescriptionError("TOO LONG")
        }
    },[descriptionInput.length])

    // Image
    useEffect(()=>{
        if (imageInput.get("image") === "") {
            setIsImageValid("idle")
            setImageError("") 
            return
        }
        setIsImageValid("valid")
    },[imageInput])


    // Use Effect to allow submission when all inputs are valid
    useEffect(()=>{
        if (imageUpload.imageCategory === "image") {
            if (
                isTitleValid === "valid" && 
                isDescriptionValid === "valid" &&
                isImageValid === "valid"
            )
                setCanSubmit(true)
            else setCanSubmit(false)
            return
        }
        else  {
            if (isImageValid === "valid")
                setCanSubmit(true)
            else setCanSubmit(false)
        }
    },[imageUpload.imageCategory, isDescriptionValid, isImageValid, isTitleValid])


    // Handle Image Upload
    const handleImageUpload = useCallback( async (formdata: FormData) => {
        dispatch(setRegisterFetchTypeAction("register"))
        dispatch(
            postRegisterAction({
                name: String(formdata.get("name")),
                email: String(formdata.get("email")),
                password: String(formdata.get("password")),
            })
        );
    },[dispatch]);

    // FormeData
    const handleSubmitImage = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        handleImageUpload(formData);
    },[handleImageUpload])

    // Use Effect that handles respond Register Submit
    // useEffect(()=>{
    //     if (imageUpload.imageUploadValid.state === "valid") {
    //         setTimeout(()=>{
    //             resetFormInput()
    //             dispatch(resetRegisterStateAction())
    //             dispatch(setLogRegAction("log"))
    //         },2000)
    //         return
    //     }
    //     if (imageUpload.imageUploadValid.state === "invalid") {
    //         console.log("SA MARCHE PAS!!")
    //         return
    //     }    
    // },[dispatch, imageUpload.imageUploadValid.state])

    return ( 
        <>
            <div className="full-screen-button" onClick={()=>dispatch(setFullScreenAction(""))}></div>
            <button className="full-screen-xmark"
                onClick={()=>dispatch(setFullScreenAction(""))}
                onKeyDown={()=>dispatch(setFullScreenAction(""))}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="full-screen-popup full-screen-lor-reg">
                <p>{titleInput}</p>
                <p>{descriptionInput}</p>

                {/* Register Section */}
                <h2 className="spacing-letter-big glow">{languageList[language].button.signUp}</h2>
                <form action="Image-Upload" onSubmit={handleSubmitImage}>
                    <div className={`input-logreg-container ${isTitleValid === "invalid" ? "input-logreg-container-error" : ""}`}>
                        <input 
                            name="title" 
                            className={`base-input 
                                ${isTitleValid === "valid" ? "input-valid" : 
                                isTitleValid === "invalid" ? "input-invalid" : ""}`} 
                            type="text" 
                            placeholder="Title"
                            onChange={handleTitleInput}
                            disabled={(imageUpload.fetch.fetchState === "feching" || imageUpload.imageUploadValid.state === "valid")}
                        />
                        <SpanInputFetchState 
                            state={isTitleValid} 
                            isTyping={isTyping} 
                            type="text"                           
                        />
                        <p>{titleError}</p>
                    </div>
                    <div className={`input-logreg-container ${isDescriptionValid === "invalid" ? "input-logreg-container-error" : ""}`}>
                        <span 
                            ref={textareaElement}
                            id={`textarea_image`} 
                            className={`textarea ${isPlaceholder ? "placeholder" : ""} 
                                ${isDescriptionValid === "valid" ? "input-valid" : 
                                isDescriptionValid === "invalid" ? "input-invalid" : ""}`}
                            role="textbox"  
                            contentEditable
                            onInput={handleDescriptionInput}
                        >
                        </span>
                        <SpanInputFetchState 
                            state={isDescriptionValid}
                            isTyping={isTyping}
                            type="email"  
                        />
                        <p>{descriptionError}</p>
                    </div>
                    <div className={`input-logreg-container ${isImageValid === "invalid" ? "input-logreg-container-error" : ""}`}>
                        <input 
                            name="image" 
                            className={`base-input 
                                ${isImageValid === "valid" ? "input-valid" : 
                                isImageValid === "invalid" ? "input-invalid" : ""}`} 
                            type="file"
                            accept="image/*"
                            placeholder="Your Image"
                            onChange={handleImageInput}
                            disabled={(imageUpload.fetch.fetchState === "feching" || imageUpload.imageUploadValid.state === "valid")}
                        />
                        <SpanInputFetchState 
                            state={isImageValid}
                            isTyping={isTyping}
                            type="password"  
                        />
                        <p>{imageError}</p>
                    </div>
                    {imageUpload.fetch.fetchState === "feching" ?
                    <span>Loading</span> : 
                    <>{ imageUpload.imageUploadValid.state === "valid" ? 
                    <span>DONE</span>: 
                    <div className="button-logreg-container">
                        <button 
                            className="link link-button" 
                            onClick={()=> dispatch(setLogRegAction("log"))}
                            onKeyDown={()=> dispatch(setLogRegAction("log"))}
                        >Login</button>
                        <button 
                            type="submit" 
                            className={`button-normal button-cta 
                            ${canSubmit ? "push-action" : "button-disable"}`} 
                            disabled={!canSubmit}
                        >{languageList[language].button.signUp}</button>
                    </div>}</>}
                    {imageUpload.imageUploadValid.state === "invalid" ? 
                    <>
                    <p>{imageUpload.imageUploadValid.message}</p>
                    <p>{imageUpload.imageUploadValid.error}</p>
                    </> : 
                    <></>}
                    <p>{imageUpload.fetch.error}</p>
                </form>
            </div>
        </>
    )
}

export default FullScreenImageUpload