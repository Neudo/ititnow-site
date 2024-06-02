'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'

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
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
    passwordConfirmation: z.string().min(8).max(50),
});

function EditUserForm({ user }: { user: User | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [avatar, setAvatar] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const router = useRouter();

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
                setName(data.name)
                setEmail(data.email)
                setAvatar(data.avatar)
                setPassword(data.password)
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


    return (
        <div>
            <Form {...form}>
                <form className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pseudo</FormLabel>
                                <FormControl>
                                    <Input placeholder={name || ''} {...field}
                                           value={name || ''}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type={"email"}
                                        placeholder={email || ''} {...field}
                                        value={email || ''}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Votre adresse email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nouveau mot de passe</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Votre nouveau mot de passe
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordConfirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmer votre nouveau mot de passe</FormLabel>
                                <FormControl>
                                    <Input type={"password"} placeholder="******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        variant={"secondary"}
                        onClick={() => updateProfile({name, password, email, avatar})}
                        disabled={loading}
                        type="submit">{loading ? 'Loading ...' : 'Update'}</Button>
                </form>
            </Form>
        </div>
    );
}

export default EditUserForm;
