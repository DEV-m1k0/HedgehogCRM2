import type { InputProps } from "@components/common/Input/Input.types"

export interface FormPanelProps {
    h1Text: string
    pText: string
    fields: InputProps[]
    onChangeField: (name: string, value: string | number) => void
    onSubmitForm: () => void
    link: LinkProps
    type: "login" | "registration"
    buttonText: string
    canSubmit?: boolean
}

export interface LinkProps {
    pText: string
    pathname: string
    linkText: string
}