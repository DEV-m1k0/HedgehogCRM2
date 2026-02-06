import type React from "react";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss"


export const Button: React.FC<ButtonProps> = ({ 
    text, 
    className,
    icon, 
    onClick,
    disabled=true
}) => {
    return (
        <button
        className={`${className ? className : ""} ${styles.button}`}
        onClick={onClick ? onClick : () => {}}
        disabled={disabled}
        >
            {icon ? icon : null} {text ? text : "Button"}
        </button>
    )
}
