/* eslint-disable @next/next/no-img-element */
import { type FC } from "react";
import "../../../styles/components/small_components/label_logo.scss"
type Iprops = {
    title: string,
    url: string,
}

const LabelLogo: FC<Iprops>  = ({title = "title", url = "url"}) => {

    return (
        <div className="label-logo">
            <img src={url} alt={title} height={30} />
            <h4 className="spacing-letter-small">{title}</h4>
        </div>
    )
}

export default LabelLogo