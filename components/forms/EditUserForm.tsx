'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { z } from 'zod';
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
    email: z.string().email().min(2).max(50),
    password: z.string().min(8, {message: 'Votre nouveau mot de passe doit contenir au moins 8 caractères.'}).max(50),
    passwordConfirmation: z.string().min(8).max(50),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Les mots de passe doivent correspondre",
    path: ["passwordConfirmation"],
});

export type UserProfile = {
    id: string
    email: string
    password: string
} | null;

function EditUserForm({ user }: { user: UserProfile | null }) {
    const { toast } = useToast()
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [userLogged, setUserLogged] = useState<UserProfile | null>(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('Users')
                .select(`email, password`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                console.log(error)
                throw error
            }
            if (data) {
                setUserLogged(data as UserProfile)
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])


    async function updateUser({
                                           email,
                                           password
                                       }: {

        email: string | null
        password: string | null
    }) {
        try {
            setLoading(true)
            const { error } = await supabase.from('Users').upsert({
                id: user?.id as string,
                email,
                password: password
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

            email : user?.email || "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        updateUser({
            email: data.email,
            password: data.password,
        });
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-xl rounded-2xl bg-white p-6 max-w-[800px] m-auto">
                    <div className="flex flex-wrap items-start justify-around gap-[20px] mb-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className={"w-full"}>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type={"email"}
                                            placeholder={userLogged?.email || ''}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Votre adresse email.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className={"w-full md:w-[47%]"}>
                                    <FormLabel>Nouveau mot de passe</FormLabel>
                                    <FormControl>
                                        <Input type={"password"} placeholder="******" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Votre nouveau mot de passe.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({field}) => (
                                <FormItem className={"w-full md:w-[47%]"}>
                                    <FormLabel>Confirmer mot de passe</FormLabel>
                                    <FormControl>
                                        <Input type={"password"} placeholder="******" {...field} />
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

export default EditUserForm;
