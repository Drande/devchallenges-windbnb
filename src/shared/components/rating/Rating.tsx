import { FunctionComponent } from "react";
import "./Rating.scss";

interface RatingProps {
    size?: number;
    value?: number;
}

type Point = {
    x:number;
    y:number;
}

type Points = Point[];

const StarPoints: Points = [
    { "x": 2.4, "y": 0.15 },
    { "x": 0.9, "y": 4.85 },
    { "x": 4.65, "y": 1.85 },
    { "x": 0.15, "y": 1.85 },
    { "x": 3.90, "y": 4.85 }
];
 
const Rating: FunctionComponent<RatingProps> = ({ size=3.4, value=0}) => {
    return (
        <div className="rating-container">
            <svg width={5*size} height={5*size}>
                <mask id="svgmask1">
                    <polygon fill="#000000" points={StarPoints.map(p => { return `${p.x*size},${p.y*size}` }).join(' ') }></polygon>
                </mask>
                <polygon className="fill-primary" points={StarPoints.map(p => { return `${p.x*size},${p.y*size}` }).join(' ') }></polygon>
            </svg>
            <span>{value.toFixed(2)}</span>
        </div>
    );
}
 
export default Rating;