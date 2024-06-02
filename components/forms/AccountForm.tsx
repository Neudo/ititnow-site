'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'

export default function AccountForm({ user }: { user: User | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [avatar, setAvatar] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

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
                console.log("yuu -------",data)
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
            console.log("user here",user)
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-widget">
            <div>
                <label htmlFor="name">Full Name</label>
                <input
                    id="name"
                    type="text"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">email</label>
                <input
                    id="email"
                    type="url"
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="avatar">avatar</label>
                <input
                    id="avatar"
                    type="url"
                    value={avatar || ''}
                    onChange={(e) => setAvatar(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="button primary block p-4 bg-green-400"
                    onClick={() => updateProfile({name, password, email, avatar})}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>
        </div>

    )
}
