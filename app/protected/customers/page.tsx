import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FaRegEdit } from "react-icons/fa";
import {createClient} from "@/utils/supabase/server";
import {convertDate} from "@/lib/utils";

interface User {
    id: string;
    email: string;
    name: string;
    nBEvents: number;
    isAdmin: boolean;
    createdAt: string;

}


async function Page() {
    const supabase = createClient();
    const { data: users, error} = await supabase.from('Users').select('*');

    if (error) {
        console.error('Error fetching users:', error);
        return <pre>{JSON.stringify(error, null, 2)}</pre>;
    }



    return (
        <div>
            <h1 className="px-4 py-5 font-extrabold primary-green-linear text-white rounded-2xl w-[96%] mx-auto translate-y-[30px] z-10 relative shadow-2xl">Liste des utilisateurs</h1>
            {users ? (
                <Table className="px-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Email</TableHead>
                            <TableHead className="text-center" >Pseudo</TableHead>
                            <TableHead className="text-center" >Nb. d'évènements</TableHead>
                            <TableHead className="text-center" >Status</TableHead>
                            <TableHead className="text-center" >Date d'inscription</TableHead>
                            <TableHead className="text-right">Editer</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user: User) => (
                            <TableRow className="cursor-pointer" key={user.id}>
                                <TableCell className="font-medium">{user.email}</TableCell>
                                <TableCell className="font-medium text-center ">{user.name}</TableCell>
                                <TableCell className="text-center">{user.nBEvents}</TableCell>
                                <TableCell className="text-center">{user.isAdmin ? 'Admin' : 'Client'}</TableCell>
                                <TableCell className="text-center">{convertDate(user.createdAt)}</TableCell>
                                <TableCell className="flex justify-end "><FaRegEdit color="#51796F" size={20}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>Loading...</p>
            )
            }


        </div>
    );
}

export default Page;
