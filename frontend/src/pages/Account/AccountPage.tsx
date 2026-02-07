import { useEffect, useState } from "react";
import type { UserData } from "./Account.types";

export const AccountPage = () => {
    const [user, setUser] = useState<UserData>({
        email: '',
        firstName: '',
        secondName: '',
        patronymic: '',
        incomePerHour: 0,
        role: {
            id: 0,
            name: ''
        },
        isAccepted: false,
        id: 0,
        createdAt: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const user = localStorage.getItem('user');
            if (user) {
                console.log(JSON.parse(user));
                setUser(JSON.parse(user));
                setLoading(false);
            } else {
                window.location.href = '/login';
            }
        }

        loadUser();
    }, [])


    if (loading) return <p>Loading...</p>;

    if (!user) return <p>Пользователь не найден</p>;


    return (
        <div>
            <h1>Аккаунт</h1>
            <p>{user.email}</p>
        </div>
    )
};