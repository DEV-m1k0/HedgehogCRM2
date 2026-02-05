import type React from "react"

export interface ButtonProps {
    text?: string
    className?: string
    icon?: React.ReactNode
    onClick?: () => void
}