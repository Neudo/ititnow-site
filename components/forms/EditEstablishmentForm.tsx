'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import {undefined, z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    address: z.string().min(2).max(150),
    city: z.string().min(2).max(50),
    instagram: z.string().min(2).max(50),
    tel: z.string().min(2).max(50),
    website: z.string().min(2).max(50),
});

export type UserProfile = {
    id: string
    email: string
    password: string
} | null;

function EditEstablishmentFrom({ user }: { user: UserProfile | null }) {
    const { toast } = useToast()
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [userLogged, setUserLogged] = useState<UserProfile | null>(null)

    useEffect(() => {
        if(user) {
            setLoading(false)
            setUserLogged(user)
        }
    }, [user]);



    async function updateEstablishment({address, city, instagram, tel, website}: {
        address: string,
        city: string,
        instagram: string,
        tel: string,
        website: string
    }) {
        try {
            setLoading(true)
            const { error } = await supabase.from('Users').upsert({
                id: user?.id as string,
                address,
                city,
                instagram,
                tel,
                website
            })
            if (error) throw error
            toast({
                title: "Profile mis à jour",
                description: "Les informations de votre profil ont été mis à jours avec succès !",
            })
        } catch (error) {
            console.log(error)
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: userLogged?.email || '',
            city: userLogged?.email || '',
            instagram: userLogged?.email || '',
            tel: userLogged?.email || '',
            website: userLogged?.email || '',
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        updateEstablishment({
            address: data.address,
            city: data.city,
            instagram: data.instagram,
            tel: data.tel,
            website: data.website
        });
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-xl rounded-2xl bg-white p-6 max-w-[800px] m-auto">
                    <div className="flex flex-wrap items-start justify-around gap-[20px] mb-5">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({field}) => (
                                <FormItem className={"w-full"}>
                                    <FormLabel>Adresse</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={userLogged?.email || ''}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        L'adresse de l'établissement ou du lieu de votre évènement.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({field}) => (
                                <FormItem className={"w-full md:w-[47%]"}>
                                    <FormLabel>La ville</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instagram"
                            render={({field}) => (
                                <FormItem className={"w-full md:w-[47%]"}>
                                    <FormLabel>Instagram</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tel"
                            render={({field}) => (
                                <FormItem className={"w-full md:w-[47%]"}>
                                    <FormLabel>Numéro de tel</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="website"
                            render={({field}) => (
                                <FormItem className={"w-full md:w-[47%]"}>
                                    <FormLabel>Site internet</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        type="submit">{loading ? 'Chargement ...' : 'Modifier'}</Button>
                </form>
                <Toaster />
            </Form>
        </div>
    );
}

export default EditEstablishmentFrom;
