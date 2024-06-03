import React, {useState} from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"



import { IoAddCircleOutline } from "react-icons/io5";
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
import {useMutation} from "@tanstack/react-query";

interface NewEventFormProps {
    userId: string;
}


const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().max(500),
    image: z.string().min(2).max(50),
    dateStart: z.date(),
    dateEnd: z.date(),
    location: z.string().min(2).max(50),
    establishment: z.string().min(2).max(50),
    contact: z.string().min(2).max(50),
})

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
    console.log("newEvent -> ",newEvent)
    const response = await axios.post("http://localhost:8000/events/", {
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
    console.log("res.data -> ",response.data)
    return response.data
}



function NewEventForm({userId}: {userId: string}) {
    const [loading, setLoading] = useState(false)
    const [duration, setDuration] = React.useState<boolean | undefined>(false)
    const mutation = useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            console.log("Event created")
            setLoading(false)
        },
        onError: () => {
            console.log("Error creating event")
            setLoading(false)
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
            dateStart: new Date(),
            dateEnd: new Date(),
            location: "",
            establishment: "",
            contact: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createEvent({
            title: values.title,
            description: values.description,
            image: values.image,
            dateStart: new Date(values.dateStart).toISOString(),
            dateEnd: new Date(values.dateEnd).toISOString(),
            location: values.location,
            establishment: values.establishment,
            contact: values.contact,
            userId: userId
        })

    }


    return (
        <Sheet>
            <SheetTrigger className={"primary-green text-white rounded-lg flex items-center p-4 w-fit gap-x-2"}><IoAddCircleOutline size={20} />
                Publier un évènement</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-3xl">Publier mon évènement</SheetTitle>
                    <SheetDescription>
                        Ajoutez un évènement à la liste des évènements.
                    </SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-xl rounded-2xl p-6 max-w-[800px] m-auto">
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
                            <FormField
                                control={form.control}
                                name="image"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            Vous pouvez ajouter une image. Formats autorisés : .jpg, .png, .jpeg
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
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
                            variant={"secondary"}
                            disabled={loading}
                            type="submit">{loading ? 'Loading ...' : 'Envoyer'}</Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}

export default NewEventForm;
