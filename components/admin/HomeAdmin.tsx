import React from 'react';
import Introduction from "@/components/admin/Introduction";

interface User {
    id: string;
    email: string;
    name: string;
    nBEvents: number;
    isAdmin: boolean;
    createdAt: string;
}
interface HomeAdminProps {
    userData: any;
}

const HomeAdmin: React.FC<HomeAdminProps> = ({userData}) => {
    return (
        <>
            <h1 className="animate-in text-3xl font-bold pb-5">Bienvenue, {userData.name}</h1>
            <Introduction/>
        </>

    );
}

export default HomeAdmin;
