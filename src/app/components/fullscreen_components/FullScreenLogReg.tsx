import { AppDispatch, RootState} from "@/lib/reducers/store";
import { FormEvent, useCallback, useEffect, useState, type FC } from "react";
import { useDispatch, useSelector} from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../Navbar";
import languageList from "@/lib/language";
import { InputStateInput, IsTyping } from "@/lib/types/utilitisesType";
import checkDuplicateAction from "@/lib/reducers/authSliceReducer/actions/checkDuplicateAction";
import setRegisterFetchStateIdleAction from "@/lib/reducers/authSliceReducer/actions/setRegisterFetchStateIdleAction";
import SpanInputFetchState from "../small_components/SpanInputFetchState";
import { setRegisterFetchTypeAction } from "@/lib/reducers/authSliceReducer/authSlice";
import validator from 'validator';
import postRegisterAction from "@/lib/reducers/authSliceReducer/actions/postRegisterAction";
import setLogRegAction from "@/lib/reducers/utilitisesReducer/actions/setLogRegAction";

let isTypingTimeOut: ReturnType<typeof setTimeout> | null = null

const regularExpression = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

const FullScreenLogReg: FC  = () => {

    // Reducers
    const { accessToken, register } = useSelector(
        (store: RootState) => store.auth
    )
    const { logReg } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Language Context
    const { language } = useGlobalContext()

    // Use Effect to auto-exit the popup when user is log in
    useEffect(()=>{
        if (accessToken !== "")
            dispatch(setFullScreenAction(""))
    },[accessToken, dispatch])

    // useStates Section
    const [canSubmit, setCanSubmit] = useState<boolean>(false)
    const [isTyping, setIsTyping] = useState<IsTyping>({state: false, type: ""})
    const [isValidatorEmail, setIsValidatorEmail] = useState<boolean>(false)

    // Input Valid States
    const [isNameValid, setIsNameValid] = useState<InputStateInput>("idle")
    const [isEmailValid, setIsEmailValid] = useState<InputStateInput>("idle")
    const [isPasswordValid, setIsPasswordValid] = useState<InputStateInput>("idle")
    const [isConfPasswordValid, setIsConfPasswordValid] = useState<InputStateInput>("idle")

    // Input Data States
    // Register
    const [nameInput, setNameInput] = useState<string>("")
    const [emailInputReg, setEmailInputReg] = useState<string>("")
    const [passwordInputReg, setPasswordInputReg] = useState<string>("")
    const [confPasswordInput, setConfPasswordInput] = useState<string>("")
    // Login
    const [emailInputLog, setEmailInputLog] = useState<string>("")
    const [passwordInputLog, setPasswordInputLog] = useState<string>("")

    // Error States
    const [nameError, setNameError] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [confPasswordError, setConfPasswordError] = useState<string>("")

    // Is Typing Handler
    const handleTyping = (type: string) => {
        if (isTypingTimeOut !== null) {
            clearTimeout(isTypingTimeOut);
            isTypingTimeOut = null
        }
        else setIsTyping((prevState)=>{
            const newState = {...prevState}
            newState.state = true
            newState.type = type
            return newState
        })   
        isTypingTimeOut = setTimeout(() => {
            setIsTyping((prevState)=>{
            const newState = {...prevState}
            newState.state = false
            return newState
        })
            isTypingTimeOut = null
        }, 1000);
    }
        
    // Input handler
    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setNameInput(String(e.currentTarget.value))
        handleTyping("name")
    }

    const handleEmailInputReg = (e: React.ChangeEvent<HTMLInputElement >) => {
        setEmailInputReg(String(e.currentTarget.value))
        handleTyping("email")
    }

    const handlePasswordInputReg = (e: React.ChangeEvent<HTMLInputElement >) => {
        setPasswordInputReg(String(e.currentTarget.value))
        handleTyping("password")
    }

    const handleConfPasswordInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setConfPasswordInput(String(e.currentTarget.value))
        handleTyping("confPassword")
    }

    // UseEffect to handle Register Fetch state

    useEffect(()=>{
        if (register.fetch.fetchState === "done" || register.fetch.fetchState === "error")
            setTimeout(() => {
                dispatch(setRegisterFetchStateIdleAction())
            }, 500);
    },[dispatch, register.fetch.fetchState])

    // Use Effect to Validate inputs
    // Name
    useEffect(()=>{
        if (nameInput === "") {
            setIsNameValid("idle")
            setNameError("")
            return
        }
        if (nameInput.length < 3 && !isTyping.state) {
            setIsNameValid("invalid")
            setNameError(languageList[language].message.error.nameTooShort)
            return
        }
        if (nameInput.length > 50 && !isTyping.state) {
            setIsNameValid("invalid")
            setNameError(languageList[language].message.error.nameTooLong)
            return
        }
        if ( 
            (register.nameValid.valid !== "valid" && !isTyping.state && nameInput !== register.nameValid.value && register.fetch.fetchState === "idle") ||
            (register.nameValid.valid === "valid" && !isTyping.state && nameInput !== register.nameValid.value && register.fetch.fetchState === "idle")
        ) {
            setIsNameValid("idle")
            setNameError("")
            dispatch(setRegisterFetchTypeAction("name"))
            dispatch(checkDuplicateAction({type: "name", value: nameInput}))
            return
        }
        if (register.nameValid.valid === "invalid" && nameInput === register.nameValid.value) {
            setIsNameValid("invalid")
            setNameError(languageList[language].message.error.nameAlreadyExist)
            return
        }
        if (register.nameValid.valid === "valid" && nameInput === register.nameValid.value) {
            setIsNameValid("valid")
        }
    },[dispatch, isNameValid, isTyping, language, nameInput, register.fetch.fetchState, register.nameValid])

    // Email
    useEffect(()=>{
        setIsValidatorEmail(validator.isEmail(emailInputReg))
        if (emailInputReg === "") {
            setIsEmailValid("idle")
            setEmailError("")
            return
        }
        if (!isValidatorEmail) {
            setIsEmailValid("invalid")
            setEmailError(languageList[language].message.error.emaiInvalid)
            return
        }
        if ( 
            (isValidatorEmail && register.emailValid.valid !== "valid" && !isTyping.state && emailInputReg !== register.emailValid.value && register.fetch.fetchState === "idle") ||
            (isValidatorEmail && register.emailValid.valid === "valid" && !isTyping.state && emailInputReg !== register.emailValid.value && register.fetch.fetchState === "idle")
        ) {
            setIsEmailValid("idle")
            setEmailError("")
            dispatch(setRegisterFetchTypeAction("email"))
            dispatch(checkDuplicateAction({type: "email", value: emailInputReg}))
            return
        }
        if (register.emailValid.valid === "invalid" && emailInputReg === register.emailValid.value) {
            setIsEmailValid("invalid")
            setEmailError(languageList[language].message.error.emailAlreadyExist)
            return
        }
        if (register.emailValid.valid === "valid" && emailInputReg === register.emailValid.value) {
            setIsEmailValid("valid")
        }
    },[dispatch, emailInputReg, isTyping, isValidatorEmail, language, register.emailValid.valid, register.emailValid.value, register.fetch.fetchState, register.nameValid.valid])

    // Password
    useEffect(()=>{
        if (passwordInputReg === "") {
            setIsPasswordValid("idle")
            setConfPasswordError("") 
            return
        }
        if(passwordInputReg.length < 8 && !isTyping.state){
            setIsPasswordValid("invalid")
            setPasswordError(languageList[language].message.error.passwordTooShort)
            return
        }
        if (!regularExpression.test(passwordInputReg) && !isTyping.state) {
            setIsPasswordValid("invalid")
            setPasswordError(languageList[language].message.error.passwordMustHaveSPCharacter)
            return
        }
        if(regularExpression.test(passwordInputReg) && !isTyping.state) {
            setIsPasswordValid("valid")
            setConfPasswordError("") 
            return
        }
    },[isTyping, language, passwordInputReg])

    // Confirm Password
    useEffect(()=>{
        if (passwordInputReg === confPasswordInput && !isTyping.state && isPasswordValid === "valid") {
            setIsConfPasswordValid("valid")
            setConfPasswordError("")
            return
        }
        if (confPasswordInput !== "" && !isTyping.state && isPasswordValid === "valid") {
            setIsConfPasswordValid("invalid")
            setConfPasswordError(languageList[language].message.error.confPasswordNotIndentical)
        }
        else {
            setIsConfPasswordValid("idle")
        }
    },[confPasswordInput, isPasswordValid, isTyping, language, passwordInputReg])

    // Use Effect to allow submission when all inputs are valid
    useEffect(()=>{
        if (
            isNameValid === "valid" && 
            isEmailValid === "valid" &&
            isPasswordValid === "valid" &&
            isConfPasswordValid === "valid"
        )
        setCanSubmit(true)
        else setCanSubmit(false)
    },[isConfPasswordValid, isEmailValid, isNameValid, isPasswordValid])

    // Handle Register
    const handleRegister = useCallback( async (formdata: FormData) => {
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
    const handleSubmitRegister = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log({
            name: String(formData.get("name")),
            email: String(formData.get("email")),
            password: String(formData.get("password"))
        })
        handleRegister(formData);
    },[handleRegister])

    // Use Effect After Succefull Register Submit

    useEffect(()=>{
        if (register.registerValid.state === "valid") {
            setNameInput("")
            setEmailInputReg("")
            setPasswordInputReg("")
            setConfPasswordInput("")
            setTimeout(()=>{
                dispatch(setLogRegAction("log"))
            },2000)
        }    
    },[dispatch, register.registerValid.state])

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
                {logReg === "log" ? <>
                <h2 className="spacing-letter-big glow">{languageList[language].button.logIn}</h2>
                <form action="">
                </form>
                
                </> : <>
                <h2 className="spacing-letter-big glow">{languageList[language].button.signUp}</h2>
                <form action="" onSubmit={handleSubmitRegister}>
                    {register.registerValid.state === "valid" ? <></> : <>
                    <div className={`input-logreg-container ${isNameValid === "invalid" ? "input-logreg-container-error" : ""}`}>
                        <input 
                            name="name" 
                            className={`base-input 
                                ${isNameValid === "valid" ? "input-valid" : 
                                isNameValid === "invalid" ? "input-invalid" : ""}`} 
                            type="text" 
                            placeholder="Name"
                            onChange={handleNameInput}
                        />
                        <SpanInputFetchState 
                            state={(register.fetch.fetchState === "feching" && register.fetchType === "name") ? "feching" : isNameValid} 
                            isTyping={isTyping} 
                            type="name"                           
                        />
                        <p>{nameError}</p>
                    </div>
                    <div className={`input-logreg-container ${isEmailValid === "invalid" ? "input-logreg-container-error" : ""}`}>
                        <input 
                            name="email" 
                            className={`base-input 
                                ${isEmailValid === "valid" ? "input-valid" : 
                                isEmailValid === "invalid" ? "input-invalid" : ""}`} 
                            type="email" 
                            placeholder="Email"
                            onChange={handleEmailInputReg}
                        />
                        <SpanInputFetchState 
                            state={ (register.fetch.fetchState === "feching" && register.fetchType === "email") ? "feching" : isEmailValid}
                            isTyping={isTyping}
                            type="email"  
                        />
                        <p>{emailError}</p>
                    </div>
                    <div className={`input-logreg-container ${isPasswordValid === "invalid" ? "input-logreg-container-error" : ""}`}>
                        <input 
                            name="password" 
                            className={`base-input 
                                ${isPasswordValid === "valid" ? "input-valid" : 
                                isPasswordValid === "invalid" ? "input-invalid" : ""}`} 
                            type="password" 
                            placeholder="Password"
                            onChange={handlePasswordInputReg}
                        />
                        <SpanInputFetchState 
                            state={isPasswordValid}
                            isTyping={isTyping}
                            type="password"  
                        />
                        <p>{passwordError}</p>
                    </div>
                    <div className={`input-logreg-container ${isConfPasswordValid === "invalid" ? "input-logreg-container-error" : ""}`}>
                        <input 
                            name="confirmePassword" 
                            className={`base-input 
                                ${isConfPasswordValid === "valid" ? "input-valid" : 
                                isConfPasswordValid === "invalid" ? "input-invalid" : ""}`} 
                            type="password" 
                            placeholder="Confirme Password"
                            onChange={handleConfPasswordInput}
                        />
                        <SpanInputFetchState 
                            state={isConfPasswordValid}
                            isTyping={isTyping}
                            type="confPassword"  
                        />
                        <p>{confPasswordError}</p>
                    </div></>}
                    {register.fetchType === "register" && register.fetch.fetchState === "feching" ?
                    <span>Loading</span> : 
                    <>{ register.registerValid.state === "valid" ? 
                    <span>DONE</span>:
                    <button 
                        type="submit" 
                        className={`button-normal button-cta 
                        ${canSubmit ? "push-action" : "button-disable"}`} 
                        disabled={!canSubmit}
                    >{languageList[language].button.signUp}</button>}</>}
                    {register.fetchType === "register" && register.registerValid.state === "invalid" ? 
                    <p>{register.registerValid.message}</p> : 
                    <></>}
                </form>
                </>}
                {/* <p>URL is : {process.env.SERVER_URL}</p> */}
            </div>
        </>
    )
}

export default FullScreenLogReg