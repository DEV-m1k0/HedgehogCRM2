export interface InfoPanelProps {
    h1Text: string
    pText: string
    listItems?: ListItemProps[]
}

export interface ListItemProps {
    text: string | ListItemTextProps
    icon: React.ReactNode
    type: "icon" | "number"
}

export interface ListItemTextProps {
    h3Text: string
    pText: React.ReactNode
}