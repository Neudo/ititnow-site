import React from 'react';
import {FaCalendarAlt} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";



interface SmallCardProps {
    title: string;
    number?: number;
    color: string;
    picto: any;
}

function Picto({pictoName}: {pictoName: string}) {
    if (pictoName === "people") {
        return (
            <FaPeopleGroup size={33}/>
        );
    }
    if (pictoName === "events") {
        return (
            <FaCalendarAlt size={33}/>
        );
    }
    if (pictoName === "event-now") {
        return (
            <FaRegCalendarCheck size={33}/>
        );
    }

}

function SmallCard({title, number, color, picto}: SmallCardProps) {
    return (
        <div className="rounded-2xl bg-white shadow-lg p-6 w-full md:max-w-[25%]">
            <div className="flex items-center justify-between">
                <div style={{background: color, color:"white"}} className={`{bg-[${color}] rounded-full p-3 mr-3`}>
                    <Picto pictoName={picto} />
                </div>
                <div>
                    <p className="text-sm text-right text-gray-400">{title}</p>
                    <p className="text-2xl text-right font-bold">{number}</p>
                </div>
            </div>

        </div>
    );
}

export default SmallCard;
