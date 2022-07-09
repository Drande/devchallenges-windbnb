import { FunctionComponent } from "react";
import Rating from "../rating/Rating";
import Tag from "../tag/Tag";
import "./StayCard.scss";

interface StayCardProps {
    city?: string;
    country?: string;
    superHost?: boolean;
    title?: string;
    rating?: number;
    maxGuests?: number;
    type?: string;
    beds?: number;
    photo?: string;
}
 
const StayCard: FunctionComponent<StayCardProps> = (stay) => {
    const superHostElement = stay.superHost ? <Tag>SUPER HOST</Tag>: null;
    return (
        <div className="column w-full stay-card">
            <img className="border-round radius-24px" src={stay.photo} alt={stay.title} />
            <div className="row justify-content-between align-items-center">
                <div className="row g-1rem align-items-center">
                    {superHostElement}
                    <span className="subheader-3 color-gray-3">{stay.type + (stay?.beds? (" . " + stay.beds + " beds") : "")}</span>
                </div>
                <Rating value={stay.rating}></Rating>
            </div>
            <span className="subheader-2 color-gray-2">{stay.title}</span>
        </div>
    );
}
 
export default StayCard;