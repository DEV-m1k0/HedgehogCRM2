export interface UserType {
    id: number;
    email: string;
    first_name: string;
    second_name: string;
    patronymic: string | null;
    income_per_hour: number;
    phone: string | null;

    is_accepted: boolean;
    created_at: Date;

    role: Role;
}

export interface Role {
    id: number;
    name: "Администратор" | "Менеджер" | "Преподаватель" | "Аноним";
}