export interface UserData {
    email: string
    firstName: string
    secondName: string
    patronymic: string
    incomePerHour: number
    role: Role
    isAccepted: boolean
    id: number
    createdAt: string
}

export interface Role {
    id: number
    name: string
}