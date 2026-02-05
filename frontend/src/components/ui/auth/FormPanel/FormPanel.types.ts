import type { InputProps } from "@components/common/Input/Input.types"

export interface FormPanelProps {
    h1Text: string
    pText: string
    fields: InputProps[]
    link: LinkProps
    type: "login" | "registration"
    buttonText: string
}

export interface LinkProps {
    pText: string
    pathname: string
    linkText: string
}