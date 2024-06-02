import { useState, useEffect } from 'react';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";


const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const supabase = createClient();
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                    return redirect("/login");
                }
                console.log('user from custom hook:', user);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    return user;
};

export default useUser;
