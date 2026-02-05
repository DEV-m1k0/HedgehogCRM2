import React from "react"
import type { CheckBoxInputProps } from "./Input.types"
import styles from "./CheckBoxInput.module.scss"

export const CheckBoxInput: React.FC<CheckBoxInputProps> = ({
    name,
    className,
    label,
    onChange,
    checked=false
}) => {
    return (
        <div className={styles.checkBox}>
            <input 
            type="checkbox"
            className={`${className} ${styles.formControlCheckbox}`}
            name={name} 
            id={name}
            onChange={onChange} 
            checked={checked} 
            />
            {label ? <label htmlFor={name}>{label}</label> : null}
        </div>
    )
}