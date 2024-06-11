import { createClient } from '@/utils/supabase/server'
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {FaRegEdit} from "react-icons/fa";
import {convertDate} from "@/lib/utils";
import EditBtn from "@/components/forms/EditBtn";

interface Event {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    status: string;
    author: string;
    contact: string;
}

export default async function Page() {
    const supabase = createClient();
    const { data: events, error } = await supabase.from('Events').select('*');


    if (error) {
        console.error('Error fetching events:', error);
        return <div className="p-8 bg-danger">Erreur lors de la récupération des donées, merci de réessayer plus tard ...</div>;
    }

    return <div>
        <h1 className="px-4 py-5 font-extrabold primary-green-linear text-white rounded-2xl w-[96%] mx-auto translate-y-[30px] z-10 relative shadow-2xl">Liste
            des évènements</h1>
        {events ? (
            <Table className="px-6">
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Titre</TableHead>
                        <TableHead className="text-center">Date de début</TableHead>
                        <TableHead className="text-center">Date de fin</TableHead>
                        <TableHead className="text-center">Lieu</TableHead>
                        <TableHead className="text-center min-w-[130px]">Auteur</TableHead>
                        <TableHead className="text-center min-w-[130px]">Statut</TableHead>
                        <TableHead className="text-right">Editer</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {events?.map((event: Event) => (

                        <TableRow className="cursor-pointer" key={event.id}>
                            <TableCell className="font-medium items-center">{event.title}</TableCell>
                            <TableCell className="text-center">{convertDate(event.startDate)}</TableCell>
                            <TableCell className="text-center">{convertDate(event.endDate)}</TableCell>
                            <TableCell className="text-center">{event.location}</TableCell>
                            <TableCell className="text-center">{event.author}</TableCell>
                            <TableCell className="text-center"> <span className="px-3 py-2 rounded-full font-bold text-xs" style={convertDate(Date()) === convertDate(event.startDate) ? {backgroundColor: '#de815e', color: 'white'} : {backgroundColor: '#51796F', color:'white'}}>{convertDate(Date()) === convertDate(event.startDate) ? 'En cours' : 'À venir' }</span></TableCell>
                            <TableCell className="flex justify-end "> <a href={`/protected/mes-evenements/evenement/${event.id}`} > <FaRegEdit color="#51796F" size={20}/></a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ) : (
            <p>Loading...</p>
        )}

    </div>
}
