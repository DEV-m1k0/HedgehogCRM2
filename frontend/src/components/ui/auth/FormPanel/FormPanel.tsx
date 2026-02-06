import React, { useState } from "react"
import { Button } from "@components/common/Button/Button"
import { Input } from "@components/common/Input/Input"
import { CheckBoxInput } from "@components/common/Input/CheckBoxInput"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import styles from "./FormPanel.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import type { FormPanelProps } from "./FormPanel.types"


export const FormPanel: React.FC<FormPanelProps> = ({
    link,
    h1Text,
    pText,
    fields,
    type,
    buttonText,
    onChangeField,
    onSubmitForm,
    canSubmit=true
}) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className={`${styles.panel} ${styles.formPanel}`}>
            <h1>{h1Text}</h1>
            <p>{pText}</p>
            <form>
                {
                    type === 'login'
                    ?
                    <>
                        {fields.map((field, index) => (
                            <Input
                            key={index}
                            type={field.type}
                            name={field.name}
                            id={field.id}
                            label={field.label}
                            placeholder={field.placeholder}
                            required={field.required}
                            onChangeField={onChangeField}
                            icon={field.icon}
                            />
                        ))}
                        <CheckBoxInput 
                        name="rememberMe"
                        label="Запомнить меня"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        className={styles.rememberMe}
                        />
                    </>
                    :
                    <>
                        <div className={styles.tripleInput}>
                            {fields.filter((field, index) => index < 3).map((field, index) => (
                                <Input
                                key={index}
                                type={field.type}
                                name={field.name}
                                id={field.id}
                                label={field.label}
                                placeholder={field.placeholder}
                                onChangeField={onChangeField}
                                required={field.required}
                                icon={field.icon}
                                />
                            ))}
                        </div>
                        {fields.filter((field, index) => index > 2).map((field, index) => (
                            <Input
                            key={index}
                            type={field.type}
                            name={field.name}
                            id={field.id}
                            onChangeField={onChangeField}
                            label={field.label}
                            placeholder={field.placeholder}
                            required={field.required}
                            icon={field.icon}
                            pattern={field.pattern}
                            />
                        ))}
                    </>
                }
                <Button 
                text={buttonText}
                icon={<FontAwesomeIcon icon={faSignInAlt} />}
                className={styles.loginButton}
                onClick={onSubmitForm}
                disabled={!canSubmit}
                />
            </form>
            <p className={styles.switchPage}>{link.pText} <Link to={link.pathname}>{link.linkText}</Link></p>
        </div>
    )
}