/* eslint-disable @next/next/no-img-element */
import { type FC } from "react";
import LabelLogo from "./LabelLogo";
type Iprops = {
    title: string,
    date: string,
    url: string,
}

const CarouselElement: FC<Iprops>  = ({title = "title", url = "url", date="1969/07/16"}) => {
    const newDate = new Date(date)
    return (
        <>  
            <div className="event-image">
                <img src={url} alt={`${title}`} height={500}/>
            </div>
            <LabelLogo title="Event" url="/image/icons/noun-schedule-7880319.svg"/>
            <div className="event-content">
                <h4>{title}</h4>
                <span className="spacing-letter-small">{`${newDate.getFullYear()}/${newDate.getMonth()}/${newDate.getDate()}`}</span>
            </div>
            <div className="event-filter"></div>
        </>
    )
}

export default CarouselElement