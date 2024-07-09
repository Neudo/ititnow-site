"use client"
import React, {useEffect} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {createClient} from "@/utils/supabase/client";
import {convertDate} from "@/lib/utils";
import {SearchParamsProps} from "@/app/protected/events/page";
import {PaginationComponent} from "@/components/PaginationComponent";

interface User {
    id: string;
    email: string;
    name: string;
    nBEvents: number;
    isAdmin: boolean;
    createdAt: string;
}


function Page({searchParams}: Readonly<SearchParamsProps>) {
    const [users, setUsers] = React.useState<User[] | null>(null);
    const [totalUsers, setTotalUsers] = React.useState<number>(0);
    const currentPage = Number(searchParams?.page) || 1;
    const PAGE_SIZE = 10

    useEffect(() => {
        const fetchUsers = async () => {
            const supabase = createClient();
            const startIdx = (currentPage - 1) * PAGE_SIZE;
            const endIdx = startIdx + PAGE_SIZE - 1;
            const { data: users, error, count} = await supabase
                .from('Users')
                .select('*', { count: 'exact' })
                .range(startIdx, endIdx);
            if (error) {
                console.error('Error fetching users:', error);
                return <pre>{JSON.stringify(error, null, 2)}</pre>;
            } else {
                setUsers(users)
                setTotalUsers(count || 0)
            }
        }
        fetchUsers();
    }, [users, currentPage]);


    const pageCount = Math.ceil(totalUsers / PAGE_SIZE);

    return (
        <div>
            <h1 className="px-4 py-5 font-extrabold primary-green-linear text-white rounded-2xl w-[96%] mx-auto translate-y-[30px] z-10 relative shadow-2xl">Liste des utilisateurs</h1>
            {users ? (
                <>
                    <Table className="px-6">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">Email</TableHead>
                                <TableHead className="text-center" >Pseudo</TableHead>
                                <TableHead className="text-center" >Nb. d'évènements</TableHead>
                                <TableHead className="text-center" >Status</TableHead>
                                <TableHead className="text-center" >Date d'inscription</TableHead>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <PaginationComponent pageCount={pageCount}/>
                </>
            ) : (
                <p>Loading...</p>
            )
            }


        </div>
    );
}

export default Page;
