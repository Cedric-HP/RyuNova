/* eslint-disable @next/next/no-img-element */
import { AppDispatch, RootState} from "@/lib/reducers/store";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState, type FC } from "react";
import { useDispatch, useSelector} from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../Navbar";
import languageList from "@/lib/language";
import { InputStateInput } from "@/lib/types/utilitisesType";
import SpanInputFetchState from "../small_components/SpanInputFetchState";
import { setRegisterFetchTypeAction } from "@/lib/reducers/authSliceReducer/authSlice";
import useIsTyping from "@/lib/tools/useIsTyping";
import postImageAction from "@/lib/reducers/authSliceReducer/actions/image/postImageAction";
import resetPostImageStateAction from "@/lib/reducers/authSliceReducer/actions/image/resetPostImageStateAction";
import { tagFormat } from "@/lib/tools/stringTools";

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

    // PLACEHOLDER
    const PLACEHOLDER = useMemo(()=> languageList[language].placeHolders.description , [language])
    const [isPlaceholder, setIsPlaceholder] = useState(true)
    const textareaElement = useRef<HTMLSpanElement | null>(null)
    
    // useStates Section
    const [canSubmit, setCanSubmit] = useState<boolean>(false)

    // Input Valid States
    const [isTitleValid, setIsTitleValid] = useState<InputStateInput>("idle")
    const [isDescriptionValid, setIsDescriptionValid] = useState<InputStateInput>("idle")
    const [isImageValid, setIsImageValid] = useState<InputStateInput>("idle")
    const [isTagsValid, setIsTagsValid] = useState<InputStateInput>("idle")

    // Input Data States
    const [titleInput, setTitleInput] = useState<string>("")
    const [descriptionInput, setDescriptionInput] = useState<string>("")
    const [imageInput, setImageInput] = useState<Blob | MediaSource | null | "error">(null)
    const [currentTag, setCurrentTag] = useState<string>("")
    const [tagInput, setTagInput] = useState<string>("")

    // Error States
    const [titleError, setTitleError] = useState<string>("")
    const [descriptionError, setDescriptionError] = useState<string>("")
    const [imageError, setImageError] = useState<string>("")
    const [tagsError, setTagsError] = useState<string>("")

    // Preview URL
    const [previewUrl, setPreviewUrl] = useState<string>("/")
    const [previewType, setPreviewType] = useState<string>("")

    // Handle Placeholder

    const handleFocus = useCallback((isFocus: boolean)=>{
        if (isFocus) {
            setIsPlaceholder(false) 
        }
        else {
            if (textareaElement.current) 
                if (textareaElement.current.textContent !== PLACEHOLDER) 
                    setIsPlaceholder(true) 
        }  
    },[PLACEHOLDER])

    useEffect(()=>{
        if (isPlaceholder) {
            if (textareaElement.current)
                if (textareaElement.current.textContent === "") 
                    textareaElement.current.textContent = PLACEHOLDER
        }    
        else {
            if (textareaElement.current) {
                if (textareaElement.current.textContent === PLACEHOLDER) 
                    textareaElement.current.textContent = ""
            }
        }       
    },[PLACEHOLDER, isPlaceholder])

    // Fonction to reset form input
    const resetFormInput = () => {
        setTitleInput("")
        setDescriptionInput("")
        setImageInput(null)
    }

    // Input handler
    const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setTitleInput(String(e.currentTarget.value))
        handleTyping("name")
    }

    const handleDescriptionInput = (e: React.ChangeEvent<HTMLInputElement >)=>{
        const input = String(e.target.innerHTML).replaceAll("<br>", "\n")
        setDescriptionInput(input)
        handleTyping("description")
    }

    const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement >) => {
        try {
             if (e.target.files && e.target.files[0] !== null){
                if (e.target.files[0].size > 50000000)
                    throw "File is too large!"
                // if (e.target.files[0].type)   
                    setPreviewType(e.target.files[0].type)
                    return setImageInput(e.target.files[0])
                
            } 
        } catch (error) {
            setImageInput("error")
            setIsImageValid("invalid")
            setImageError(String(error))
        }
    }

    // Preview Handle
    useEffect(()=>{
        if (imageInput !== null && imageInput !== "error") {
            try{
                setPreviewUrl(URL.createObjectURL(imageInput)) 
            }catch {
                setIsImageValid("idle")
                setImageInput(null)
                setPreviewUrl("/")
            }
            return
        }
        if (imageInput === "error")
            setPreviewUrl("/")
        
    },[imageInput])

    // Handle Tag Input
    const handleTagInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setTagInput(String(e.currentTarget.value))
        handleTyping("tag")
    }
    
    useEffect(()=>{
        if (!isTyping.state && isTyping.type === "tag") {
            const newTags = tagFormat(tagInput)
            setCurrentTag(newTags)
            setTagInput(newTags.replaceAll("_", " "))
        }
    }, [isTyping.state, isTyping.type, tagInput])

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
        setIsDescriptionValid("invalid")
        setDescriptionError("TOO LONG")
    },[descriptionInput.length])

    // Image
    useEffect(()=>{
        if ((imageInput === null || previewUrl === "/") && imageInput !== "error") {
            setIsImageValid("idle")
            setImageError("") 
            return
        }
        setIsImageValid("valid")
    },[imageInput, previewUrl])

    // Tags
    useEffect(()=>{
        if (currentTag.split("_").length <= 100) {
            setIsTagsValid("idle")
            setTagsError("") 
            return
        }
        setIsTagsValid("invalid")
        setTagsError("Too Many Tags!")
    },[currentTag, imageInput, previewUrl])


    // Use Effect to allow submission when all inputs are valid
    useEffect(()=>{
        if (imageUpload.imageCategory === "image") {
            if (
                isTitleValid === "valid" && 
                isDescriptionValid === "idle" &&
                isImageValid === "valid" &&
                isTagsValid === "idle" &&
                !isTyping.state
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
    },[imageUpload.imageCategory, isDescriptionValid, isImageValid, isTagsValid, isTitleValid, isTyping.state])


    // Handle Image Upload
    const handleImageUpload = useCallback( async (formdata: FormData) => {
        dispatch(setRegisterFetchTypeAction("register"))
        dispatch(
            postImageAction({
                formData: formdata,
                token: accessToken,
            })
        );
    },[accessToken, dispatch]);

    // FormeData
    const handleSubmitImage = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("description", descriptionInput)
        formData.append("imageCategory", imageUpload.imageCategory)
        formData.set("tags", currentTag)
        handleImageUpload(formData);
    },[currentTag, descriptionInput, handleImageUpload, imageUpload.imageCategory])

    // Use Effect that handles respond Register Submit
    useEffect(()=>{
        if (imageUpload.imageUploadValid.state === "valid") {
            setTimeout(()=>{
                resetFormInput()
                dispatch(resetPostImageStateAction())
                dispatch(setFullScreenAction(""))
            },2000)
            return
        }    
    },[dispatch, imageUpload.imageUploadValid.state])

    return ( 
        <>
            <div className="full-screen-button" onClick={()=>dispatch(setFullScreenAction(""))}></div>
            <div className="full-screen-popup full-screen-image-upload">
                {/* Register Section */}
                <p>{previewUrl}</p>
                <p>{previewType}</p>
                <h2 className="spacing-letter-big glow">
                    {imageUpload.imageCategory === "image" ?
                    languageList[language].titles.imageUpload.uploadImage :
                    imageUpload.imageCategory === "avatar" ?
                    languageList[language].titles.imageUpload.uploadAvatar:
                    languageList[language].titles.imageUpload.uploadBanner}
                </h2>
                <div className="image-upload-preview">
                    {previewUrl !== "/" ?
                    <img src={previewUrl} alt="Preview"/> : 
                    <div className="image-upload-preview-placholder"></div>}
                </div>
                <form action="Image-Upload" onSubmit={handleSubmitImage}>
                    <div className={`input-container ${isImageValid === "invalid" ? "input-logreg-container-error" : ""}`}>
                        <input 
                            name="image" 
                            className={`base-input file-input
                                ${isImageValid === "valid" ? "input-valid" : 
                                isImageValid === "invalid" ? "input-invalid" : ""}`} 
                            type="file"
                            accept=".png, .jpg, .jpeg, .webp"
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
                    {imageUpload.imageCategory === "image" ?
                    <>
                    <div className={`input-container ${isTitleValid === "invalid" ? "input-logreg-container-error" : ""}`}>
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
                    <div className={`input-container textarea-container${isDescriptionValid === "invalid" ? "input-logreg-container-error" : ""}`}>
                        <span 
                            ref={textareaElement}
                            id={`textarea_image`} 
                            className={`textarea ${isPlaceholder ? "placeholder" : ""} 
                                ${isDescriptionValid === "valid" ? "input-valid" : 
                                isDescriptionValid === "invalid" ? "input-invalid" : ""}`}
                            role="textbox"  
                            contentEditable={!(imageUpload.fetch.fetchState === "feching" || imageUpload.imageUploadValid.state === "valid")}
                            onFocus={()=>handleFocus(true)}
                            onBlur={()=>handleFocus(false)} 
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
                    <div className={`input-container ${isTagsValid === "invalid" ? "input-logreg-container-error" : ""}`}>
                        <input
                            name="tags"
                            type="text"
                            className={`base-input 
                                ${isTagsValid === "valid" ? "input-valid" : 
                                isTagsValid === "invalid" ? "input-invalid" : ""}`} 
                            placeholder={languageList[language].placeHolders.tagsPlaceholder}
                            onChange={handleTagInput}
                            value={tagInput}
                            disabled={(imageUpload.fetch.fetchState === "feching" || imageUpload.imageUploadValid.state === "valid")}
                        />
                        <SpanInputFetchState 
                            state={isTagsValid}
                            isTyping={isTyping}
                            type="email"  
                        />
                        <p>{tagsError}</p>
                    </div>
                    </> : <></>}
                    
                    {imageUpload.fetch.fetchState === "feching" ?
                    <span>Loading</span> : 
                    <>{ imageUpload.imageUploadValid.state === "valid" ? 
                    <span>DONE</span>: 
                    <div className="button-container">
                        <button 
                            type="submit" 
                            className={`button-normal button-cta 
                            ${canSubmit ? "push-action" : "button-disable"}`} 
                            disabled={!canSubmit}
                        >{languageList[language].button.send}</button>
                    </div>}</>}
                    {imageUpload.imageUploadValid.state === "invalid" ? 
                    <>
                    <p>{imageUpload.imageUploadValid.message}</p>
                    <p>{imageUpload.imageUploadValid.error}</p>
                    </> : 
                    <></>}
                    <p>{imageUpload.fetch.error}</p>
                </form>
                <button className="full-screen-xmark"
                    onClick={()=>dispatch(setFullScreenAction(""))}
                    onKeyDown={()=>dispatch(setFullScreenAction(""))}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </>
    )
}

export default FullScreenImageUpload