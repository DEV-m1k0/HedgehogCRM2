import type React from "react";
import type { ButtonProps } from "./types";
import styles from "./Button.module.scss"


export const Button: React.FC<ButtonProps> = ({ 
    text, 
    className,
    icon, 
    onClick 
}) => {
    return (
        <button
        className={`${className ? className : ""} ${styles.button}`}
        onClick={onClick ? onClick : () => {}}
        >
            {icon ? icon : null} {text ? text : "Button"}
        </button>
    )
}
