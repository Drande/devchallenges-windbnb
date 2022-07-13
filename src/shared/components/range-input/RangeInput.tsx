import { FunctionComponent } from "react";
import styles from "./RangeInput.module.scss";

interface RangeInputProps {
    onChange?: (value:number) => void;
    value?: number;
    min?: number;
}
 
const RangeInput: FunctionComponent<RangeInputProps> = ({ onChange=() => {}, value=0, min=0 }) => {
    const increment = () => {
        onChange(value+1);
    }

    const decrement = () => {
        onChange(Math.max(value-1, 0));
    }


    return (
        <div className={styles["range-wrapper"]}>
            <div onClick={decrement} className={styles["minus"]}></div>
            <span>{value}</span>
            <div onClick={increment} className={styles["plus"]}></div>
        </div>
    );
}
 
export default RangeInput;