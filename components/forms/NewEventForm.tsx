import React, {useState} from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IoAddCircleOutline } from "react-icons/io5";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import { Calendar } from "@/components/ui/calendar"


const formSchema = z.object({
    title: z.string().min(2).max(50),
    image: z.string().min(2).max(50),
    dateStart: z.string().min(8).max(50),
    dateEnd: z.string().min(8).max(50),
    location: z.string().min(8).max(50),
    establishment: z.string().min(8).max(50),
    contact: z.string().min(8).max(50),
})



function NewEventForm() {
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState<string | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [dateStart, setDateStart] = React.useState<Date | undefined>(new Date())



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            image: "",
            dateStart: "",
            dateEnd: "",
            location: "",
            establishment: "",
            contact: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
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
                                    <FormItem>
                                        <FormLabel>Titre</FormLabel>
                                        <FormControl>
                                            <Input placeholder={'Soirée blind test'} {...field}
                                                   value={title || ''}
                                                   onChange={(e) => setTitle(e.target.value)}
                                            />
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
                                name="image"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={"email"}
                                                 {...field}
                                                value={image || ''}
                                                onChange={(e) => setImage(e.target.value)}
                                            />
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
                                    <FormItem>
                                        <FormLabel>Date de l'évènement</FormLabel>
                                        <FormControl>
                                            <Calendar
                                                mode="single"
                                                selected={dateStart}
                                                onSelect={setDateStart}
                                                className="rounded-md border"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Date de début de votre évènement.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateEnd"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Date de fin</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({field}) => (
                                    <FormItem>
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
                                    <FormItem>
                                        <FormLabel>Confirmer mot de passe</FormLabel>
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
                                    <FormItem>
                                        <FormLabel>Confirmer mot de passe</FormLabel>
                                        <FormControl>
                                            <Input placeholder="contact@cafédelamarie.fr" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Si des gens veulent des informations, indiquez comment ils peuvent vous contacter.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            variant={"secondary"}
                            disabled={loading}
                            type="submit">{loading ? 'Loading ...' : 'Update'}</Button>
                    </form>
                </Form>


            </SheetContent>
        </Sheet>

    );
}

export default NewEventForm;
