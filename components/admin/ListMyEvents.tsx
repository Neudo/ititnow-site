"use client"
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {convertDate} from "@/lib/utils";
import {FaRegEdit} from "react-icons/fa";
import axios from "axios";
import process from "process";
import { FiTrash2 } from "react-icons/fi";
import {PaginationComponent} from "@/components/PaginationComponent";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import {Toaster} from "@/components/ui/toaster";



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

function ListEvents({events, pageCount, refreshEvents}: { events: Event[], pageCount: number, refreshEvents: () => void }) {
    const { toast } = useToast()


    const deleteEvent = async (id: string) => {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_RENDER_API_URL}events/${id}`);
        refreshEvents();
        toast({
            description: "Votre évènement a bien été supprimé",
        })
        return response.data;
    }

    return (
        <div>
            <h1 className="px-4 py-5 font-extrabold primary-green-linear text-white rounded-2xl w-[96%] mx-auto translate-y-[30px] z-10 relative shadow-2xl">Liste
                de mes évènements</h1>
            {events ? (
                <>
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
                            {events?.map((event: Event) => (

                                <TableRow className="cursor-pointer" key={event.id}>
                                    <TableCell className="font-medium items-center">{event.title}</TableCell>
                                    <TableCell className="text-center">{convertDate(event.startDate)}</TableCell>
                                    <TableCell className="text-center">{convertDate(event.endDate)}</TableCell>
                                    <TableCell className="text-center">{event.location}</TableCell>
                                    <TableCell className="text-center">{event.author}</TableCell>
                                    <TableCell className="text-center"> <span className="px-3 py-2 rounded-full font-bold text-xs" style={convertDate(Date()) === convertDate(event.startDate) ? {backgroundColor: '#de815e', color: 'white'} : {backgroundColor: '#51796F', color:'white'}}>{convertDate(Date()) === convertDate(event.startDate) ? 'En cours' : 'À venir' }</span></TableCell>
                                    <TableCell className="text-center"> <a href={`/protected/mes-evenements/evenement/${event.id}`} > <FaRegEdit className="mx-auto" color="#51796F" size={24}/></a></TableCell>
                                    <TableCell className="text-center">
                                        {/*Modal delete*/}
                                        <Dialog>
                                            <DialogTrigger><FiTrash2 color="#FF5B00" size={22}/></DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Êtes vous sûre ?</DialogTitle>
                                                    <DialogDescription>
                                                        Vous êtes sur le point de supprimer cet évènement, cette action est irreversible.
                                                        <DialogClose asChild>
                                                            <button className="bg-red-500 p-3 rounded-lg mt-3 text-slate-100" onClick={() => deleteEvent(event.id)}>Supprimer</button>
                                                        </DialogClose>
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                    <Toaster />
                    {pageCount > 1 && <PaginationComponent pageCount={pageCount} />}

                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    );
}

export default ListEvents;
