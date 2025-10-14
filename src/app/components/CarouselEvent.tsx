
import { useEffect, useState, type FC } from "react";
import "../../styles/carousel_event.scss"
import { EventList } from "../types/contenteType";
import CarouselElement from "./CarouselElement";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
type Iprops = {
    slidesPast:  EventList[],
    slidesFutur: EventList[]
}
type ClassSelected = "carousel-slide slide-selected" | "carousel-slide slide-selected slide-selected-transition"

const slideBaseSize = 350;
const slideSpacing = 30;
const slideShift = slideBaseSize + slideSpacing
const CarouselEvent: FC<Iprops>  = ({slidesPast = [], slidesFutur = []}) => {

    const container = document.querySelector(".carousel-slide-container") as HTMLElement
    const slides = slidesPast.concat(slidesFutur)
    const [currentSelected, setCurrentSelected] = useState<number>(0)
    const [translateContainer, setTranslateContainer] = useState<number>(0)
    const [classSelected, setClassSelected] = useState<ClassSelected>("carousel-slide slide-selected")
    const changeCurrentSelected = (id: number) => {
        if((currentSelected + id) < 0) return
        if((currentSelected + id) > ((slides.length - 1))) return
        setClassSelected("carousel-slide slide-selected")
        setCurrentSelected((prevState)=> prevState + id)
        setTranslateContainer((prevState)=> {
            if (id < 0)
                return prevState + slideShift
            return prevState - slideShift
        })
        setTimeout(()=>{
            setClassSelected("carousel-slide slide-selected slide-selected-transition")
        },100)
    }

    useEffect(()=>{
        if (container) {
            container.style.transform = `translateX(${translateContainer}px)`
        }
    },[container, translateContainer])

    useEffect(()=>{
        setCurrentSelected( () => {
            if (slidesFutur.length > 0) {
                return slidesPast.length
            }
            return (slidesPast.length - 1)
        })
        setTranslateContainer(()=>{
            if (slidesFutur.length > 0) {
                return -1 * ( slideShift * slidesPast.length )
            }
            return -1 * ( slideShift * (slidesPast.length - 1) )
        })
    },[slidesFutur.length, slidesPast.length])

    return (
        <div className="carousel">
            <div className="carousel-viewport">
                <div className="carousel-slide-container">
                    {
                        slides.map((item, index)=>{
                            return (
                                <div className={index === currentSelected ? classSelected : 
                                    (index > currentSelected ? "carousel-slide slide-befor" : "carousel-slide slide-after")
                                } key={`${item.title}_${index}`}
                                onClick={()=>{
                                    return index === currentSelected ? "" : 
                                    (index > currentSelected ? 
                                        changeCurrentSelected(1) : 
                                        changeCurrentSelected(-1)
                                    ) 
                                }}
                                >
                                    <CarouselElement title={item.title} url={item.url} date={item.date}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <button className="event-button event-button-left push-action" onClick={()=>changeCurrentSelected(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="event-button event-button-right push-action" onClick={()=>changeCurrentSelected(1)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
}

export default CarouselEvent