import React from "react";
import { ButtonProps } from "./Button.model";
import styles from './Button.module.scss';

const Button = ({ label="", variant="default", disableShadow, disabled, startIcon, endIcon, size="md", color="primary", ...props }: React.PropsWithChildren<ButtonProps>) => {
    const isDisabled: boolean = disabled!==undefined && disabled!==false;
    const finalClassname = [
        styles["custom-button"],
        styles[variant],
        disableShadow ? undefined : styles["shadow"],
        isDisabled ? styles["disabled"] : undefined,
        styles[size],
        styles[color],
        (!label && (startIcon || endIcon)) ? styles["only-icon"] : undefined
    ].filter(c => c).join(" ");
    const startIconElement = startIcon ? (
        <span className={["material-icons", styles["start"], styles["icon"]].join(" ")}>{startIcon}</span>
    ):"";
    const endIconElement = endIcon ? (
        <span className={["material-icons", styles["end"], styles["icon"]].join(" ")}>{endIcon}</span>
    ):"";
    return (
        <button {...props} className={[props.className, finalClassname].join(" ")} disabled={isDisabled}>
            {startIconElement}
            {label}
            {endIconElement}
        </button>
    );
}

export default Button;