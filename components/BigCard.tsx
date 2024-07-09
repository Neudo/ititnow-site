import React from 'react';
import Bar from "@/components/Bar";

function BigCard({title}: {title: string}) {
    return (
        <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <Bar title={title} />
        </div>
    );
}

export default BigCard;
