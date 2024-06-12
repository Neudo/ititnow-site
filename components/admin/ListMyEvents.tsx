import React, {useEffect} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {convertDate} from "@/lib/utils";
import {FaRegEdit} from "react-icons/fa";
import {createClient} from "@/utils/supabase/client";
import axios from "axios";
import process from "process";
import { FiTrash2 } from "react-icons/fi";

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


function ListMyEvents({userId}: {userId: string}) {
    const [myEvents, setMyEvents] = React.useState<any>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const supabase = createClient();
            const {data: myEvents, error} = await supabase.from('Events').select('*').eq('userId', userId)
            if (error) {
                console.error('Error fetching events:', error);
            }
            setMyEvents(myEvents);
        }
        fetchEvents();
    }, [myEvents]);

    const deleteEvent = async (id: string) => {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_RENDER_API_URL}events/${id}`);
        return response.data;
    }

    return (
        <div>
            <h1 className="px-4 py-5 font-extrabold primary-green-linear text-white rounded-2xl w-[96%] mx-auto translate-y-[30px] z-10 relative shadow-2xl">Liste
                de mes évènements</h1>
            {myEvents ? (
                <Table className="px-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Titre</TableHead>
                            <TableHead className="text-center">Date de début</TableHead>
                            <TableHead className="text-center">Date de fin</TableHead>
                            <TableHead className="text-center">Lieu</TableHead>
                            <TableHead className="text-center min-w-[130px]">Auteur</TableHead>
                            <TableHead className="text-center min-w-[130px]">Statut</TableHead>
                            <TableHead className="text-center">Editer</TableHead>
                            <TableHead className="text-right">Supprimer</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {myEvents?.map((event: Event) => (

                            <TableRow className="cursor-pointer" key={event.id}>
                                <TableCell className="font-medium items-center">{event.title}</TableCell>
                                <TableCell className="text-center">{convertDate(event.startDate)}</TableCell>
                                <TableCell className="text-center">{convertDate(event.endDate)}</TableCell>
                                <TableCell className="text-center">{event.location}</TableCell>
                                <TableCell className="text-center">{event.author}</TableCell>
                                <TableCell className="text-center"> <span className="px-3 py-2 rounded-full font-bold text-xs" style={convertDate(Date()) === convertDate(event.startDate) ? {backgroundColor: '#de815e', color: 'white'} : {backgroundColor: '#51796F', color:'white'}}>{convertDate(Date()) === convertDate(event.startDate) ? 'En cours' : 'À venir' }</span></TableCell>
                                <TableCell className="text-center"> <a href={`/protected/mes-evenements/evenement/${event.id}`} > <FaRegEdit className="mx-auto" color="#51796F" size={24}/></a></TableCell>
                                <TableCell className="text-center"> <button onClick={() => deleteEvent(event.id)} > <FiTrash2  color="#FF5B00" size={22} /></button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    );
}

export default ListMyEvents;
