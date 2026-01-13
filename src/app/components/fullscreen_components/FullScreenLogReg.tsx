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

const regularExpression = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

const FullScreenLogReg: FC  = () => {

    // Reducers
    const { accessToken, register, login } = useSelector(
        (store: RootState) => store.auth
    )
    const { logReg, currentLanguage } = useSelector(
        (store: RootState) => store.utilitisesReducer
    )
    const dispatch: AppDispatch = useDispatch()

    // Use Effect to auto-exit the popup when user is log in
    useEffect(()=>{
        if (accessToken !== "")
            dispatch(setFullScreenAction(""))
    },[accessToken, dispatch])

    // Use IsTyping
    const {isTyping, handleTyping} = useIsTyping()

    // useStates Section
    const [canSubmit, setCanSubmit] = useState<boolean>(false)
    const [isValidatorEmail, setIsValidatorEmail] = useState<boolean>(false)

    // Input Valid States
    const [isNameValid, setIsNameValid] = useState<InputStateInput>("idle")
    const [isEmailValid, setIsEmailValid] = useState<InputStateInput>("idle")
    const [isPasswordValid, setIsPasswordValid] = useState<InputStateInput>("idle")
    const [isConfPasswordValid, setIsConfPasswordValid] = useState<InputStateInput>("idle")

    // Input Data States
    const [nameInput, setNameInput] = useState<string>("")
    const [emailInput, setEmailInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [confPasswordInput, setConfPasswordInput] = useState<string>("")

    // Error States
    const [nameError, setNameError] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [confPasswordError, setConfPasswordError] = useState<string>("")


    // Fonction to reset form input
    const resetFormInput = () => {
        setNameInput("")
        setEmailInput("")
        setPasswordInput("")
        setConfPasswordInput("")
    }


    // Use Effect to reset states when changing form
    useEffect(()=>{
        if(logReg === "reg")
            resetFormInput()
        if (logReg === "log")
            resetFormInput()
    },[logReg])


    // Is Typing Handler
    
        

    // Input handler
    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setNameInput(String(e.currentTarget.value))
        handleTyping("name")
    }

    const handleEmailInput= (e: React.ChangeEvent<HTMLInputElement >) => {
        setEmailInput(String(e.currentTarget.value))
        handleTyping("email")
    }

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setPasswordInput(String(e.currentTarget.value))
        handleTyping("password")
    }

    const handleConfPasswordInput = (e: React.ChangeEvent<HTMLInputElement >) => {
        setConfPasswordInput(String(e.currentTarget.value))
        handleTyping("confPassword")
    }


    // UseEffect to handle Fetch state
    // Register
    useEffect(()=>{
        if (register.fetch.fetchState === "done" || register.fetch.fetchState === "error")
            setTimeout(() => {
                dispatch(setRegisterFetchStateIdleAction())
            }, 500);
    },[dispatch, register.fetch.fetchState])

    // Login
    useEffect(()=>{
        if (login.fetch.fetchState === "done" || login.fetch.fetchState === "error")
            setTimeout(() => {
                dispatch(setLoginFetchStateIdleAction())
            }, 500);
    },[dispatch, login.fetch.fetchState])


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
            setNameError(languageList[currentLanguage].message.error.nameTooShort)
            return
        }
        if (nameInput.length > 50 && !isTyping.state) {
            setIsNameValid("invalid")
            setNameError(languageList[currentLanguage].message.error.nameTooLong)
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
            setNameError(languageList[currentLanguage].message.error.nameAlreadyExist)
            return
        }
        if (register.nameValid.valid === "valid" && nameInput === register.nameValid.value) {
            setIsNameValid("valid")
        }
    },[dispatch, isNameValid, isTyping, currentLanguage, nameInput, register.fetch.fetchState, register.nameValid])

    // Email
    useEffect(()=>{
        setIsValidatorEmail(validator.isEmail(emailInput))
        if (emailInput === "") {
            setIsEmailValid("idle")
            setEmailError("")
            return
        }
        if (!isValidatorEmail && !isTyping.state) {
            setIsEmailValid("invalid")
            setEmailError(languageList[currentLanguage].message.error.emaiInvalid)
            return
        }

        // For Register
        if (logReg === "reg") {
            if ( 
                (isValidatorEmail && register.emailValid.valid !== "valid" && !isTyping.state && emailInput !== register.emailValid.value && register.fetch.fetchState === "idle") ||
                (isValidatorEmail && register.emailValid.valid === "valid" && !isTyping.state && emailInput !== register.emailValid.value && register.fetch.fetchState === "idle")
            ) {
                setIsEmailValid("idle")
                setEmailError("")
                dispatch(setRegisterFetchTypeAction("email"))
                dispatch(checkDuplicateAction({type: "email", value: emailInput}))
                return
            }
            if (register.emailValid.valid === "invalid" && emailInput === register.emailValid.value) {
                setIsEmailValid("invalid")
                setEmailError(languageList[currentLanguage].message.error.emailAlreadyExist)
                return
            }
            if (register.emailValid.valid === "valid" && emailInput === register.emailValid.value) {
                setIsEmailValid("valid")
            }
            return
        }

        // For LogIn
        if (logReg === "log") {
            if (isValidatorEmail) {
                setIsEmailValid("valid")
            }
        }
    },[dispatch, emailInput, isTyping, isValidatorEmail, currentLanguage, logReg, register.emailValid.valid, register.emailValid.value, register.fetch.fetchState, register.nameValid.valid])

    // Password
    useEffect(()=>{
        if (passwordInput === "") {
            setIsPasswordValid("idle")
            setConfPasswordError("") 
            return
        }

       // For Register
        if (logReg === "reg") {
            if(passwordInput.length < 8 && !isTyping.state){
                setIsPasswordValid("invalid")
                setPasswordError(languageList[currentLanguage].message.error.passwordTooShort)
                return
            }
            if (!regularExpression.test(passwordInput) && !isTyping.state) {
                setIsPasswordValid("invalid")
                setPasswordError(languageList[currentLanguage].message.error.passwordMustHaveSPCharacter)
                return
            }
            if(regularExpression.test(passwordInput) && !isTyping.state) {
                setIsPasswordValid("valid")
                setConfPasswordError("") 
                return
            }
        }
        
        // For Login
        if (logReg === "log") {
            if(passwordInput.length > 8 && !isTyping.state){
                setIsPasswordValid("valid")
                setConfPasswordError("") 
                return
            }
        }
    },[isTyping, currentLanguage, logReg, passwordInput])

    // Confirm Password
    useEffect(()=>{
        if (passwordInput === confPasswordInput && !isTyping.state && isPasswordValid === "valid") {
            setIsConfPasswordValid("valid")
            setConfPasswordError("")
            return
        }
        if (confPasswordInput !== "" && !isTyping.state && isPasswordValid === "valid") {
            setIsConfPasswordValid("invalid")
            setConfPasswordError(languageList[currentLanguage].message.error.confPasswordNotIndentical)
        }
        else {
            setIsConfPasswordValid("idle")
        }
    },[confPasswordInput, isPasswordValid, isTyping, currentLanguage, passwordInput])


    // Use Effect to allow submission when all inputs are valid
    useEffect(()=>{
        if (logReg === "reg") {
            if (
                isNameValid === "valid" && 
                isEmailValid === "valid" &&
                isPasswordValid === "valid" &&
                isConfPasswordValid === "valid" &&
                !isTyping.state
            )
            setCanSubmit(true)
            else setCanSubmit(false)
            return
        }
        if (logReg === "log") {
            if (
                isEmailValid === "valid" &&
                isPasswordValid === "valid" &&
                !isTyping.state
            )
            setCanSubmit(true)
            else setCanSubmit(false)
        }
    },[isConfPasswordValid, isEmailValid, isNameValid, isPasswordValid, isTyping.state, logReg])


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
    
    // Handle Login
    const handleLogin = useCallback( async (formdata: FormData) => {
        dispatch(setRegisterFetchTypeAction("register"))
        dispatch(
            postLoginAction({
                email: String(formdata.get("email")),
                password: String(formdata.get("password")),
            })
        );
    },[dispatch]);


    // FormeData
    // Register
    const handleSubmitRegister = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        handleRegister(formData);
    },[handleRegister])

    // Login
    const handleSubmitLogin = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        handleLogin(formData);
    },[handleLogin])


    // Use Effect that handles respond Register Submit
    useEffect(()=>{
        if (register.registerValid.state === "valid") {
            setTimeout(()=>{
                resetFormInput()
                dispatch(resetRegisterStateAction())
                dispatch(setLogRegAction("log"))
            },2000)
            return
        }
        if (register.registerValid.state === "invalid") {
            return
        }    
    },[dispatch, register.registerValid, register.registerValid.state])

    // Use Effect that handles respond Login Submit
    useEffect(()=>{
        if (login.loginValid.state === "valid") {
            setTimeout(()=>{
                resetFormInput()
                dispatch(resetLoginStateAction())
                dispatch(setFullScreenAction(""))
            },2000)
            return
        }   
    },[dispatch, login.loginValid.state])


    return ( 
        <>
            <div className="full-screen-button" onClick={()=>dispatch(setFullScreenAction(""))}></div>
            <div className="full-screen-popup full-screen-lor-reg">
                <button className="full-screen-xmark"
                    onClick={()=>dispatch(setFullScreenAction(""))}
                    onKeyDown={()=>dispatch(setFullScreenAction(""))}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                {logReg === "log" ? <>

                {/* Login Section */}
                <h2 className="spacing-letter-big glow">{languageList[currentLanguage].button.logIn}</h2>
                <form action="LogIn" onSubmit={handleSubmitLogin}>
                    <div className={`input-container ${isEmailValid === "invalid" ? "input-container-error" : ""}`}>
                        <input 
                            name="email" 
                            className={`base-input 
                                ${isEmailValid === "valid" ? "input-valid" : 
                                isEmailValid === "invalid" ? "input-invalid" : ""}`} 
                            type="email" 
                            placeholder="Email"
                            onChange={handleEmailInput}
                            disabled={(login.fetch.fetchState === "feching" || login.loginValid.state === "valid")}
                        />
                        <SpanInputFetchState 
                            state={ (register.fetch.fetchState === "feching" && register.fetchType === "email") ? "feching" : isEmailValid}
                            isTyping={isTyping}
                            type="email"  
                        />
                        <p>{emailError}</p>
                    </div>
                    <div className={`input-container ${isPasswordValid === "invalid" ? "input-container-error" : ""}`}>
                        <input 
                            name="password" 
                            className={`base-input 
                                ${isPasswordValid === "valid" ? "input-valid" : 
                                isPasswordValid === "invalid" ? "input-invalid" : ""}`} 
                            type="password" 
                            placeholder="Password"
                            onChange={handlePasswordInput}
                            disabled={(login.fetch.fetchState === "feching" || login.loginValid.state === "valid")}
                        />
                        <SpanInputFetchState 
                            state={isPasswordValid}
                            isTyping={isTyping}
                            type="password"  
                        />
                        <p>{passwordError}</p>
                    </div>
                    {login.fetch.fetchState === "feching" ?
                    <span>Loading</span> : 
                    <>{login.loginValid.state === "valid" ? 
                    <span>DONE</span>: 
                    <div className="button-container">
                        <button 
                            className="link link-button" 
                            onClick={()=> dispatch(setLogRegAction("reg"))}
                            onKeyDown={()=> dispatch(setLogRegAction("reg"))}
                        >SignUp</button>
                        <button 
                            type="submit" 
                            className={`button-normal button-cta 
                            ${canSubmit ? "push-action" : "button-disable"}`} 
                            disabled={!canSubmit}
                        >{languageList[currentLanguage].button.logIn}</button>
                    </div>}</>}
                    {login.loginValid.state === "invalid" ? 
                    <>
                    <p>{login.loginValid.message}</p>
                    <p>{login.loginValid.error}</p>
                    </> : 
                    <></>}
                    <p>{login.fetch.error}</p>
                </form>
                </> : <>

                {/* Register Section */}
                <h2 className="spacing-letter-big glow">{languageList[currentLanguage].button.signUp}</h2>
                <form action="Register" onSubmit={handleSubmitRegister}>
                    <div className={`input-container ${isNameValid === "invalid" ? "input-container-error" : ""}`}>
                        <input 
                            name="name" 
                            className={`base-input 
                                ${isNameValid === "valid" ? "input-valid" : 
                                isNameValid === "invalid" ? "input-invalid" : ""}`} 
                            type="text" 
                            placeholder="Name"
                            onChange={handleNameInput}
                            disabled={(register.fetch.fetchState === "feching" || register.registerValid.state === "valid")}
                        />
                        <SpanInputFetchState 
                            state={(register.fetch.fetchState === "feching" && register.fetchType === "name") ? "feching" : isNameValid} 
                            isTyping={isTyping} 
                            type="name"                           
                        />
                        <p>{nameError}</p>
                    </div>
                    <div className={`input-container ${isEmailValid === "invalid" ? "input-container-error" : ""}`}>
                        <input 
                            name="email" 
                            className={`base-input 
                                ${isEmailValid === "valid" ? "input-valid" : 
                                isEmailValid === "invalid" ? "input-invalid" : ""}`} 
                            type="email" 
                            placeholder="Email"
                            onChange={handleEmailInput}
                            disabled={(register.fetch.fetchState === "feching" || register.registerValid.state === "valid")}
                        />
                        <SpanInputFetchState 
                            state={ (register.fetch.fetchState === "feching" && register.fetchType === "email") ? "feching" : isEmailValid}
                            isTyping={isTyping}
                            type="email"  
                        />
                        <p>{emailError}</p>
                    </div>
                    <div className={`input-container ${isPasswordValid === "invalid" ? "input-container-error" : ""}`}>
                        <input 
                            name="password" 
                            className={`base-input 
                                ${isPasswordValid === "valid" ? "input-valid" : 
                                isPasswordValid === "invalid" ? "input-invalid" : ""}`} 
                            type="password" 
                            placeholder="Password"
                            onChange={handlePasswordInput}
                            disabled={(register.fetch.fetchState === "feching" || register.registerValid.state === "valid")}
                        />
                        <SpanInputFetchState 
                            state={isPasswordValid}
                            isTyping={isTyping}
                            type="password"  
                        />
                        <p>{passwordError}</p>
                    </div>
                    <div className={`input-container ${isConfPasswordValid === "invalid" ? "input-container-error" : ""}`}>
                        <input 
                            name="confirmePassword" 
                            className={`base-input 
                                ${isConfPasswordValid === "valid" ? "input-valid" : 
                                isConfPasswordValid === "invalid" ? "input-invalid" : ""}`} 
                            type="password" 
                            placeholder="Confirme Password"
                            onChange={handleConfPasswordInput}
                            disabled={(register.fetch.fetchState === "feching" || register.registerValid.state === "valid")}
                        />
                        <SpanInputFetchState 
                            state={isConfPasswordValid}
                            isTyping={isTyping}
                            type="confPassword"  
                        />
                        <p>{confPasswordError}</p>
                    </div>
                    {register.fetchType === "register" && register.fetch.fetchState === "feching" ?
                    <span>Loading</span> : 
                    <>{ register.registerValid.state === "valid" ? 
                    <span>DONE</span>: 
                    <div className="button-container">
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
                        >{languageList[currentLanguage].button.send}</button>
                    </div>}</>}
                    {register.fetchType === "register" && register.registerValid.state === "invalid" ? 
                    <>
                    <p>{register.registerValid.message}</p>
                    <p>{register.registerValid.error}</p>
                    </> : 
                    <></>}
                    <p>{register.fetch.error}</p>
                </form>
                </>}
            </div>
        </>
    )
}

export default FullScreenLogReg