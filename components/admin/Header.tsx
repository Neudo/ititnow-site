'use client';

import React from 'react';
import { FiMenu } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import {createClient} from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';



function Header({isAdmin}: {isAdmin: boolean }): React.ReactElement {
    const [navHidden, setNavHidden] = React.useState<boolean>(true);
    const router = useRouter();
    function handleHeader() {
        setNavHidden(!navHidden);
    }

    function signOut() {
        const supabase = createClient();
        supabase.auth.signOut();
        router.push('/');
    }

    return (
        <div>
            <span className="p-[13px] absolute top-0 right-0 lg:hidden" onClick={handleHeader}>
            <FiMenu size={20}/>
            </span>
            <div className={`navbar flex fixed z-50 top-0 ${navHidden ? 'hide-nav' : 'translate-x-0'} lg:translate-x-0 left-0 flex-col transition duration-300 ease-in-out`}>
                <span className="p-[13px] absolute top-0 right-0 lg:hidden" onClick={handleHeader}>
                    <IoMdClose size={20} color={'lightgrey'}/>
                </span>
                <div className="px-6 pt-6 pb-10 flex items-center gap-x-2">
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
                            <MdDashboard size={20}/>
                            <Link onClick={handleHeader} href="/protected">Dashboard</Link>
                        </div>
                        {isAdmin && (
                            <div className="flex gap-x-2 items-center">
                                <FaCalendarAlt size={20}/>
                                <Link onClick={handleHeader} href="/protected/events?page=1">Évènements</Link>
                            </div>
                        )}
                        <div className="flex gap-x-2 items-center">
                            <FaCalendarAlt size={20}/>
                            <Link onClick={handleHeader} href="/protected/mes-evenements">Mes évènements</Link>
                        </div>
                        {isAdmin && (
                            <div className="flex gap-x-2 items-center">
                                <FaUserFriends size={20}/>
                                <Link onClick={handleHeader} href="/protected/customers">Utilisateurs</Link>
                            </div>
                        )}
                        <div className="flex gap-x-2 items-center">
                            <MdManageAccounts size={20}/>
                            <Link onClick={handleHeader} href="/protected/me">Mon profil</Link>
                        </div>

                    </div>
                    <div className="p-6">
                        <button
                            onClick={signOut}
                            className="py-2 px-4 rounded-md no-underline bg-slate-200 text-black hover:bg-btn-background-hover flex gap-x-2">
                            <FiLogOut size={20}/>
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Header;
