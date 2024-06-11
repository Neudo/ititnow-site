"use client"
import React, {useEffect, useState} from 'react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import { Calendar } from "@/components/ui/calendar"
import {CalendarIcon} from "lucide-react";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import {CldUploadButton, CldUploadWidget} from 'next-cloudinary';
import process from "process";
import {createClient} from "@/utils/supabase/client";

interface NewEventFormProps {
    userId: string;
    oldEvent: string | string[] | null;
}

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().max(2500),
    image: z.string(),
    dateStart: z.date(),
    dateEnd: z.date(),
    location: z.string().min(2).max(50),
    establishment: z.string().min(2).max(50),
    contact: z.string().min(2).max(50),
})

const fetchEvent = async (id: string | string[]) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_API_URL}events/${id}`);
    return response.data;
};

const createEvent = async (newEvent: {
    title: string;
    description: string;
    image: string;
    dateStart: Date | string;
    contact: string;
    location: string;
    establishment: string;
    dateEnd: Date | string;
    userId: string;
}) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_RENDER_API_URL}events`, {
        title: newEvent.title,
        description: newEvent.description,
        image: newEvent.image,
        startDate: newEvent.dateStart,
        endDate: newEvent.dateEnd,
        location: newEvent.location,
        author: newEvent.establishment,
        contact: newEvent.contact,
        userId: newEvent.userId
    })
    return response.data
}
const updateEvent = async (id: string | string[], updatedEvent: {
    title: string;
    description: string;
    image: string;
    dateStart: Date | string;
    contact: string;
    location: string;
    establishment: string;
    dateEnd: Date | string;
    userId: string;
}) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_RENDER_API_URL}events/${id}`, {
        title: updatedEvent.title,
        description: updatedEvent.description,
        image: updatedEvent.image,
        startDate: updatedEvent.dateStart,
        endDate: updatedEvent.dateEnd,
        location: updatedEvent.location,
        author: updatedEvent.establishment,
        contact: updatedEvent.contact,
        userId: updatedEvent.userId
    });
    return response.data;
};
const NewEventForm: React.FC<NewEventFormProps> = ({ userId, oldEvent }) => {

    const [loading, setLoading] = useState(false)
    const [duration, setDuration] = React.useState<boolean | undefined>(false)
    const [resource, setResource] = useState('');

    const { data: existingEvent, error, isLoading } = useQuery({
        queryKey: ['event', oldEvent],
        queryFn: () => fetchEvent(oldEvent as string),
        enabled: !!oldEvent,
    });


    useEffect(() => {
        if (existingEvent) {
            form.reset({
                title: existingEvent.title,
                description: existingEvent.description,
                image: existingEvent.image,
                dateStart: new Date(existingEvent.startDate),
                dateEnd: new Date(existingEvent.endDate),
                location: existingEvent.location,
                establishment: existingEvent.author,
                contact: existingEvent.contact,
            });
            setResource(existingEvent.image);
            setDuration(new Date(existingEvent.startDate) < new Date(existingEvent.endDate));
        }
    }, [existingEvent]);


    const defaultValues = {
        title: "",
        description: "",
        image: "",
        dateStart: new Date(),
        dateEnd: new Date(),
        location: "",
        establishment: "",
        contact: "",
    };


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const mutation = useMutation({
        mutationFn: oldEvent ? (data: any) => updateEvent(oldEvent, data) : createEvent,
        onSuccess: () => {
            console.log("Event saved");
            setLoading(false);
        },
        onError: () => {
            console.log("Error saving event");
            setLoading(false);
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        mutation.mutate({
            title: values.title,
            description: values.description,
            image: resource,
            dateStart: values.dateStart.toISOString(),
            dateEnd: values.dateEnd.toISOString(),
            location: values.location,
            establishment: values.establishment,
            contact: values.contact,
            userId: userId,
        });
    };


    return (
        <Form {...form}>
            <form  className="space-y-8 shadow-xl rounded-2xl p-6 max-w-[800px] bg-white m-auto">
                <div className="flex flex-wrap items-start justify-around gap-[20px] mb-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem className={"w-full"}>
                                <FormLabel>Titre</FormLabel>
                                <FormControl>
                                    <Input placeholder={'Soirée blind test'} {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Titre de l'évènement.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem className={"w-full"}>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormDescription>
                                    Description de l'évènement.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <CldUploadButton
                        uploadPreset="ititnow_events"
                        onSuccess={(result, { widget }) => {
                            // @ts-ignore
                            setResource(result?.info.secure_url)
                            widget.close();
                        }}
                    >
                    </CldUploadButton>
                    <FormField
                        control={form.control}
                        name="dateStart"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date de l'évènement</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(field.value)}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Date de début de votre évènement.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        <Checkbox
                            checked={duration}
                            onCheckedChange={() => setDuration(!duration)}
                            id="duration"/> L'évènement se déroule sur plusieurs jours ?
                    </label>

                    {duration && (
                        <FormField
                            control={form.control}
                            name="dateEnd"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date de l'évènement</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={new Date(field.value)}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Date de début de votre évènement.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    )}

                    <FormField
                        control={form.control}
                        name="location"
                        render={({field}) => (
                            <FormItem className={"w-full"}>
                                <FormLabel>Lieu</FormLabel>
                                <FormControl>
                                    <Input placeholder="1 place de la fête - 75012 Paris" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Le lieu de votre évènement.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="establishment"
                        render={({field}) => (
                            <FormItem className={"w-full"}>
                                <FormLabel>Établissement</FormLabel>
                                <FormControl>
                                    <Input placeholder="Le café de la mairie" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Le nom de vorte établissement.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contact"
                        render={({field}) => (
                            <FormItem className={"w-full"}>
                                <FormLabel>Contact</FormLabel>
                                <FormControl>
                                    <Input placeholder="contact@cafédelamarie.fr" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Si des gens veulent des informations, indiquez comment ils peuvent vous
                                    contacter.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    variant={"default"}
                    disabled={loading}
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                >{loading ? 'Loading ...' : 'Envoyer'}</Button>
            </form>
        </Form>
    );
}

export default NewEventForm;
