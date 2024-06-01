'use client'
import React from 'react';
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


const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
    passwordConfirmation: z.string().min(8).max(50),
    // avatar: z.string().min(2).max(200),
})

function EditUserForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            // avatar: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pseudo</FormLabel>
                            <FormControl>
                                <Input placeholder="Pseudo" {...field} />
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
                                <Input placeholder="blabla@gmail.com" {...field} />
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
                                <Input placeholder="******" {...field} />
                            </FormControl>
                            <FormDescription>
                                Confirmer votre mot de passe
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="avatar"*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormLabel>Votre photo de profil</FormLabel>*/}
                {/*            <FormControl>*/}
                {/*                <Input  type="file" placeholder="photo" {...field} />*/}
                {/*            </FormControl>*/}
                {/*            <FormDescription>*/}
                {/*                Confirmer votre mot de passe*/}
                {/*            </FormDescription>*/}
                {/*            <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        </div>
    )
}

export default EditUserForm;
