import React from 'react';
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";



import Link from "next/link";
import Image from "next/image";


async function Header() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";

        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect("/login");
    };
    return (
        <div>
            <FiMenu/>
            <div className="navbar flex fixed top-0 left-0 flex-col">
                <span className="p-[13px] absolute top-0 right-0">
                    <IoMdClose size={20} color={'lightgrey'} />
                </span>

                <div className="p-6 flex items-center gap-x-2">
                    <Image
                        src={"/logo.png"}
                        width={33}
                        height={33}
                        alt="logo"
                    />
                    Ititnow
                </div>
                <hr className="m-[1rem] bg-transparent bg-gradient-to-l"/>
                <div className="flex flex-col justify-between h-full">
                    <div className="p-6 flex flex-col gap-6">
                        <div className="flex gap-x-2 items-center">
                            <MdDashboard size={20} />
                            <Link href="/protected">Dashboard</Link>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <FaCalendarAlt size={20}/>
                            <Link href="/protected/events">Évènements</Link>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <FaUserFriends size={20}/>
                            <Link href="/protected/customers">Utilisateurs</Link>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <MdManageAccounts size={20} />
                            <Link href="/protected/me">Mon profile</Link>
                        </div>
                    </div>
                    <form className="p-6" action={signOut}>
                        <button
                            className="py-2 px-4 rounded-md no-underline bg-btn-background text-black hover:bg-btn-background-hover flex gap-x-2">
                            <FiLogOut size={20} />
                            Déconnexion
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Header;
