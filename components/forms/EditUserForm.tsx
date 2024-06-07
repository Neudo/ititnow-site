'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email().min(2).max(50),
    password: z.string().min(8).max(50),
    passwordConfirmation: z.string().min(8).max(50),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Les mots de passe doivent correspondre",
    path: ["passwordConfirmation"],
});

export type UserProfile = {
    id: string
    name: string
    email: string
    avatar: string | null
    password: string
} | null;

function EditUserForm({ user }: { user: UserProfile | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [userLogged, setUserLogged] = useState<UserProfile | null>(null)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('Users')
                .select(`name, email, avatar, password`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                console.log(error)
                throw error
            }

            if (data) {

               // @ts-ignore
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

    async function updateProfile({
                                     name,
                                     email,
                                     avatar,
                                     password
                                 }: {
        name: string | null
        email: string | null
        avatar: string | null
        password: string | null
    }) {
        try {
            setLoading(true)

            const { error } = await supabase.from('Users').upsert({
                id: user?.id as string,
                name: name,
                email,
                avatar,
                password: password,
            })
            if (error) throw error
            alert('Profile updated!')
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
            name: "",
            email : "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        updateProfile({
            name: data.name,
            email: data.email,
            password: data.password,
            avatar: userLogged?.avatar || "",
        });
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-xl rounded-2xl bg-white p-6 max-w-[800px] m-auto">
                    <div className="flex flex-wrap items-start justify-around gap-[20px] mb-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem className={"w-full md:w-[47%]"}>
                                <FormLabel>Pseudo</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={userLogged?.name || ''}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className={"w-full md:w-[47%]"}>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type={"email"}
                                        placeholder={userLogged?.email || ''}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Votre adresse email
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
                                    Votre nouveau mot de passe
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
            </Form>
        </div>
    );
    }

    export default EditUserForm;
